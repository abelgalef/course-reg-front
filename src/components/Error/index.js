import React from "react";
import { Button, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { ErrorOutline, InfoOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { closeError } from "../../redux/nav";

function ErrorModal() {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const dispatch = useDispatch();
  const { errorOpen, errorProps } = useSelector((state) => state.nav);
  
  if (!errorOpen) {
    return null
  }
  return (
    <Dialog
      style={{zIndex: "999999999999999999999999"}}
      open={errorOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => dispatch(closeError())}
      aria-describedby="alert-dialog-slide-description"
      sx={!errorOpen && {display: "none"}}
    >
      <DialogTitle>
        <b>{errorProps.desc.overview || errorProps.header}</b>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {"type" in errorProps && (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
              item
              xs={2}
            >
              {errorProps.type === "error" ? (
                <ErrorOutline sx={{ color: "red", fontSize: 60 }} />
              ) : (
                <InfoOutlined sx={{ color: "red", fontSize: 60 }} />
              )}
            </Grid>
          )}
          <Grid item xs={10}>
            <DialogContentText id="alert-dialog-slide-description">
              {errorProps.desc.e || errorProps.desc}
            </DialogContentText>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeError())}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorModal;
