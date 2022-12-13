import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../redux/nav"
import {Menu} from "@mui/icons-material"
const drawerWidth = "22rem";

function LoggedInAppBar() {
  const dispatch = useDispatch()
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth})` },
        ml: { md: `${drawerWidth}` },
      }}
      elevation={false}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleDrawer())}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <Menu />
        </IconButton>
        <h4>Admin</h4>
      </Toolbar>
    </AppBar>
  );
}

export default LoggedInAppBar;
