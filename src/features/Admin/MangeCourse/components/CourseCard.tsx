import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Course } from "../type";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import { useDeleteCourseMutation } from "../courseApiSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import ExpandMore from "./ExpandMore";
import DefaultCourseImage from "/src/assets/images.jpeg";
import { DeleteButton } from "@/components/delete/DeleteButton";

export interface ICourseCardProps {
  course: Course;
}

function CourseCard(props: ICourseCardProps) {
  const { course } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [deleteCourse, { isLoading }] = useDeleteCourseMutation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteCourseHandler = () => {
    deleteCourse(course.code)
      .then(() => {
        enqueueSnackbar(`${course.name} has been deleted`, {
          variant: "success",
        });
      })
      .catch((error: any) => {
        console.log("error", error);
        enqueueSnackbar(`error happen in delete`, {
          variant: "error",
        });
      });
  };

  return (
    <Card
      sx={{
        minWidth: 215,
        maxWidth: 355,
        height: "auto",
        borderRadius: 4,
        mx: "auto",
      }}
      elevation={0}
      variant="outlined"
    >
      <CardMedia
        sx={{ height: 150, marginX: 1, marginTop: 1, borderRadius: 4 }}
        image={course.image || DefaultCourseImage}
        title="course image"
      />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            gutterBottom
            fontWeight={"bold"}
            variant="h6"
            component="div"
            textTransform={"capitalize"}
          >
            {course.name}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon fontSize="inherit" sx={{ color: "#1089d4", mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {course.creditHours} hours
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ApartmentIcon fontSize="inherit" sx={{ color: "#1089d4", mr: 1 }} />
          <Typography
            variant="body2"
            component="span"
            style={{ cursor: "pointer" }}
            textTransform={"capitalize"}
          >
            {course.departments.map((d) => d.department.name).join(", ")}
          </Typography>
        </Box>
        {course.coursePrerequisites.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LinkIcon fontSize="inherit" sx={{ color: "#1089d4", mr: 1 }} />
            <Typography
              variant="body2"
              component="span"
              style={{ cursor: "pointer" }}
              textTransform={"capitalize"}
            >
              {course.coursePrerequisites.join(", ")}
            </Typography>
          </Box>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <DeleteButton onDelete={deleteCourseHandler} isLoading={isLoading} />
        <Tooltip placement="right" title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/app/courses/update/${course.code}`)
            }
            aria-label="share"
          >
            <EditIcon sx={{ color: "#1089d4" }} />
          </IconButton>
        </Tooltip>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Course Info :</Typography>
          <Typography paragraph>{course.info}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default CourseCard;
