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
import { motion } from "framer-motion";
import AdminCard from "./components/AdminComponents/AdminCard";

function AdminDashboard() {
  const { data, isLoading } = useGetDashboardDataQuery();
  const [dashboardData, setDashboardData] = useState<DashboardDto>();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
const text = "Welcome Back Admin".split(" ");
  useEffect(() => {
    if (data) {
      setDashboardData(data);
      console.log("data", data);
      console.log("dashboardData", dashboardData);
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
  return (
    <Box
      sx={{
        height: "100vh",
        p: 2,
      }}
    >
   <HeaderDataField name="Welcome Back Admin" value="Here's what's happening" />
     
      {/* <motion.text > 
        Welcome Back, Admin 
      </motion.text> */}
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
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
