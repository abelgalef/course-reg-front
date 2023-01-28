import React, { Children } from "react";
import { Grid } from "@mui/material";
import "./hori.css";

function EmptyHis() {
  return (
    <>
      <h5 style={{width: "100%"}}>Empty</h5>
      <p>This is empty</p>
    </>
  );
}

function HorizontalGrid({ children }) {
  return (
    <Grid
      item
      className="Hover-Container"
      style={{
        display: "inline-block",
        whiteSpace: "nowrap",
        overflowX: "scroll",
        textAlign: "center"
      }}
      xs={12}
    >
      {Children.count(children) > 0 ? children : <EmptyHis />}
    </Grid>
  );
}

export default HorizontalGrid;
