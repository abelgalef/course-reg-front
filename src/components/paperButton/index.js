import React from "react";
import { Paper } from "@mui/material";

function PaperButton({ children, hoverStart, hoverEnd }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Paper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() =>  setHover(false)}
      variant="outlined"
      sx={hover && { "box-shadow": "0 3px 10px rgb(0 0 0 / 0.2)", cursor: "pointer" }}
      style={{width: "100%"}}
    >
      {children}
    </Paper>
  );
}

export default PaperButton;
