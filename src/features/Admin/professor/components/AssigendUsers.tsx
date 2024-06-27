import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, Tab } from "@mui/material";
import { DataGrid, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAssignedProfessorsQuery,
  useGetAssignedStudentsQuery,
} from "../acadmicadvisorApiSlice";
import { AssignedProfessor, AssignedStudent } from "../AssignData";
import Loading from "@/components/Loading";
import { EmptyDataGrid } from "@/components/empty/EmptyDataGrid";

interface dataprops {
  username?: string;
}

export default function AssigendUsers(profname: dataprops) {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // students assigned
  const { isLoading: studentsLoading, data: students } =
    useGetAssignedStudentsQuery({
      username: profname.username,
      page: {
        pageNo: page > 0 ? page - 1 : 0,
        pageSize: pageSize,
      },
    });

  const studentsData =
    students?.content.map((student) => ({
      id: student.username,
      academicAdvisor: profname.username,
      ...student,
    })) || [];

  console.log("studentsData", studentsData);
  const handleCellDoubleClickStudent = (params: GridCellParams) => {
    const id = params.row.username;
    navigate("/app/student-info", { state: { code: id } });
  };

  // professors assigned
  const { data: professors, isLoading: ProfessorsLoading } =
    useGetAssignedProfessorsQuery({
      username: profname.username,
      page: {
        pageNo: page > 0 ? page - 1 : 0,
        pageSize: pageSize,
      },
    });
  const professorsData =
    professors?.content.map((professors:Professor) => ({
      supervisor: profname.username,
      ...professors,
    })) || [];

  const handleCellDoubleClickProfessor = (params: GridCellParams) => {
    const id = params.row.username;
    navigate(`/app/professors/${id}`, { state: { code: id } });
  };

  if (ProfessorsLoading || studentsLoading) return <Loading></Loading>;

  return (
    <Box
      sx={{
        p: 1,

        borderRadius: 1,
      }}
    >
      <Box sx={{ width: "100%", typography: "body1", mt: 1 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              variant="fullWidth"
              onChange={(_event: React.SyntheticEvent, newValue: string) => {
                setValue(newValue);
              }}
              aria-label="lab API tabs example"
            >
              <Tab label="Students" value="1" />
              <Tab label="Professors" value="2" />
            </TabList>
          </Box>
          {value === "1" && (
            <DataGrid
              rows={studentsData}
              columns={AssignedStudent}
              paginationModel={{ page, pageSize }}
              onPaginationModelChange={({ page, pageSize }) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              slots={{ noRowsOverlay: EmptyDataGrid, toolbar: GridToolbar }}
              pagination
              paginationMode="server"
              loading={studentsLoading}
              rowCount={students?.totalElements || 0}
              sx={{
                "--DataGrid-overlayHeight": "300px",
                "& .MuiDataGrid-cell:focus ,& .MuiDataGrid-columnHeader:focus ,& .MuiDataGrid-cell:focus-within":
                  {
                    outline: " none",
                  },
                height: "100vh",
              }}
              onCellDoubleClick={handleCellDoubleClickStudent}
            />
          )}

          {value === "2" && (
            <DataGrid
              rows={professorsData}
              columns={AssignedProfessor}
              slots={{ noRowsOverlay: EmptyDataGrid, toolbar: GridToolbar }}
              checkboxSelection={false}
              getRowId={(row) => row.username}
              loading={false}
              sx={{
                //to remove cell border in active state
                "& .MuiDataGrid-cell:focus ,& .MuiDataGrid-columnHeader:focus ,& .MuiDataGrid-cell:focus-within":
                  {
                    outline: " none",
                  },
                height: "100vh",
              }}
              disableRowSelectionOnClick
              initialState={{
                pagination: { paginationModel: { pageSize: pageSize } },
              }}
              onCellDoubleClick={handleCellDoubleClickProfessor}
            />
          )}
        </TabContext>
      </Box>
    </Box>
  );
}
