import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useNavigate } from "react-router-dom";
import { blue, green, red } from "@mui/material/colors";
import { CourseClass, CourseClassState } from "../type";
import DefaultCourseImage from "/src/assets/images.jpeg";

interface CourseClassCardProps {
  // title: string;
  // imageUrl: string;
  // proffessor: string;
  // totalStudents: number;
  // maxCapacity: number;
  // year: number;
  // courseState: string;
  courseClass: CourseClass;
}

function CourseClassCard({
  // title,
  // imageUrl,
  // proffessor,
  // totalStudents,
  // maxCapacity,
  // year,
  // courseState,
  courseClass,
}: CourseClassCardProps) {
  const title = `${courseClass.course.name} - ${courseClass.groupNumber}`;
  const imageUrl = courseClass.course.image || DefaultCourseImage;
  const proffessor = courseClass.adminProfessor.username;
  const totalStudents = courseClass.numberOfStudentsRegistered;
  const maxCapacity = courseClass.maxCapacity;
  const year = courseClass.year;
  const courseState = courseClass.state;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/app/dashboard");
  };

  function getBackground(courseState: CourseClassState): string {
    switch (courseState.toString()) {
      case "INACTIVE":
        return red[400];
      case "IN_PROGRESS":
        return green[400];
      case "FINISHED":
        return "gray";
      case "REGISTRATION":
        return blue[500];
      default:
        return "red";
    }
  }

  return (
    <Card
      sx={{
        minWidth: 215,
        maxWidth: 315,
        height: "100%",
        borderRadius: 4,
        paddingBottom: 0,
      }}
      elevation={0}
      variant="outlined"
    >
      <CardMedia
        sx={{
          height: 150,
          width: "100%",
          objectFit: "cover",
          borderTopRightRadius: 4,
          borderTopLeftRadius: 4,
        }}
        image={imageUrl}
        title="course image"
      />

      <CardContent>
        <Typography
          gutterBottom
          fontWeight={"bold"}
          variant="subtitle1"
          component="div"
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => handleClick()}
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
            onClick={() => navigate("/app/profile")}
          >
            {proffessor}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <GroupsIcon
            fontSize="inherit"
            sx={{ color: "#1089d4", mr: 1, my: 0.5 }}
          />
          <Typography variant="body2" component="span">
            {totalStudents}
          </Typography>
          <Typography variant="caption" color=" #bdbdbd" sx={{ mr: 1, ml: 1 }}>
            /
          </Typography>
          <Typography variant="body2" component="span">
            {maxCapacity}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DateRangeIcon
            fontSize="inherit"
            sx={{ color: "#1089d4", mr: 1, my: 0.5 }}
          />
          <Typography variant="body2" component="span">
            {year - 1}
          </Typography>
          <Typography variant="caption" color=" #bdbdbd" sx={{ mr: 1, ml: 1 }}>
            /
          </Typography>
          <Typography variant="body2" component="span">
            {year}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", pt: 1, mb: -2 }}>
          <Box
            sx={{
              width: "auto",
              borderRadius: 2,
              fontSize: 10,
              fontWeight: "bold",
              p: 1,
              color: "white",
              background: getBackground(courseState),
            }}
          >
            {courseState}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
export default CourseClassCard;
