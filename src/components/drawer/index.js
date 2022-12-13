import React from "react";
import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Info,
  Menu,
  Feedback,
  Group,
  School,
  MenuBook,
  Home,
  AssignmentLate,
  Person,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../../redux/nav";
import { useNavigate } from "react-router-dom";
import DECLogo from "../logo";

const drawerWidth = "22rem";

function LeftDrawer() {
  const { drawerOpen } = useSelector((state) => state.nav);
  const dispatch = useDispatch();
  const history = useNavigate();

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => dispatch(toggleDrawer())}
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer(history)}
      </Drawer>
      <Drawer
        open
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer(history)}
      </Drawer>
    </Box>
  );
}

const drawer = (setRoute) => (
  <div>
    <Toolbar style={{ padding: ".5rem" }}>
      <DECLogo />
    </Toolbar>
    <Divider />
    <List>
      <ListItem onClick={() => setRoute("/")} button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary={"Dashboard"} />
      </ListItem>
      <ListItem onClick={() => setRoute("/role")} button>
        <ListItemIcon>
          <Group />
        </ListItemIcon>
        <ListItemText primary={"Roles"} />
      </ListItem>
      <ListItem onClick={() => setRoute("/department")} button>
        <ListItemIcon>
          <School />
        </ListItemIcon>
        <ListItemText primary={"Departments"} />
      </ListItem>
      <ListItem onClick={() => setRoute("/courses")} button>
        <ListItemIcon>
          <MenuBook />
        </ListItemIcon>
        <ListItemText primary={"Courses"} />
      </ListItem>
      <ListItem onClick={() => setRoute("const")} button>
        <ListItemIcon>
          <AssignmentLate />
        </ListItemIcon>
        <ListItemText primary={"Constraints"} />
      </ListItem>
    </List>
    <Divider />
    <List style={{ position: "absolute", bottom: "0", width: "100%" }}>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={"Account"} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Feedback />
        </ListItemIcon>
        <ListItemText primary={"Contact"} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <ListItemText primary={"About"} />
      </ListItem>
    </List>
  </div>
);

export default LeftDrawer;
