import NAVBAR_SETTING from "@/constants/navbarSetting";
import {
  Box,
  CSSObject,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { blue } from "@mui/material/colors";
import { SideMenuItem } from "./types";

export interface ISideBarProps {
  open?: boolean;
  handleDrawerClose?: () => void;
  menu?: SideMenuItem[];
}

export default function SideBar({
  open,
  handleDrawerClose,
  menu,
}: ISideBarProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const openedMixin = (theme: Theme): CSSObject => ({
    width: NAVBAR_SETTING.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <Drawer
      sx={{
        width: NAVBAR_SETTING.drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        backgroundColor: theme.palette.mode === "light" ? "#EAEEF4" : "#000", // Set the background color here
        ...(open && {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": {
            ...openedMixin(theme),
            backgroundColor:
              theme.palette.mode === "light" ? "#EAEEF4" : "#000",
          }, // Also set it for the paper variant when open
        }),
        ...(!open && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": {
            ...closedMixin(theme),
            backgroundColor:
              theme.palette.mode === "light" ? "#EAEEF4" : "#000",
          }, // And when it's not open
        }),
      }}
      variant="permanent"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        DELTA
        {/* <img src={Logo} height={open ? 160 : 60} width={open ? 160 : 60} /> */}
      </Box>
      <List>
        {menu &&
          menu.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
              <Tooltip placement="right" title={open ? "" : item.name}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor:
                      location.pathname === item.path ||
                      location.pathname.includes(item.path)
                        ? theme.palette.mode === "light"
                          ? "#A6C8FF"
                          : blue[400]
                        : "",
                    borderRadius: "16px",
                    width: "95%",
                    marginX: "auto",
                  }}
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: theme.palette.mode === "light" ? "black" : "white",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: theme.palette.mode === "light" ? "black" : "white",
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
}
