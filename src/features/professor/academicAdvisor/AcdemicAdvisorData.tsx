import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

const rows: GridRowsProp = [
  {
    id: 1,
    department: "CS",
    name: "Muhammed Walied",
    joiningYear: "2022",
    code: "1927194",
    level: "Level-4",
    gpa: "3.5",
    credits_hours: "128",
    creditHoursSemester: "128",
  },
  {
    id: 2,
    name: "Abdallah Muhammed",
    department: "CS",
    joiningYear: "2022",
    code: "2027069",
    level: "Level-4",
    gpa: "3.5",
    credits_hours: "128",
    creditHoursSemester: "128",
  },
];
const columns: GridColDef[] = [
  {
    field: "code",
    headerName: "ID",
    width: 100,
    minWidth: 80,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 200,
    width: 280,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "level",
    headerName: "Level",
    minWidth: 80,
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "gpa",
    headerName: "GPA",
    width: 80,
    minWidth: 50,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "credits_hours",
    headerName: "Credits Hours",
    minWidth: 100,
    width: 120,
    align: "center",
    headerAlign: "left",
  },
  {
    field: "department",
    headerName: "Department",
    width: 100,
    minWidth: 80,
    align: "center",
    headerAlign: "left",
  },
  {
    field: "joiningYear",
    headerName: "Joining Year",
    width: 100,
    minWidth: 80,
    align: "center",
    headerAlign: "left",
  },
  {
    field: "creditHoursSemester",
    headerName: "Credit Hours/Semester",
    width: 160,
    minWidth: 140,
    align: "center",
    headerAlign: "left",
  },
  // {
  //   field: "details",
  //   headerName: "",
  //   align: "right",
  //   headerAlign: "right",
  //   flex: 1,
  //   minWidth: 80,
  //   sortable: false,
  //   disableColumnMenu: true,

  //   renderCell: ({ row: { id } }) => {

  //     return (
  //       <Box
  //         sx={{
  //           p: "5px",
  //           textTransform: "none",
  //         }}
  //       >
  //           <Button

  //           disableElevation
  //           sx={{
  //             p: "4px",
  //             width: "50px",
  //             borderRadius: "5px",
  //             textAlign: "center",
  //             textTransform: "none",
  //             fontSize: "14px",
  //           }}
  //           variant="outlined"
  //         >
  //           Details
  //         </Button>
  //       </Box>
  //     );
  //   },
  // }
];
export { rows, columns };
