import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import NAVBAR_SETTING from "@/constants/navbarSetting";
import React from "react";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const CustomizedAppBar: React.FC<AppBarProps> = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  borderBottom: theme.palette.mode === "light" ? 1 : 0,
  borderBottomColor: theme.palette.mode === "light" ? "#CECECE" : "",
  backgroundColor: theme.palette.mode === "light" ? "#F5F5F5" : "black",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: NAVBAR_SETTING.drawerWidth,
    width: `calc(100% - ${NAVBAR_SETTING.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default CustomizedAppBar;
