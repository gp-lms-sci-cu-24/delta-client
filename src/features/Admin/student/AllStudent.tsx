import React from "react";
import { DataGrid, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import { Box, Stack } from "@mui/material";
import { StudentColumns } from "./StudentData";
import { useNavigate } from "react-router-dom";
import { useGetStudentsQuery } from "./studentApiSlice";
import CustomButton from "@/components/buttons/CustomButton";
import Header from "@/components/Header";
import { EmptyDataGrid } from "@/components/empty/EmptyDataGrid";
import { StudentDto } from "./type";

function AllStudent() {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const { isLoading, data } = useGetStudentsQuery({
    pageNo: page,
    pageSize: pageSize,
  });
  const processedData =
    data?.content.map((student:StudentDto) => ({
      id: student.username,
      ...student,
    })) || [];
  const handleCellDoubleClick = (params: GridCellParams) => {
    const id = params.row.username;
    console.log("id", params.row.username);
    navigate("/app/admin/students/student-info", { state: { code: id } });
  };
  return (
    <Box sx={{ p: 1, height: "100vh" }}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={"space-between"}
        mb={2}
      >
        <Header pageName={"All Student"} message="" />
        <CustomButton
          title="Add Student"
          variant={"contained"}
          disableElevation
          onClick={() => navigate("/app/admin/students/add")}
          customSx={{ height: "40px", textTransform: "capitalize" }}
          disableRipple
          size="small"
        />
      </Stack>
      <DataGrid
        rows={processedData || []}
        columns={StudentColumns}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={({ page, pageSize }) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        slots={{ noRowsOverlay: EmptyDataGrid, toolbar: GridToolbar }}
        pagination
        paginationMode="server"
        loading={isLoading}
        rowCount={data?.totalElements || 0}
        sx={{
          "--DataGrid-overlayHeight": "300px",
          "& .MuiDataGrid-cell:focus ,& .MuiDataGrid-columnHeader:focus ,& .MuiDataGrid-cell:focus-within":
            {
              outline: " none",
            },
        }}
        onCellDoubleClick={handleCellDoubleClick}
      />
      <Box sx={{ height: "10px" }} />
    </Box>
  );
}

export default AllStudent;
