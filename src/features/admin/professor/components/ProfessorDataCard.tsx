import { Grid, Avatar, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Professor } from "../types";

export default function ProfessorDataCard(professorData: Professor) {
  return (
    <Grid container sx={{ mx: "auto", p: 2 }} spacing={2}>
      <Grid item xs={12} lg={2}>
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 120, height: 120 }}
          variant="square"
        >
          {professorData.firstName}
        </Avatar>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Name
        </Typography>
        <Typography variant="body2" sx={{ pb: 4 }}>
          {professorData.firstName} {professorData.lastName}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          email
        </Typography>
        <Typography variant="body2">{professorData.email}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Degree
        </Typography>
        <Typography variant="body2" sx={{ pb: 4 }}>
          {professorData.degree}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Gender
        </Typography>
        <Typography variant="body2">{professorData.gender}</Typography>
      </Grid>
    </Grid>
  );
}
