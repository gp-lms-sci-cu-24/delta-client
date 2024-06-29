import Header from "@/components/Header";
import { Grid, Avatar, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
export default function CourseRegistrationHeader() {
  return (
    <Grid container sx={{ mx:"auto" }} spacing={2}>
      <Grid item xs={12}>
        
        <Header pageName={"Course Registration"} message="" />
      </Grid>
      <Grid item xs={12} lg={2}>
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 175, height: 175 }}
          variant="square"
        >
          N
        </Avatar>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Name
        </Typography>
        <Typography variant="body2" sx={{ pb: 4 }}>
          Kenawi
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Code
        </Typography>
        <Typography variant="body2">2022000</Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Department
        </Typography>
        <Typography variant="body2" sx={{ pb: 4 }}>
          Computer Science
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Year
        </Typography>
        <Typography variant="body2">4</Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Academic Advisor
        </Typography>
        <Typography variant="body2" sx={{ pb: 4 }}>
          Hossam Hassan
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          GPA
        </Typography>
        <Typography variant="body2">5.0</Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Current hours
        </Typography>
        <Typography variant="body2" sx={{ pb: 4 }}>
          3 / 18
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Total hours
        </Typography>
        <Typography variant="body2">100 / 232</Typography>
      </Grid>
    </Grid>
  );
}
