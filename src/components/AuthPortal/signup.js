import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearError } from "../../redux/auth";

function Signup() {
  const [firstname, setFirst] = React.useState("");
  const [lastname, setLast] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [department, setDept] = React.useState(0);
  const [password, setPass1] = React.useState("");
  const [confPass, setPass2] = React.useState("");
  const [confError, setConfError] = React.useState(false);

  const { signupError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handelSubmit = (e) => {
    e.preventDefault();

    if (password !== confError) {
      setConfError(true);
      return;
    }

    dispatch(signup({ firstname, lastname, email, department, password }));
  };

  return (
    <form onSubmit={handelSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography variant="h6">Create an account to get started</Typography>
          <Typography variant="subtitle2">
            Fill in all the required information
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            label="First Name"
            required
            fullWidth
            variant="outlined"
            value={firstname}
            onChange={(e) => {
              setFirst(e.target.value);
              if (signupError !== {}) {
                dispatch(clearError());
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            label="Last Name"
            variant="outlined"
            required
            fullWidth
            value={lastname}
            onChange={(e) => {
              setLast(e.target.value);
              if (signupError !== {}) {
                dispatch(clearError());
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            required
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (signupError !== {}) {
                dispatch(clearError());
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Department"
            variant="outlined"
            required
            fullWidth
            value={department}
            onChange={(e) => {
              setDept(e.target.value);
              if (signupError !== {}) {
                dispatch(clearError());
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            helperText="Minimum 6 letters"
            required
            fullWidth
            value={password}
            onChange={(e) => {
              setPass1(e.target.value);
              if (signupError !== {}) {
                dispatch(clearError());
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            helperText="Make sure your passwords match"
            required
            fullWidth
            value={confPass}
            onChange={(e) => {
              setPass2(e.target.value);
              if (confError) {
                setConfError(false);
              }
            }}
          />
        </Grid>
        <Grid style={{ marginTop: "1rem" }} item xs={12}>
          <Button type="submit" variant="contained" disableElevation fullWidth>
            Create Account
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Signup;
