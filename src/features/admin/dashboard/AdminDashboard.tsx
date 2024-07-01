import { Box, Grid } from "@mui/material";
import HeaderDataField from "@/components/HeaderDataField";
import { useGetDashboardDataQuery } from "./dashboardApiSlice";
import { DashboardDto } from "./type";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
import PersonIcon from "@mui/icons-material/Person";
import { RiBookFill } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";
import { BsBuildings } from "react-icons/bs";
import AdminCard from "./components/AdminComponents/AdminCard";
import { Chart } from "react-google-charts";
import { PieChart } from "@mui/x-charts";
import CustomCard from "./components/AdminComponents/CustomCard";

function AdminDashboard() {
  const { data, isLoading } = useGetDashboardDataQuery();
  const [dashboardData, setDashboardData] = useState<DashboardDto>();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setDashboardData(data);
      console.log("data", data);
    }
  }, [data]);
  if (isLoading) return <Loading />;
  const cards = [
    {
      title: "Total Courses",
      value: dashboardData?.totalCourses || 0,
      Icon: <RiBookFill size={20} color="white" />,
    },
    {
      title: "Total Locations",
      value: dashboardData?.totalLocations || 0,
      Icon: <FaMapLocationDot size={20} color="white" />,
    },
    {
      title: "Total Departments",
      value: dashboardData?.totalDepartments || 0,
      Icon: <BsBuildings size={20} color="white" />,
    },
    {
      title: "Total Professors",
      value: dashboardData?.totalProfessors || 0,
      Icon: <PersonIcon fontSize="large" sx={{ color: "white" }} />,
    },
    {
      title: "Total Students",
      value: dashboardData?.totalStudents || 0,
      Icon: <PersonIcon fontSize="large" sx={{ color: "white" }} />,
    },
    {
      title: "Total Classes",
      value: dashboardData?.totalCourseClasses || 0,
      Icon: <PersonIcon fontSize="large" sx={{ color: "white" }} />,
    },
  ];
  const yearsData = [
    ["Year", "Student"],
    ["2019", 3200],
    ["2020", 4000],
    ["2021", 3500],
    ["2022", 3800],
    ["2023", 4800],
    ["2024", 5600],
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        p: 2,
      }}
    >
      <HeaderDataField name="Welcome Back Admin" value="Here's what's happening" />
      <Grid container spacing={1} sx={{ mx: "auto" }} columns={12}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <AdminCard
              key={index}
              title={card.title}
              value={card.value}
              Icon={card.Icon}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              blur={hoveredCard !== null && hoveredCard !== index}
            />
          </Grid>
        ))}
        <Grid item xs={12} md={6} lg={6}>
          <CustomCard
            header="Total Students per year"
            children={<Chart chartType="Bar" height="300px" width={"100%"} data={yearsData} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CustomCard
            header="Total Students per level"
            children={
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 900, label: "Level one" },
                      { id: 1, value: 1500, label: "Level two" },
                      { id: 2, value: 1600, label: "Level three" },
                      { id: 3, value: 1700, label: "Level four" },
                    ],
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                  },
                ]}
                height={200}
              />
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
