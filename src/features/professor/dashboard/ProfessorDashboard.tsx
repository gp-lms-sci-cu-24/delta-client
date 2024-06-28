import Container from "@mui/material/Container";
import { Grid, useTheme } from "@mui/material";
import ProfessorCard from "./professorComponents/ProfessorCard";
import NewStudentsCard from "./professorComponents/NewStudentsCard";
import TotalStudentsCard from "./professorComponents/TotalStudentsCard";
import AgendaCard from "./professorComponents/AgendaCard";
import { OverallPerformanceCard } from "./professorComponents/OverallPerformanceCard";
import HeaderDataField from "@/components/HeaderDataField";
function ProfessorDashboard() {
  const theme = useTheme();

  return (
    <Container
      sx={{
        backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "",
        width: "100%",
        p: 3,
      }}
      maxWidth="xl"
    >
      {/* header */}
      <HeaderDataField
        name="Welcome Back Prof. Hossam"
        value="Here's what's happening"
      />

      {/* parent Grid */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ProfessorCard percentage="50%" text="New Students" />
        </Grid>

        {/* New students card */}
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <NewStudentsCard
            header="New Students"
            number={12.782}
            percentage="80% Increase than Before"
          />
        </Grid>

        {/* Total students card */}

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TotalStudentsCard
            header="Total Students"
            number={12.782}
            percentage="80% Increase than Before"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AgendaCard header="Agenda for meetings" />
        </Grid>
        {/* Overall performance card */}
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <OverallPerformanceCard header="Overall Performance" text="" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfessorDashboard;
