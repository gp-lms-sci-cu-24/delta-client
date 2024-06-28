import { DataGrid, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import { columns, rows } from "./AcdemicAdvisorData";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { EmptyDataGrid } from "@/components/empty/EmptyDataGrid";
function ACStudents() {
  const pageSize = [20, 40, 60, 80, 100];
  const  navigate = useNavigate();

  const handleCellDoubleClick = (params: GridCellParams) => {
    const id = params.row.code;
    navigate("/app/student-info", { state: { code: id } });
  };



  return (
    <Box sx={{ width: "100%", p: 2, height: 500 }}>
      <Header pageName="Academic Advisor"/>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        loading={false}
        pageSizeOptions={pageSize}
        slots={{ noRowsOverlay: EmptyDataGrid, toolbar: GridToolbar }}
        sx={{
          "--DataGrid-overlayHeight": "300px",
          "& .MuiDataGrid-cell:focus ,& .MuiDataGrid-columnHeader:focus ,& .MuiDataGrid-cell:focus-within":
            {
              outline: " none",
            },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        onCellDoubleClick={handleCellDoubleClick}
      />
    </Box>
  );
}

export default ACStudents;
