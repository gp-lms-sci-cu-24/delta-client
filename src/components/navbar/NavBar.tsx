import { useEffect, useState } from "react";

import {
  Box,
  IconButton,
  Menu,
  Stack,
  Toolbar,
  Tooltip,
  Avatar,
  useTheme,
  Typography,
  MenuItem,
  AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NAVBAR_SETTING from "@/constants/navbarSetting";
import { useDispatch } from "react-redux";
import { clearCredentials, selectCurrentUserPayload } from "@/features/auth/authSlice";
import { useLogoutMutation, useUserStateQuery } from "@/features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { Role } from "@/features/auth/types";
import { StudentDto } from "@features/admin/student/type";
import { Professor } from "@features/admin/professor/types";

export interface INavBarProps {
  open?: boolean;
  handleDrawerOpen?: () => void;
}

export default function NavBar({ open, handleDrawerOpen }: INavBarProps) {
  const theme = useTheme();
const dispatch = useDispatch();
const [ logout]=useLogoutMutation();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const { data } = useUserStateQuery();
  const currentUser = useSelector(selectCurrentUserPayload);

  useEffect(() => {
    if (currentUser?.roles.includes(Role.STUDENT)) {
      const student = data as StudentDto;
      if (data) {
        setUserName(student.username);
        setImage(student.profilePicture);
      }
    } else {
      const professor = data as Professor;
      if (data) {
        setImage(professor.profilePicture);
        setUserName(professor.username);
      }
    }
  }, [data]);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting: string) => {
    switch (setting) {
      case "Profile":
        // navigate("/app/profile");
        break;
      case "Dashboard":
        // navigate("/app/dashboard");
        break;
      case "Logout":
        // setLoading(true);
        // document.body.classList.add("no-scroll");
       dispatch(clearCredentials());
         logout();
        // setLoading(false);
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        borderBottom: theme.palette.mode === "light" ? 1 : 0,
        borderBottomColor: theme.palette.mode === "light" ? "#CECECE" : "",
        backgroundColor: theme.palette.mode === "light" ? "#F5F5F5" : "black",
        transition: theme.transitions.create(["width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: NAVBAR_SETTING.drawerWidth,
          width: `calc(100% - ${NAVBAR_SETTING.drawerWidth}px)`,
          transition: theme.transitions.create(["width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
          flexDirection: "row",
          minHeight: "48px !important",
        }}
      >
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon
            color="inherit"
            sx={{ color: theme.palette.mode === "light" ? "#666666" : "#fff" }}
          />
        </IconButton>

        {/* <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <SearchInput />
        </Box> */}
        <Box />

        <Stack direction={"row"} spacing={1}>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userName} src={image ?? ""} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {NAVBAR_SETTING.options.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleMenuItemClick(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Stack>
      </Toolbar>
      {/* Loading indicator */}

      {/* <Backdrop
        sx={{
          color: "#fff",
          zIndex: theme.zIndex.drawer + 100,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </AppBar>
  );
}
