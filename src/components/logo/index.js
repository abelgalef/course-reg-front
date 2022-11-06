import React from 'react'
import DecLogo from "./logo.png"
import { Box, Grid, Avatar, Typography } from "@mui/material"

function DECLogo({s}) {
  return (
    <Grid container columns={21}>
      <Grid item xs={2}>
        <Avatar sx={{ width: 56, height: 56, m: "auto" }} src={DecLogo} />
      </Grid>
      <Grid item xs={19} sx={{ display: { xs: "none", md: "block" } }}>
        <Typography
          variant="h6"
          sx={s}
          style={{float:"right"}}
        >
          <b>Defense Engineering College</b>
          <Typography variant="subtitle2">A Center of exellence</Typography>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default DECLogo