import { AppBar } from "@mui/material";
import React from "react";
import DECLogo from "../logo";
import { useSelector } from "react-redux";
import LoggedInAppBar from "./loggedAppBar"

function _AppBar() {
  const auth = useSelector((state) => state.auth.authenticated);

  if (auth) {
    return <LoggedInAppBar />;
  } else {
    return (
      <AppBar style={{ backgroundColor: "white" }} position="static">
        <DECLogo />
      </AppBar>
    );
  }
}

export default _AppBar;
