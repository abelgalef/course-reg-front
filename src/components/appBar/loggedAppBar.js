import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../redux/nav"
import {Menu} from "@mui/icons-material"
import { useLocation } from "react-router-dom";

const drawerWidth = "22rem";

function LoggedInAppBar() {
  const dispatch = useDispatch()
  const location = useLocation()
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
        <h3>{ location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2) }</h3>
      </Toolbar>
    </AppBar>
  );
}

export default LoggedInAppBar;
