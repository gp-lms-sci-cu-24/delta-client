import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValidRowModel,
} from "@mui/x-data-grid";

interface IProps {
  rows: readonly GridValidRowModel[];
  columns: readonly GridColDef<GridValidRowModel>[];
  title: string;
}
const getRowClassName = (params: { row: GridValidRowModel }) => {
  if (params.row.status === "passed") {
    return "row-passed";
  } else if (params.row.status === "failed") {
    return "row-failed";
  }
  return "white";
};
const CustomDataGrid = ({ rows, columns, title }: IProps) => {
  const theme = useTheme();
  const check = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ width: check ? "100%" : "49%" }}>
      <Typography
        sx={{
          color: "#03a9f4",
          fontWeight: "bold",
        }}
        variant="h6"
      >
        {title}
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        disableRowSelectionOnClick
        loading={false}
        density="compact"
        getRowClassName={getRowClassName}
        autoHeight
        sx={{
          "--DataGrid-overlayHeight": "300px",
          "& .MuiDataGrid-cell:focus ,& .MuiDataGrid-columnHeader:focus ,& .MuiDataGrid-cell:focus-within":
            {
              outline: " none",
            },
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },

          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f0f0f0",
            color: "black",
            fontWeight: 700,
            width: "100%",
            borderBottom: "3px solid black",
            borderTop: "2px solid black",
            borderLeft: "0.5px solid black",
            borderRight: "0.5px solid black",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "3px solid #c0c0c0",
            borderLeft: "0.5px solid #c0c0c0",
            borderRight: "0.5px solid #c0c0c0",
          },
          ".MuiDataGrid-row--lastVisible": {
            borderBottom: "2px solid black",
          },
          "& .row-passed": {
            backgroundColor: "#4caf50",
            color: "white",
            "&:hover": {
              backgroundColor: "#4caf50",
              color: "#ffffff",
            },
          },
          "& .row-failed": {
            backgroundColor: "#f44336",
            color: "white",
            "&:hover": {
              backgroundColor: "#f44336",
              color: "#ffffff",
            },
          },
        }}
      />
    </Box>
  );
};

export default CustomDataGrid;
