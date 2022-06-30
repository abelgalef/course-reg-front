import {
  Tabs,
  Tab,
  Paper,
  Box,
  Divider,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React from "react";
import Login from "./login";
import Signup from "./signup";

import {useSelector} from "react-redux"

function AuthPortal() {
  const [value, setValue] = React.useState(0);
  
  const { loading, loginError } = useSelector((state) => state.auth);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        minHeight: "100vh",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        lx={{ padding: "1rem", width: "80%" }}
        md={{ padding: "1rem", width: "60%" }}
        sx={{ padding: "1rem", width: "90%", transition: "all 5s ease-in-out" }}
        variant="outlined"
      >
        <Backdrop sx={{ color: "#fff00", zIndex: 99999999999 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Tabs
          value={value}
          onChange={(e, v) => {
            setValue(v);
          }}
          variant="fullWidth"
        >
          <Tab label="Teacher Login" />
          <Tab label="Teacher SignUp" />
          <Tab label="Student Portal" />
        </Tabs>
        <Divider />
        <br />
        <Box style={{ transition: "all 5s ease-in-out" }}>
          <TabPanel index={0} value={value}>
            <Login />
          </TabPanel>
          <TabPanel index={1} value={value}>
            <Signup />
          </TabPanel>
          <TabPanel index={2} value={value}>
            <h1>Student</h1>
          </TabPanel>
        </Box>
      </Paper>
    </div>
  );
}

function TabPanel({children, value, index}) {
  return (
    <div hidden={value !== index}>
      {value === index && children}
    </div>
  )
}

export default AuthPortal;
