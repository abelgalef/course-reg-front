import React from "react";
import { Button, Grid, TextField, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import giveMakeOver from "./local_utils";
function GenericUpdate() {
  const { modalProps } = useSelector((state) => state.nav);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {modalProps.header}
          <Typography variant="body2">{modalProps.caption}</Typography>
        </Typography>
        <Divider style={{ marginTop: "1rem" }} />
        <br />
      </Grid>
      {Object.entries(modalProps.data).map(([key, value]) => {
        let { shouldSkip, useBigTextField, label } = giveMakeOver(key);
        if (shouldSkip) return null;

        return (
          <Grid item lg={4} md={6} xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              value={value}
              label={label}
              multiline={useBigTextField || false}
              maxRows={4}
            />
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <div style={{ float: "right" }}>
          <Button variant="contained" disableElevation>
            Update
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default GenericUpdate;
