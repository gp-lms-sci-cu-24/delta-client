import { enqueueSnackbar } from "notistack";

import { Box } from "@mui/material";
import Header from "@components/Header";
import StudentInfoCard from "@features/professor/academic-advisor/components/StudentInfoCard";
import ReigsteredClassesTable from "./components/ReigsteredClassesTable";

import { StudentDto } from "@features/admin/student/type";
import { Course, CourseClass } from "@features/shared";

import { useUserStateQuery } from "@features/auth/authApiSlice";
import {
  useGetMyAvilableCoursesQuery,
  useGetMyRegisteredCoursesQuery,
  useRegisterCourseToMeMutation,
  useRemoveRegisterMutation,
} from "./courseRegistrationApiSlice";

import { isFetchBaseQueryError } from "@app/api";
import CourseGroupSelectorPanel from "./components/CourseGroupSelectorPanel";

export default function CourseRegistration() {
  const studetnQuery = useUserStateQuery();
  const data = studetnQuery.data as StudentDto;

  // logic
  // const [registrationActionLoading, setRegistrationActionLoading] = useState<boolean>(false);

  const { data: coursesData, isLoading: coursesIsLoading } = useGetMyAvilableCoursesQuery();
  const { data: registeredCourseClasses, isLoading: registeredLoading } =
    useGetMyRegisteredCoursesQuery();
  const [registerClass, registerClassState] = useRegisterCourseToMeMutation();
  const [removeClass, removeClassState] = useRemoveRegisterMutation();
  const isRegisteredCheck = (course: Course | null) =>
    registeredCourseClasses?.some((c) => c.course.code === course?.code) ?? false;

  const isLoading =
    coursesIsLoading ||
    registeredLoading ||
    registerClassState.isLoading ||
    removeClassState.isLoading;

  const handleRegisterCourse = (courseClass: CourseClass) => {
    if (isLoading) return;
    // setRegistrationActionLoading(true);
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
      });
    // .finally(() => setRegistrationActionLoading(false));
  };
  const handleRemoveRegisterCourse = (courseClass: CourseClass) => {
    if (isLoading) return;
    // setRegistrationActionLoading(true);
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
      });
    // .finally(() => setRegistrationActionLoading(false));
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
      <CourseGroupSelectorPanel
        coursesData={coursesData}
        handleRegisterCourse={handleRegisterCourse}
        isLoading={isLoading}
        isRegisteredCheck={isRegisteredCheck}
        isRegistering={isLoading}
      />
      <ReigsteredClassesTable
        courseClasses={registeredCourseClasses}
        isLoading={registeredLoading}
        isRemoving={isLoading}
        removeCourseClassRegistration={handleRemoveRegisterCourse}
      />
    </Box>
  );
}
