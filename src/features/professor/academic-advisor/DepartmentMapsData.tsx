import { Box, Typography } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { State } from "./type";
const departmentrows: GridRowsProp = [
  {
    id: 1,
    code: "CS 101",
    name: "Introduction to Algorithms",
    required: "Yes",
    number_of_failure: "0",
    credits_hours: "3",
    Mandatory: "Yes",
    status : "passed"
  },
  {
    id: 2,
    code: "CS 102",
    name: "Data Structures",
    required: "No",
    number_of_failure: "0",
    credits_hours: "3",
    Mandatory: "Yes",
    status : "failed"
  },
  {
    id: 3,
    code: "CS 103",
    name: "Operating System",
    required: "No",
    number_of_failure: "0",
    credits_hours: "3",
    Mandatory: "Yes",
    status : ""
  },
  {
    id: 4,
    code: "CS 104",
    name: "Computer Networks",
    required: "No",
    number_of_failure: "0",
    credits_hours: "3",
    Mandatory: "Yes",
    status : "failed"
  },
  {
    id: 5,
    code: "CS 105",
    name: "Software Engineering",
    required: "No",
    number_of_failure: "0",
    credits_hours: "3",
    Mandatory: "Yes",
    status : "passed"
  },
];
const departmentColumns: GridColDef[] = [
  {
    field: "courseCode",
    headerName: "Code",
    width: 90,
    minWidth: 80,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "courseName",
    headerName: "Course",
    minWidth: 200,
    width: 220,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
    renderCell: ({ row: { courseName } }) => {
      return (
        <Box display="flex"   alignItems="center" height="100%" style={{ whiteSpace: 'normal', wordWrap: 'break-word' , }}>
          <Typography variant="subtitle2">
            {courseName}
          </Typography>
        </Box>
      );
    },

  },
  
  {
    field: "numberOfFail",
    headerName: "Failure",
    minWidth: 70,
    width: 80,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    renderCell: ({ row: { numberOfFail } }) => {
      return <Typography display="flex" justifyContent="center"  alignItems="center" height="100%" variant="subtitle2" >{numberOfFail===0? "-" : numberOfFail }</Typography>;
    },
  },
  {
    field: "credit",
    headerName: "Credits Hours",
    minWidth: 60,
    width: 70,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "grade",
    headerName: "Grade",
    minWidth: 60,
    width: 70,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    renderCell: ({ row: { grade , state } }) => {
      return <Typography display="flex" justifyContent="center"  alignItems="center" height="100%" variant="subtitle2" >{grade===0 && state===State.NEVER_TAKEN? "-" : grade }</Typography>;
    },
  },
  {
    field: "mandatory",
    headerName: "Mandatory",
    flex: 1,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    renderCell: ({ row: { mandatory } }) => {
      return <Typography display="flex" justifyContent="center"  alignItems="center" height="100%" variant="subtitle2" >{mandatory? "✔️" : "❌"}</Typography>;
    },
  },
  
];
export { departmentrows, departmentColumns };
