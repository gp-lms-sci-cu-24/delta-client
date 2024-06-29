import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import Header from "@components/Header";
import StudentInfoCard from "@features/professor/academic-advisor/components/StudentInfoCard";
import Selector from "@components/Selector";
import ViewCourseCard from "./components/ViewCourseCard";
import ReigsteredClassesTable from "./components/ReigsteredClassesTable";
import CollapsibleTable from "./components/CollapsibleTable";

import { StudentDto } from "@features/admin/student/type";
import { Course, CourseClass } from "@features/shared";

import { useGetAllByCourseMutation } from "@features/admin/course-class/courseClassApiSlice";
import { useUserStateQuery } from "@features/auth/authApiSlice";
import {
  useGetMyAvilableCoursesQuery,
  useGetMyRegisteredCoursesQuery,
  useRegisterCourseToMeMutation,
  useRemoveRegisterMutation,
} from "./courseRegistrationApiSlice";

import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import { isFetchBaseQueryError } from "@app/api";

export default function CourseRegistration() {
  const studetnQuery = useUserStateQuery();
  const data = studetnQuery.data as StudentDto;

  // logic
  const theme = useTheme();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [groups, setGroups] = useState<CourseClass[]>();
  const [registrationActionLoading, setRegistrationActionLoading] = useState<boolean>(false);

  const [getGroups, getGroupsState] = useGetAllByCourseMutation();
  const { data: coursesData, isLoading: coursesIsLoading } = useGetMyAvilableCoursesQuery();
  const { data: registeredCourseClasses, isLoading: registeredLoading } =
    useGetMyRegisteredCoursesQuery();
  const [registerClass, registerClassState] = useRegisterCourseToMeMutation();
  const [removeClass, removeClassState] = useRemoveRegisterMutation();

  const coursesOptions =
    coursesData?.map((c) => ({ option: c.code, text: `${c.name} (${c.code})` })) ?? [];

  const isLoading =
    getGroupsState.isLoading || coursesIsLoading || registeredLoading || registrationActionLoading;
  const isRegisteredCheck = (course: Course | null) =>
    registeredCourseClasses?.some((c) => c.course.code === course?.code);
  const isRegistered = isRegisteredCheck(selectedCourse);

  const handleRegisterCourse = (courseClass: CourseClass) => {
    if (isLoading) return;
    setRegistrationActionLoading(true);
    registerClass({
      courseCode: courseClass.course.code,
      year: courseClass.year,
      semester: courseClass.semester,
      group: courseClass.groupNumber,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar(`Class registered Succefully`, {
          variant: "success",
        });
        // setSelectedCourse(null);
      })
      .catch((error) => {
        if (isFetchBaseQueryError(error)) {
          const message =
            (error.data as { message?: string }).message || "An error occured , try Again";
          enqueueSnackbar(message, {
            variant: "error",
          });
        } else {
          enqueueSnackbar("An error occured , try Again", {
            variant: "error",
          });
        }
      })
      .finally(() => setRegistrationActionLoading(false));
  };

  const handleRemoveRegisterCourse = (courseClass: CourseClass) => {
    if (isLoading) return;
    setRegistrationActionLoading(true);
    removeClass({
      courseCode: courseClass.course.code,
      year: courseClass.year,
      semester: courseClass.semester,
      group: courseClass.groupNumber,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar(`Class Removed`, {
          variant: "success",
        });
        // setSelectedCourse(null);
      })
      .catch((error) => {
        if (isFetchBaseQueryError(error)) {
          const message =
            (error.data as { message?: string }).message || "An error occured , try Again";
          enqueueSnackbar(message, {
            variant: "error",
          });
        }
        enqueueSnackbar("An error occured , try Again", {
          variant: "error",
        });
      })
      .finally(() => setRegistrationActionLoading(false));
  };

  const changeSelectedCourse = (courseCode: string | null) => {
    const course = coursesData?.find((c) => c.code === courseCode);
    if (!course || isLoading) {
      return;
    }
    setSelectedCourse(course);
    if (isRegisteredCheck(course)) return;

    getGroups(course.code)
      .unwrap()
      .then((result) => {
        setGroups(result.content);
        enqueueSnackbar(`groups for ${course?.name} is Loaded`, {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(`Error Ocured when Loading groups`, {
          variant: "error",
        });
        console.error(error);
      });
  };

  return (
    <Box sx={{ p: 2, width: "100%", minHeight: "100vh", mb: 4 }}>
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

      <Stack
        direction="row"
        sx={{
          border: 1,
          borderColor: "rgba(0, 0, 0, 0.12)",
          borderRadius: 1,
          borderStyle: "solid",
          minHeight: 350,
          p: 2,
        }}
      >
        <Stack
          width="50%"
          flexDirection="column"
          sx={
            {
              // borderRight: "1px solid rgba(224, 224, 224, 1)",
            }
          }
        >
          <Typography
            sx={{
              color: theme.palette.info.light,
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Course Selctor
          </Typography>
          <Stack direction="column" sx={{ mx: 2 }}>
            <Selector
              label="Choose Course"
              title="Choose Course"
              value={selectedCourse?.code ?? null}
              setValue={changeSelectedCourse}
              options={coursesOptions}
              selectorComponentStyle={{ maxWidth: "400px" }}
              isLoading={isLoading}
            />
            {selectedCourse ? (
              <ViewCourseCard course={selectedCourse} />
            ) : (
              <>
                <Typography variant="h1" textAlign="center" color="gray">
                  <BrowserNotSupportedIcon sx={{ scale: "4" }} />
                </Typography>
                <Typography variant="h5" fontWeight="bold" py={2} textAlign="center" color="gray">
                  No course Chossen
                </Typography>
              </>
            )}
          </Stack>
        </Stack>
        <Box width="50%" sx={{ backgroundColor: "" }}>
          <CollapsibleTable
            isLoading={getGroupsState.isLoading}
            isRegistered={isRegistered}
            data={groups}
            handleRegister={handleRegisterCourse}
          />
        </Box>
      </Stack>

      <ReigsteredClassesTable
        courseClasses={registeredCourseClasses}
        isLoading={registeredLoading}
        removeCourseClassRegistration={handleRemoveRegisterCourse}
      />
    </Box>
  );
}
