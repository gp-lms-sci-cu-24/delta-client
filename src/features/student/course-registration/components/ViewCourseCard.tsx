import { Course } from "@features/shared";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

export interface IViewCourseCardProps {
  course: Course;
}

export default function ViewCourseCard({ course }: IViewCourseCardProps) {
  return (
    <Stack
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="center"
      sx={{ mt: 3, mb: 2 }}
    >
      <Stack flex={1} alignItems={{ xs: "center", sm: "start" }} maxWidth={130} margin="auto">
        <Avatar sx={{ width: 120, height: 120, m: 0.5 }} variant="rounded">
          {course.image ? <img src={course.image} alt="course" /> : course.code}
        </Avatar>
      </Stack>
      <Stack flex={2} flexDirection="column" alignItems={{ xs: "center", sm: "start" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {course.name}
        </Typography>
        <Typography variant="subtitle2">{course.code}</Typography>
        <Typography variant="body1">
          {course.creditHours} Credit Hour{course.creditHours > 1 ? "s" : ""}
        </Typography>
        <Typography variant="caption">{course.info}</Typography>
        <Typography variant="subtitle2" sx={{ mt: "2" }}>
          Prerequisites:
        </Typography>

        <Box>
          {course.coursePrerequisites?.length === 0 ? (
            <Typography variant="subtitle1">No Prerequisites</Typography>
          ) : (
            course.coursePrerequisites.map((s) => (
              <Chip color="success" size="small" icon={<DoneIcon />} label={s} sx={{ m: 0.5 }} />
            ))
          )}
        </Box>
      </Stack>
    </Stack>
  );
}
