interface IStudent {
  title: string;
  path: string;
}
interface IProps {
  userName: string;
}
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteProfessorMutation } from "./professorApiSlice";

const DeleteButton = ({ userName }: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteProfessor, { isLoading }] = useDeleteProfessorMutation();
  const handleDelete = async () => {
    console.log("ID", userName);
    await deleteProfessor(userName)
      .then((res) => {
        console.log("res", res);
        enqueueSnackbar("Professor deleted successfully", {
          variant: "success",
        });
      })
      .catch((e) => {
        console.log("error", e);
        enqueueSnackbar(`Failed to delete Professor`, {
          variant: "error",
        });
      });
  };

  return (
    <IconButton onClick={handleDelete} disabled={isLoading}>
      {isLoading ? (
        <CircularProgress size={24} />
      ) : (
        <DeleteIcon color="error" />
      )}
    </IconButton>
  );
};

const EditButton = ({ userName }: IProps) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    console.log("ID", userName);
    navigate(`/app/admin/professors/update/${userName}`);
  };
  return (
    <IconButton onClick={handleEdit}>
      <EditIcon color="primary" />
    </IconButton>
  );
};
const ProfessorData: IStudent[] = [
  {
    title: "All Professors",
    path: "/app/professors",
  },
  {
    title: "Add Professor",
    path: "/app/professors/add",
  },
];
const ProfessorRows: GridRowsProp = [
  {
    id: 1,
    name: "Dr. Hossam",
  },
  {
    id: 2,
    name: "Dr. Ahmed",
  },
];
const ProfessorColumns: GridColDef[] = [
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
        <Typography variant="subtitle2">
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
      return <Typography variant="subtitle2">{roles.toString()}</Typography>;
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
    renderCell: (params) => {
      return <EditButton userName={params.row.username} />;
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
    renderCell: (params) => {
      return <DeleteButton userName={params.row.username} />;
    },
  },
];

export { ProfessorData, ProfessorColumns, ProfessorRows };
