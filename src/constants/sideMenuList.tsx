import { PiUserCircleFill } from "react-icons/pi";
import TableViewIcon from "@mui/icons-material/TableView";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { PiStudentBold } from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { GiTeacher } from "react-icons/gi";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BookIcon from "@mui/icons-material/Book";
import ROUTES from "./routes";

export const StudentMenu = [
  {
    name: "Dashboard",
    path: "/app/student/dashboard",
    icon: <LuLayoutDashboard size={22} />,
  },
  {
    name: "Profile",
    path: "/app/student/profile",
    icon: <PiUserCircleFill size={28} />,
  },

  {
    name: "Schedule",
    path: "/app/student/viewschedule",
    icon: <CalendarTodayIcon />,
  },
  {
    name: "Courses",
    path: "/app/student/courses",
    icon: <BookIcon />,
  },
  {
    name: "Announcement",
    path: "/app/student/announcements",
    icon: <NotificationsIcon />,
  },
  {
    name: "Registration",
    path: "/app/student/course-registration",
    icon: <TableViewIcon />,
  },
  {
    name: "Results",
    path: "/app/student/results",
    icon: <AnalyticsIcon />,
  },
];

export const AcademicMenu = [
  {
    name: "Dashboard",
    path: "/app/dashboard",
    icon: <LuLayoutDashboard size={22} />,
  },
  {
    name: "Profile",
    path: "/app/profile",
    icon: <PiUserCircleFill size={22} />,
  },

  {
    name: "Schedule",
    path: "/app/viewschedule",
    icon: <TableViewIcon />,
  },
  {
    name: "Announcement",
    path: "/app/announcements",
    icon: <NotificationsIcon />,
  },
  {
    name: "Academic Advisor",
    path: "/app/academic-advisor",
    icon: <FaGraduationCap size={22} />,
  },

  {
    name: "Charts",
    path: "/app/charts",
    icon: <AnalyticsIcon />,
  },
];

export const ProfessorsMenu = [
  {
    name: "Dashboard",
    path: "/app/professor/dashboard",
    icon: <LuLayoutDashboard size={22} />,
  },
  {
    name: "Profile",
    path: "/app/professor/profile",
    icon: <PiUserCircleFill size={22} />,
  },
  {
    name: "Schedule",
    path: "/app/professor/viewschedule",
    icon: <TableViewIcon />,
  },
  {
    name: "Announcement",
    path: "/app/professor/announcements",
    icon: <NotificationsIcon />,
  },
  {
    name: "Courses",
    path: "/app/professor/courses",
    icon: <BookIcon />,
  },
];
export const AdminMenu = [
  {
    name: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: <LuLayoutDashboard size={22} />,
  },
  {
    name: "Locations",
    path: "/app/admin/locations",
    icon: <GrMapLocation size={22} />,
  },
  {
    name: "Announcement",
    path: "/app/admin/announcements",
    icon: <NotificationsIcon />,
  },

  {
    name: "Departments",
    path: "/app/admin/departments",
    icon: <BsBuildings size={22} />,
  },
  {
    name: "Students",
    path: "/app/admin/students",
    icon: <PiStudentBold size={22} />,
  },
  {
    name: "Courses",
    path: "/app/admin/courses",
    icon: <FaGraduationCap size={22} />,
  },

  {
    name: "Course class",
    path: "/app/admin/classes",
    icon: <AnalyticsIcon />,
  },
  {
    name: "Professor",
    path: "/app/admin/professors",
    icon: <GiTeacher size={22} />,
  },
];
