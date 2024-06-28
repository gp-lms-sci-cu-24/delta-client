import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import ClearIcon from "@mui/icons-material/Clear";
import { useRemoveAssignUserMutation } from "./acadmicadvisorApiSlice";
interface IProps {
  professorUserName: string;
  studentUserName: string;
}

const RemoveButton = ({ professorUserName, studentUserName }: IProps) => {
  const [removeAssign, { isLoading }] = useRemoveAssignUserMutation();
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = () => {
    const array = [professorUserName, studentUserName];
    removeAssign(array)
      .then((res) => {
        if (res.data) {
          enqueueSnackbar("Student removed successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`Failed to remove student `, {
            variant: "error",
          });
        }
        console.log("Result", res);
      })
      .catch((e) => {
        console.log("error", e);
        enqueueSnackbar(`Failed to delete student `, {
          variant: "error",
        });
      });
  };
  return (
    <IconButton onClick={handleDelete} disabled={isLoading}>
      {isLoading ? <CircularProgress size={24} /> : <ClearIcon color="error" />}
    </IconButton>
  );
};

const AssignedStudent: GridColDef[] = [
  {
    field: "username",
    headerName: "Code",
    width: 120,
    minWidth: 100,
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

    renderCell: ({
      row: { firstName, lastname, fatherName, grandfatherName },
    }) => {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="subtitle2">
            {firstName +
              " " +
              fatherName +
              " " +
              grandfatherName +
              " " +
              lastname}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "level",
    headerName: "Level",
    minWidth: 120,
    width: 150,
    align: "left",
    headerAlign: "left",
    renderCell: ({ row: { level } }) => {
      return (
        <Box display="flex" alignItems="center" height="100%">
          <Typography variant="subtitle2">
            {level.replace(/_/g, " ")}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "gpa",
    headerName: "GPA",
    width: 80,
    minWidth: 50,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "creditHours",
    headerName: "Credits Hours",
    minWidth: 120,
    width: 150,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
    align: "left",
    minWidth: 150,
    headerAlign: "left",
    sortable: false,
  },
  {
    field: "joiningYear",
    headerName: "Joining Year",
    align: "left",
    headerAlign: "left",
    minWidth: 80,
    disableColumnMenu: true,
    width: 120,
  },
  {
    field: "department",
    headerName: "Department",
    align: "left",
    headerAlign: "left",
    minWidth: 100,
    width: 120,
    disableColumnMenu: true,
    renderCell: ({ row: { department } }) => {
      return (
       <Box display="flex" alignItems="center" height="100%">
        <Typography variant="subtitle2">{department?.code}</Typography>
      </Box>
      );
    },
  },

  {
    field: "academicAdvisor",
    headerName: "Academic Advisor",
    align: "left",
    headerAlign: "left",
    minWidth: 80,
    width: 120,
    disableColumnMenu: true,
    renderCell: ({ row: { academicAdvisor } }) => {
      return <Typography display="flex" alignItems="center" height="100%" variant="subtitle2">{academicAdvisor}</Typography>;
    },
  },
  {
    field: "delete",
    headerName: "Remove",
    width: 100,
    minWidth: 80,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
    renderCell: ({ row: { username, academicAdvisor } }) => {
      return (
        <RemoveButton
          professorUserName={academicAdvisor}
          studentUserName={username}
        />
      );
    },
  },
];

const AssignedProfessor: GridColDef[] = [
  {
    field: "username",
    headerName: "Username",
    width: 120,
    minWidth: 100,
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
    renderCell: ({ row: { firstName, lastName } }) => {
      return (

        <Typography display="flex" alignItems="center" height="100%" variant="subtitle2">
          {firstName + " " + lastName}
        </Typography>
      );
    },
  },
  {
    field: "degree",
    headerName: "Degree",
    minWidth: 120,
    width: 150,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 80,
    minWidth: 50,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 120,
    width: 150,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "roles",
    headerName: "Roles",
    width: 300,
    align: "left",
    minWidth: 150,
    headerAlign: "left",
    sortable: false,
    renderCell: ({ row: { roles } }) => {
      console.log("role", roles);
      return <Typography display="flex" alignItems="center" height="100%" variant="subtitle2">{roles.toString()}</Typography>;
    },
  },
  {
    field: "supervisor",
    headerName: "Supervisor",
    align: "left",
    headerAlign: "left",
    minWidth: 80,
    width: 120,
    disableColumnMenu: true,
    renderCell: ({ row: { supervisor } }) => {
      return <Typography  display="flex" alignItems="center" height="100%" variant="subtitle2">{supervisor}</Typography>;
    },
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 100,
    minWidth: 80,
    align: "left",
    headerAlign: "left",
    sortable: false,
    renderCell: ({ row: { username, supervisor } }) => {
      return (
        <RemoveButton
          professorUserName={supervisor}
          studentUserName={username}
        />
      );
    },
  },
];

export { AssignedProfessor, AssignedStudent };
