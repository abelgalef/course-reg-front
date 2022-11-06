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
  ListItemText
} from "@mui/material";
import DECLogo from "../../components/logo";
import { Info, Menu, Feedback, Group, School, MenuBook, Home, AssignmentLate, Person } from "@mui/icons-material";

const drawerWidth = "22rem";

function Admin() {
  const [drawerOpen, setDrawer] = React.useState(true);
  const [route, setRoute] = React.useState("dash")
  
  const renderComp = () => {
    if (route === "dash") {
      return <h1>Dashboard</h1>;
    } else if (route === "role") {
      return <h1>Role</h1>;
    } else if (route === "role") {
      return <h1>Role</h1>;
    } else if (route === "dept") {
      return <h1>Department</h1>;
    } else if (route === "course") {
      return <h1>Course</h1>;
    } else if (route === "const") {
      return <h1>Constraints</h1>;
    } else {
      return <h1>Something went wrong! Please refresh the page.</h1>
    }
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth})` },
          ml: { sm: `${drawerWidth}` },
        }}
        elevation={false}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => {
              setDrawer(!drawerOpen);
            }}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <h4>Admin</h4>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => {
            setDrawer(!drawerOpen);
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          open
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer(setRoute)}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth})` },
          float: "right",
        }}
      >
        <Toolbar />
        {renderComp()}
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </>
  );
}

const drawer = (setRoute) => (
  <div>
    <Toolbar />
    <Divider />
    <List>
      <ListItem onClick={() => setRoute("dash")} button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary={"Dashboard"} />
      </ListItem>
      <ListItem onClick={() => setRoute("role")} button>
        <ListItemIcon>
          <Group />
        </ListItemIcon>
        <ListItemText primary={"Roles"} />
      </ListItem>
      <ListItem onClick={() => setRoute("dept")} button>
        <ListItemIcon>
          <School />
        </ListItemIcon>
        <ListItemText primary={"Departments"} />
      </ListItem>
      <ListItem onClick={() => setRoute("course")} button>
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

export default Admin;
