import { Box, Grid } from "@mui/material";
import StudentCourseCard from "./components/StudentCourseCard";
import Header from "@/components/Header";
import { useGetMyRegisteredCoursesQuery } from "../course-registration/courseRegistrationApiSlice";
import Loading from "@components/Loading";
import Image from "/src/assets/images.jpeg";
function StudentCourse() {
  const { data: Courses, isLoading: registeredLoading } = useGetMyRegisteredCoursesQuery();
  if (registeredLoading) return <Loading></Loading>;
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header pageName={"My Courses"} message="" />
        </Grid>
        {Courses?.map((course, index: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StudentCourseCard
              imageUrl={course.course.image ?? Image}
              title={course.course.name}
              proffessor={course.professors ? course.professors[0]?.username : "wello"}
              hours={course.course.creditHours ? course.course.creditHours : 3}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default StudentCourse;
