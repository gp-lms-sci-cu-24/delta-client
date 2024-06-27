import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import DepartmentCardFadeMenu from "./DepartmentCardFadeMenu";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDeleteDepartmentMutation } from "../departmentsApiSlice";

interface DepartmentCardProps {
  name: string;
  image: string;
  info: string;
  code: string;
}

const defaultDepartmentImageUrl = "/assets/images/faculty.jpg";
function DepartmentCard({ name, image, info, code }: DepartmentCardProps) {
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const deleteDepartmentHandler = () => {
    deleteDepartment(code)
      .unwrap()
      .then(() => {
        enqueueSnackbar(`Department ${name} deleted successfully`, {
          variant: "success",
        });
      });
  };

  const handleOnUpdate = () => {
    navigate(`/app/admin/department/update/${code}`);
  };

  return (
    <Card
      variant="outlined"
      elevation={0}
      sx={{
        flexDirection: "column",
        borderRadius: 4,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 150,
        }}
        image={image.length > 0 ? image : defaultDepartmentImageUrl}
        title="department image"
      />
      <CardContent sx={{ width: "100%", pt: 1, pl: 1, pr: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <DepartmentCardFadeMenu
            onDelete={deleteDepartmentHandler}
            onUpdate={handleOnUpdate}
          />
        </Box>
        <Typography variant="body2" color="textSecondary">
          {info.length > 0 ? info : <br />}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {code}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DepartmentCard;
