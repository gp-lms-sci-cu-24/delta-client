import { DataGrid, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import { Box, Stack } from "@mui/material";
import { ProfessorColumns } from "./ProfessorData";
import { useNavigate } from "react-router-dom";
import { useGetAllProfessorsQuery } from "./professorApiSlice";
import { useState } from "react";
import Loading from "@/components/Loading";
import CustomButton from "@/components/buttons/CustomButton";
import Header from "@/components/Header";
import { EmptyDataGrid } from "@/components/empty/EmptyDataGrid";
function AllProfessors() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const { data, isLoading } = useGetAllProfessorsQuery({
    pageNo: page,
    pageSize: pageSize,
  });
  const Data = data?.content || [];
  // const totalPages = data?.totalPages || 0;

  if (isLoading) return <Loading></Loading>;

  const handleCellDoubleClick = (params: GridCellParams) => {
    const id = params.row.username;
    navigate(`/app/admin/professors/${id}`, { state: { code: id } });
  };
  console.log(Data);
  return (
    <Box sx={{ p: 1, width: "100%", height: "100vh" }}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={"space-between"}
        mb={2}
      >
        <Header pageName={"All Professors"} message="" />
        <CustomButton
          title="Add professor"
          variant={"contained"}
          disableElevation
          onClick={() => navigate("/app/admin/professors/add")}
          customSx={{ height: "40px", textTransform: "capitalize" }}
          disableRipple
          size="small"
        />
      </Stack>
      <DataGrid
        rows={Data}
        columns={ProfessorColumns}
        checkboxSelection={false}
        loading={isLoading}
        rowCount={data?.totalElements || 0}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={({ page, pageSize }) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        slots={{ noRowsOverlay: EmptyDataGrid, toolbar: GridToolbar }}
        pagination
        paginationMode="server"
        sx={{
          //to remove cell border in active state
          "& .MuiDataGrid-cell:focus ,& .MuiDataGrid-columnHeader:focus ,& .MuiDataGrid-cell:focus-within":
            {
              outline: " none",
            },
        }}
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: pageSize } },
        }}
        onCellDoubleClick={handleCellDoubleClick}
      />
      <Box sx={{ height: "10px" }} />
    </Box>
  );
}

export default AllProfessors;
