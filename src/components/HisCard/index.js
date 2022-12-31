import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import moment from "moment"

const hoverStyle = {
  borderColor: blue[900],
  bgcolor: blue[100],
  boxShadow: "0 10px 40px rgb(0 0 0 / 0.2)",
};

function HisCard({date, header, detail, rep}) {
  const [onHover, setHover] = useState({});

  return (
    <Card
      variant="outlined"
      className="My-Card"
      sx={{
        width: 350,
        height: 150,
        display: "inline-block",
        mr: 1,
        ml: 1,
          cursor: "pointer",
          ...onHover,
        transitionDuration: ".5s",
        textAlign: "left"
      }}
      onMouseEnter={() => setHover(hoverStyle)}
      onMouseLeave={() => setHover({})}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {`${moment(date).format("ll")} (${moment(date).fromNow()})`}
        </Typography>
        <Typography variant="h5" component="div">
          {header}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{detail}</Typography>
        <Typography variant="body2">{rep? "Click here to perform action again": "You can not perform this action again"}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default HisCard;
