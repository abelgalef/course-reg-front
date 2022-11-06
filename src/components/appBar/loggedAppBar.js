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
          onClick={() => dispatch(toggleDrawer())}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <Menu />
        </IconButton>
        <h4>Admin</h4>
      </Toolbar>
    </AppBar>
  );
}

export default LoggedInAppBar;
