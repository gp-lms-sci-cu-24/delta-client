import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import CollapsibleTable from "./components/CollapsibleTable";
import CurrentTable from "./components/CurrentTable";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useGetMyAvilableCoursesQuery } from "./courseRegistrationApiSlice";
import { useGetAllByCourseMutation } from "@features/admin/course-class/courseClassApiSlice";
import { StudentDto } from "@features/admin/student/type";
import { CourseClass } from "@features/admin/course-class/type";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { useUserStateQuery } from "@/features/auth/authApiSlice";
import StudentInfoCard from "@features/professor/academic-advisor/components/StudentInfoCard";

export default function CourseRegistration() {
  const studetnQuery = useUserStateQuery();
  const [course, setCourse] = useState<string>();
  const [groups, setGroups] = useState<CourseClass[]>();
  const [getGroups] = useGetAllByCourseMutation();
  const { data: Courses } = useGetMyAvilableCoursesQuery();
  const data = studetnQuery.data as StudentDto;
  const theme = useTheme();

  console.log("Courses", Courses);
  const handleOnChoosingCourse = async () => {
    console.log("course code", course);
    try {
      const data = (await getGroups(course ?? "").unwrap()).content;
      console.log("data", data);
      setGroups(data);

      enqueueSnackbar(`groups for course is found `, {
        variant: "success",
      });
    } catch {
      enqueueSnackbar(`groups for course is found `, {
        variant: "success",
      });
    }
  };

  if (studetnQuery.isLoading) return <Loading />;

  return (
    <Box sx={{ p: 2, width: "100%", height: "100vh" }}>
      <Header pageName="Registration" />
      <StudentInfoCard
        username={data?.username}
        creditHours={data?.creditHours}
        creditHoursSemester={data?.creditHoursSemester}
        level={data?.level}
        fatherName={data?.fatherName}
        grandfatherName={data?.grandfatherName}
        firstName={data?.firstName}
        gpa={data?.gpa}
        department={data?.department}
        joiningYear={data?.joiningYear}
        profilePicture={data?.profilePicture}
      />
      <Typography
        sx={{
          color: theme.palette.info.light,
          fontWeight: "bold",
          pt: 2,
          pb: 2,
          pl: 2,
        }}
      >
        choose a course
      </Typography>

      <Box sx={{ flexDirection: "row", display: "flex", pl: 1 }}>
        <Select
          labelId="course-select"
          label="Course"
          id="Course-select"
          value={course}
          onChange={(event) => setCourse(event.target.value)}
          size="medium"
        >
          {Courses?.map((course) => (
            <MenuItem value={course.code} key={course.code}>
              {course.code}
            </MenuItem>
          ))}
        </Select>

        <Box sx={{ m: 2 }}>
          <Button onClick={handleOnChoosingCourse}>Show groups</Button>
        </Box>
      </Box>

      <Box sx={{ m: 2 }}>
        <CollapsibleTable
          rows={
            !groups
              ? []
              : groups?.map(({ groupNumber, timings }) => ({
                  name: "Group " + groupNumber.toString(),
                  timeTable: !timings
                    ? []
                    : timings.map((t) => ({
                        Day: t.day.toString(),
                        StartAt: t.startTime.toString(),
                        EndAt: t.endTime.toString(),
                        Type: t.type.toString(),
                      })),
                }))
          }
        />
      </Box>

      <CurrentTable />
    </Box>
  );
}
