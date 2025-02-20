import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Menu,
  MenuItem,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import OverviewIcon from "@mui/icons-material/Assessment"; // Import the icon for Overview
import ProjectsIcon from "@mui/icons-material/Work"; // Import the icon for Projects
import ChatIcon from "@mui/icons-material/Chat"; // Import the icon for Chat
import PaymentIcon from "@mui/icons-material/Payment"; // Import the icon for Payment
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the new icon for Profile
import LogoutIcon from "@mui/icons-material/Logout"; // Import the icon for Logout
import Overview from "./Menus/Overview";
import Projects from "./Menus/Projects";
import Profile from "./Menus/Profile";
import Chat from "./Menus/Chat";
import Payment from "./Menus/Payment";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState("Overview");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (text) => {
    setSelectedItem(text);
  };

  // Function to render icon based on menu item
  const renderIcon = (text) => {
    switch (text) {
      case "Overview":
        return <OverviewIcon />;
      case "Projects":
        return <ProjectsIcon />;
      case "Chat":
        return <ChatIcon />;
      case "Payment":
        return <PaymentIcon />;
      case "Profile":
        return <AccountCircleIcon />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Earth Restoration Investor Platform | Environment Activist Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" aria-label="logout">
            <LogoutIcon /> {/* Assuming LogoutIcon is your icon for logout */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Overview", "Projects", "Chat", "Payment", "Profile"].map((text) => (
            <ListItem
              key={text}
              button
              onClick={() => handleMenuItemClick(text)} // Pass the handleMenuItemClick function
              sx={{ display: "block" }}
              selected={selectedItem === text}
            >
              <ListItemIcon>
                {renderIcon(text)} {/* Render the appropriate icon */}
              </ListItemIcon>
              {open && <ListItemText primary={text} />}{" "}
              {/* Conditionally render the text based on open state */}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Render corresponding component based on selected item */}
        {selectedItem === "Overview" && <Overview />}
        {selectedItem === "Projects" && <Projects />}
        {selectedItem === "Profile" && <Profile />}
        {selectedItem === "Chat" && <Chat />}
        {selectedItem === "Payment" && <Payment />}
        {/* Add more conditions for other menu items */}
      </Box>
    </Box>
  );
}
