import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const columnsLevel: GridColDef[] = [
  {
    field: "code",
    headerName: "Student Code",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "subject",
    headerName: "course Code",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "semester",
    headerName: "Semester",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "degree",
    headerName: "Subject Degree",
    flex: 1,
    align: "center",
    headerAlign: "center",
    editable: true,
  },
  {
    field: "statues",
    headerName: "Statues",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row: { statues } }) => {
      return (
        <Typography
          sx={{
            color: "white",
            backgroundColor: statues === "FAILED" ? "#bb2124" : "#66bb6a",
            p: "5px",
            m: "10px",
            alignContent: "center",
            borderRadius: "5px",
          }}
        >
          {statues}
        </Typography>
      );
    },
  },
  {
    field: "rate",
    headerName: "rate",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
];

const studentLevel = [
  {
    value: "One",
    label: "1",
  },
  {
    value: "Two",
    label: "2",
  },
  {
    value: "Three",
    label: "3",
  },
  {
    value: "Four",
    label: "4",
  },
];
export { columnsLevel, studentLevel };
