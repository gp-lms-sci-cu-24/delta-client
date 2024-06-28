import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ScheduleCardProps {
  title: string;
  imageUrl: string;
}

function ScheduleCard({ title, imageUrl }: ScheduleCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/app/student/viewschedule");
  };

  return (
    <Card
      sx={{
        minWidth: 215,
        maxWidth: 355,
        height: "100%",
        borderRadius: 4,
      }}
      elevation={0}
      variant="outlined"
    >
      <CardMedia sx={{ height: 150 }} image={imageUrl} title="course image" />
      <CardContent>
        <Typography
          gutterBottom
          fontWeight={"bold"}
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            transition: "background-color .4s",
            "&:hover": {
              backgroundColor: "#1089d4",
              color: "white",
            },
          }}
          onClick={handleClick} // Call handleClick when button is clicked
        >
          View Schedule
        </Button>
      </CardActions>
    </Card>
  );
}

export default ScheduleCard;
