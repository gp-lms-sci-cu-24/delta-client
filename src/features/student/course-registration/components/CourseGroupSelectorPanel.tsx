import Selector from "@components/Selector";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import ViewCourseCard from "./ViewCourseCard";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import CollapsibleTable from "./CollapsibleTable";
import { useGetAllByCourseMutation } from "@features/admin/course-class/courseClassApiSlice";
import { useState } from "react";
import { Course, CourseClass } from "@features/shared";
import { enqueueSnackbar } from "notistack";

export interface ICourseGroupSelectorPanelProps {
  coursesData: Course[] | undefined;
  isRegisteredCheck: (course: Course | null) => boolean;
  handleRegisterCourse: (courseClass: CourseClass) => void;
  isLoading: boolean;
  isRegistering?: boolean;
}

export default function CourseGroupSelectorPanel({
  coursesData,
  isLoading,
  isRegisteredCheck,
  handleRegisterCourse,
  isRegistering,
}: ICourseGroupSelectorPanelProps) {
  const [getGroups, getGroupsState] = useGetAllByCourseMutation();
  const theme = useTheme();
  const [groups, setGroups] = useState<CourseClass[]>();
  const coursesOptions =
    coursesData?.map((c) => ({ option: c.code, text: `${c.name} (${c.code})` })) ?? [];
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const isRegistered = isRegisteredCheck(selectedCourse);

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
    <Stack
      direction="row"
      flexWrap="wrap"
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
        width={{ md: "50%", xs: "100%" }}
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
        <Stack direction="column" justifyContent="center" sx={{ mx: 2 }}>
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
            <Box sx={{ maxWidth: "400px" }}>
              <Typography variant="h1" textAlign="center" color="gray">
                <BrowserNotSupportedIcon sx={{ scale: "4" }} />
              </Typography>
              <Typography variant="h5" fontWeight="bold" py={2} textAlign="center" color="gray">
                No course Chossen
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
      <Box width={{ md: "50%", xs: "100%" }}>
        <CollapsibleTable
          isLoading={getGroupsState.isLoading}
          isRegistered={isRegistered}
          data={groups}
          handleRegister={handleRegisterCourse}
          isRegistering={isRegistering}
        />
      </Box>
    </Stack>
  );
}
