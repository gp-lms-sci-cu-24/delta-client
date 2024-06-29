import { Box, Typography } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

const rowsLevelOne: GridRowsProp = [
  {
    id: 1,
    code: "1927194",
    subject: "U111",
    semester: "2024 Jan",
    degree: "62",
    number_of_failure: "0",
    statues: "C",
  },
  {
    id: 2,
    code: "2027069",
    subject: "U111",
    semester: "2024 Jan",
    degree: "62",
    number_of_failure: "0",
    statues: "C",
  },
  {
    id: 3,
    code: "2027115",
    subject: "U111",
    semester: "2024 Jan",
    degree: "62",
    number_of_failure: "0",
    statues: "C",
  },
  {
    id: 4,
    code: "2027471",
    subject: "U111",
    semester: "2024 Jan",
    degree: "62",
    number_of_failure: "0",
    statues: "C",
  },
  {
    id: 5,
    code: "2027471",
    subject: "U111",
    semester: "2024 Jan",
    degree: "62",
    number_of_failure: "0",
    statues: "C",
  },

  {
    id: 6,
    code: "2027471",
    subject: "U111",
    semester: "2024 Jan",
    degree: "62",
    number_of_failure: "0",
    statues: "F",
  },
];
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
    headerName: "Student Code",
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
    editable:true
  },
  {
    field: "statues",
    headerName: "Statues",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row: { statues } }) => {
      return (
        <Box
          sx={{
            p: "5px",
            width: "50px",
            borderRadius: "5px",
            textAlign: "center",
            backgroundColor:
              statues === "A" ||
              statues === "B" ||
              statues === "C" ||
              statues === "D"
                ? "#66bb6a"
                : "	#bb2124",
          }}
        >
          <Typography variant="body1" sx={{ color: "white" }}>
            {statues}
          </Typography>
        </Box>
      );
    },
  },
];

const studentLevel=[
  {
    value: 'One',
    label: '1',
  },
  {
    value: 'Two',
    label: '2',
  },
  {
    value: 'Three',
    label: '3',
  },
  {
    value: 'Four',
    label: '4',
  },
];
export { rowsLevelOne, columnsLevel ,studentLevel };
