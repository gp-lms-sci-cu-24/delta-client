import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Typography } from "@mui/material";
import { Gender, Level } from "./type";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSnackbar } from "notistack";
import { useDeleteStudentMutation } from "./studentApiSlice";
import { useNavigate } from "react-router-dom";
interface IProps {
  username: string;
}

const DeleteButton = ({ username }: IProps) => {
  const [deleteStudent] = useDeleteStudentMutation();
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = () => {
    console.log("ID", username);

    deleteStudent(username)
      .then(() => {
        // Handle success
        enqueueSnackbar("Student deleted successfully", {
          variant: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar(`Failed to delete student `, {
          variant: "error",
        });
      });
  };

  return (
    <IconButton onClick={handleDelete}>
      <DeleteIcon color="error" />
    </IconButton>
  );
};
const EditButton = ({ username }: IProps) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    console.log("username", username);
    navigate(`/app/admin/students/update/${username}`);
  };
  return (
    <IconButton onClick={handleEdit}>
      <EditIcon color="primary" />
    </IconButton>
  );
};
const StudentGender = [
  {
    value: Gender.MALE,
    label: "MALE",
  },
  {
    value: Gender.FEMALE,
    label: "FEMALE",
  },
];

const StudentLevels = [
  {
    value: Level.LEVEL_1,
    label: "LEVEL 1",
  },
  {
    value: Level.LEVEL_2,
    label: "LEVEL 2",
  },
  {
    value: Level.LEVEL_3,
    label: "LEVEL 3",
  },
  {
    value: Level.LEVEL_4,
    label: "LEVEL 4",
  },
];
const StudentColumns: GridColDef[] = [
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
        <Typography variant="subtitle2">
          {firstName +
            " " +
            fatherName +
            " " +
            grandfatherName +
            " " +
            lastname}
        </Typography>
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
        <Typography variant="subtitle2">{level.replace(/_/g, " ")}</Typography>
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
      return <Typography variant="subtitle2">{department?.code}</Typography>;
    },
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 100,
    minWidth: 80,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
    renderCell: ({ row: { username } }) => {
      return <EditButton username={username} />;
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
    disableColumnMenu: true,
    renderCell: ({ row: { username } }) => {
      return <DeleteButton username={username} />;
    },
  },
];

export { StudentColumns, StudentGender, StudentLevels };
