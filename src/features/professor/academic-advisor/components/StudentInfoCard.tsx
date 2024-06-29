import { Department } from "@features/admin/departments/types";
import { Gender, Level } from "@features/admin/student/type";
import { Grid, Avatar, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

interface Student {
  username?: string;
  gender?: Gender;
  firstName?: string;
  fatherName?: string;
  grandfatherName?: string;
  lastname?: string;
  code?: string;
  address?: string;
  gpa?: number;
  creditHoursSemester?: number;
  level?: Level;
  creditHours?: number;
  joiningYear?: string;
  department?: Department;
  profilePicture?: string;
}
export default function StudentInfoCard({
  username,
  creditHours,
  creditHoursSemester,
  level,
  fatherName,
  grandfatherName,
  firstName,
  gpa,
  department,
  joiningYear,
  profilePicture,
}: Student) {
  console.log("profilePicture", profilePicture);

  return (
    <Grid container sx={{ mx: "auto", p: 2 }} spacing={2}>
      <Grid item xs={12} lg={2}>
        <Avatar sx={{ bgcolor: deepOrange[500], width: 120, height: 120 , borderRadius:2 }} src={profilePicture} variant="square">
          N
        </Avatar>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Name
        </Typography>
        <Typography variant="body2" sx={{ pb: 4 }}>
          {firstName} {fatherName} {grandfatherName}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Code
        </Typography>
        <Typography variant="body2">{username}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Department
        </Typography>
        <Typography variant="body2" sx={{ pb: 4 }}>
          {department?.code}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Level
        </Typography>
        <Typography variant="body2">{level}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          GPA
        </Typography>
        <Typography variant="body2" sx={{ pb: 4 }}>
          {gpa}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Joining Year
        </Typography>
        <Typography variant="body2">{joiningYear}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Current hours
        </Typography>
        <Typography variant="body2" sx={{ pb: 4 }}>
          {creditHoursSemester}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Total hours
        </Typography>
        <Typography variant="body2">{creditHours}</Typography>
      </Grid>
    </Grid>
  );
}
