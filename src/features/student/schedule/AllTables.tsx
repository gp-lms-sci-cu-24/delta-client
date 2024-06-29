import { Box, Grid } from "@mui/material";
import ScheduleCard from "./components/ScheduleCard";
import Header from "@/components/Header";
import { Schedules } from "./SchedulesData";

function AllTables() {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header pageName={"Schedule"} message="" />
        </Grid>
        {Schedules.map((schedule, index: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ScheduleCard title={schedule.title} imageUrl={schedule.imageUrl} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AllTables;
