import { Box, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useDeleteLocationMutation } from "../locationApiSlice";
import DepartmentCardFadeMenu from "../../departments/components/DepartmentCardFadeMenu";

interface LocationCardProps {
  name?: string;
  info?: string;
  image?: string;
  maxCapacity?: number;
  id: number;
  handleOnUpdate?: () => void;
}
const defaultImageUrl = "/assets/images/faculty.jpg";

function LocationCard({ name, info, image, maxCapacity, id, handleOnUpdate }: LocationCardProps) {
  const [deleteLocation, { isLoading: isDeleting }] = useDeleteLocationMutation();

  const handleOnDelete = () => {
    deleteLocation(id)
      .unwrap()
      .then(() => {
        enqueueSnackbar(`Location deleted successfully`, {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(`An error occurred. Please try again.`, {
          variant: "error",
        });
      });
  };
  return (
    <Card
      variant="outlined"
      elevation={0}
      sx={{
        position: "relative",
        flexDirection: "column",
        borderRadius: 4,
        opacity: isDeleting ? 0.5 : 1,
      }}
    >
      {isDeleting && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <CardMedia
        component="img"
        sx={{
          height: 150,
        }}
        image={image || defaultImageUrl}
        title="location image"
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

          <DepartmentCardFadeMenu onDelete={handleOnDelete} onUpdate={handleOnUpdate} />
        </Box>

        <Typography variant="body2" color="textSecondary">
          Info {info}
        </Typography>

        <Typography variant="body2">Capacity: {maxCapacity}</Typography>
      </CardContent>
    </Card>
  );
}

export default LocationCard;
