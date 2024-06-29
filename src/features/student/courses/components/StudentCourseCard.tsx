import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
interface StudentCourseCardProps {
  title: string;
  imageUrl: string;
  proffessor: string;
  hours: number;
}

function StudentCourseCard({
  title,
  imageUrl,
  hours,
  proffessor,
}: StudentCourseCardProps) {
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
      <CardMedia
        sx={{ height: 150, marginX: 1, marginTop: 1, borderRadius: 4 }}
        image={imageUrl}
        title="course image"
      />
      <CardContent>
        <Typography
          gutterBottom
          fontWeight={"bold"}
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PersonIcon
            fontSize="inherit"
            sx={{ color: "#1089d4", mr: 1, my: 0.5 }}
          />
          <Typography variant="caption" color=" #bdbdbd" sx={{ mr: 1 }}>
            By
          </Typography>
          <Typography
            variant="body2"
            component="span"
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {proffessor}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon
            fontSize="inherit"
            sx={{ color: "#1089d4", mr: 1, my: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary">
            {hours} hours
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        {/* <Button
          fullWidth
          variant="outlined"
          sx={{
            transition: "background-color .4s",
            "&:hover": {
              backgroundColor: "#1089d4",
              color: "white",
            },
          }}
        >
          Continue Learning
        </Button> */}
      </CardActions>
    </Card>
  );
}
export default StudentCourseCard;
