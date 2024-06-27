import { AdminMenu } from "@/constants/sideMenuList";
import NavBar from "@components/navbar";
import SideBar from "@components/sidebar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { Outlet } from "react-router-dom";

export interface IMainLayoutProps {}

export default function MainLayout() {
  const [open, setOpen] = useState<boolean>(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const menu = [
    {
      name: "Dashboard",
      path: "/app/dashboard",
      icon: <LuLayoutDashboard size={22} />,
    },
  ];

  return (
    <Box>
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} menu={AdminMenu} />
      <Main open={open} sx={{ ml: "50px", height: "100vh" }}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  paddingLeft: theme.spacing(2),

  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-240px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
