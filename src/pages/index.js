import React from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AppBar from "../components/appBar";
import LeftDrawer from "../components/drawer";
import Role from "./role";
import CustomModal from "../components/customModal";
import ErrorDialog from "../components/Error"

const drawerWidth = "22rem";

function Pages() {
  return (
    <>
      <AppBar />
      <CustomModal/>
      <LeftDrawer />
      <ErrorDialog />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth})` },
          float: "right",
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/department" element={<h1>Department</h1>} />
          <Route path="/courses" element={<h1>Courses</h1>} />
          <Route path="/role" element={<Role/>} />
        </Routes>
      </Box>
    </>
  );
}

export default Pages;
