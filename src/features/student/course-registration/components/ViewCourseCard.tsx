import { Course } from "@features/shared";
import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

export interface IViewCourseCardProps {
  course: Course;
}

export default function ViewCourseCard({ course }: IViewCourseCardProps) {
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={3}>
        <Avatar sx={{ width: 120, height: 120 }} variant="square">
          {course.image ? <img src={course.image} alt="course" /> : course.code}
        </Avatar>
      </Grid>
      <Grid item xs={9}>
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
      </Grid>
    </Grid>
  );
}
