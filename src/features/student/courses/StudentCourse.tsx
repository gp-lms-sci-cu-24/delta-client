import { Box, Grid } from "@mui/material";
import { Courses } from "./StudentCrousesData";
import StudentCourseCard from "./components/StudentCourseCard";
import Header from "@/components/Header";

function StudentCourse() {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header pageName={"My Courses"} message="" />
        </Grid>
        {Courses.map((course, index: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StudentCourseCard
              imageUrl={course.imageUrl}
              title={course.title}
              proffessor={course.proffessor}
              hours={course.hours}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default StudentCourse;
