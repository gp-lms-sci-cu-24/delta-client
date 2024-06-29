import { Box, Grid } from "@mui/material";
import AdminCard from "./components/AdminComponents/AdminCard";
import HeaderDataField from "@/components/HeaderDataField";
import { useGetDashboardDataQuery } from "./dashboardApiSlice";
import { DashboardDto } from "./type";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
function AdminDashboard() {
  const { data, isLoading } = useGetDashboardDataQuery();
  const [dashboardData, setDashboardData] = useState<DashboardDto>();
  useEffect(() => {
    if (data) {
      setDashboardData(data);
      console.log("data", data);
      console.log("dashboardData", dashboardData);
    }
  }, [data]);
  if (isLoading) return <Loading />;

  return (
    <Box
      sx={{
        height: "100vh",
        p: 2,
      }}
    >
      <HeaderDataField name="Welcome Back Admin" value="Here's what's happening" />
      <Grid container spacing={1} sx={{ mx: "auto" }} columns={12}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value={dashboardData?.totalStudents || 0} title="Total Students" />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value={dashboardData?.totalProfessors || 0} title="Total Professors" />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value={dashboardData?.totalCourses || 0} title="Total Courses" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value={dashboardData?.totalLocations || 0} title="Total Locations" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value={dashboardData?.totalDepartments || 0} title="Total Departments" />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AdminCard value={dashboardData?.totalCourseClasses || 0} title="Total Course Class" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
