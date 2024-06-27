import { Box, Grid } from "@mui/material";
import AdminCard from "./components/AdminComponents/AdminCard";
import HeaderDataField from "@/components/HeaderDataField";
function AdminDashboard() {
  return (
    <Box
      sx={{
        height: "100vh",
        p: 2,
      }}
    >
      <HeaderDataField
        name="Welcome Back Admin"
        value="Here's what's happening"
      />
      <Grid container spacing={1} sx={{ mx: "auto" }} columns={12}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value="10" title="Total Students" />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value="10" title="Total Professors" />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value="10" title="Total Courses" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value="10" title="Total Locations" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value="10" title="Total Departments" />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value="10" title="Total Course Class" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
