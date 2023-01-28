import React from "react";
import { Typography } from "@mui/material";

function Empty({ caption }) {
  return (
    <div style={{ textAlign: "center", transform: "translateY(8rem)" }}>
      <Typography variant="h5" component="div">
        There is nothing to display
        <Typography variant="body2" component="div">
          {caption}
        </Typography>
      </Typography>
    </div>
  );
}

export default Empty;
