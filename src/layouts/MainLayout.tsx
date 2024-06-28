import { SideMenuItem } from "@/components/sidebar/types";
import { AdminMenu, ProfessorsMenu, StudentMenu } from "@/constants/sideMenuList";
import { selectCurrentUserPayload } from "@/features/auth/authSlice";
import { Role } from "@/features/auth/types";
import NavBar from "@components/navbar";
import SideBar from "@components/sidebar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export interface IMainLayoutProps {}

export default function MainLayout() {
  const [open, setOpen] = useState<boolean>(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const currentUser = useSelector(selectCurrentUserPayload);

  let menuRoleBased: SideMenuItem[] = [];

  if (currentUser?.roles?.includes(Role.ADMIN)) {
    menuRoleBased = AdminMenu;
  } else if (currentUser?.roles?.includes(Role.STUDENT)) {
    menuRoleBased = StudentMenu;
  } else if (currentUser?.roles?.includes(Role.PROFESSOR)) {
    menuRoleBased = ProfessorsMenu;
  }

  return (
    <Box>
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} menu={menuRoleBased} />
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
