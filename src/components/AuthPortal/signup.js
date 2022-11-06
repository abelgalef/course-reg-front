import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearError } from "../../redux/auth";
import {useEffect} from "react"

function Signup() {
  const [first_name, setFirst] = React.useState("");
  const [last_name, setLast] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [department, setDept] = React.useState(0);
  const [password, setPass1] = React.useState("");
  const [confPass, setPass2] = React.useState("");
  const [confError, setConfError] = React.useState(false);

  const { signupError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError())
  },[])

  const handelSubmit = (e) => {
    e.preventDefault();
    if (password !== confPass) {
      setConfError(true);
      return;
    }
    dispatch(signup({ first_name, last_name, email, department, password }));
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
            helperText={signupError.FirstName ? signupError.FirstName : ""}
            error={signupError.FirstName ? true : false}
            variant="outlined"
            value={first_name}
            onChange={(e) => {
              setFirst(e.target.value);
              if (signupError.FirsName) {
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
            helperText={signupError.LastName ? signupError.LastName : ""}
            error={signupError.LastName ? true : false}
            value={last_name}
            onChange={(e) => {
              setLast(e.target.value);
              if (signupError.LastName) {
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
            helperText={signupError.Email ? signupError.Email : ""}
            error={signupError.Email ? true : false}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (signupError.Email) {
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
            helperText={
              signupError.Password ? signupError.Password : "Minimum 6 letters"
            }
            error={signupError.Password ? true : false}
            required
            fullWidth
            value={password}
            onChange={(e) => {
              setPass1(e.target.value);
              if (signupError.Password) {
                dispatch(clearError());
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Confirm Password"
            type="password"
            error={confError}
            variant="outlined"
            helperText={
              confError
                ? "Passwords don't match"
                : "Make sure your passwords match"
            }
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
