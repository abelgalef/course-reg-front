import {
  Grid,
  Alert,
  TextField,
  Button,
  Typography,
  Link as L,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/auth";

function Login() {
  const dispatch = useDispatch();

  const { loginError } = useSelector((state) => state.auth);

  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, pass }));
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container spacing={2}>
        <Grid style={{ textAlign: "center" }} item xs={12}>
          <Typography variant="h6">
            Enter your credentials to gain access
          </Typography>
          <Typography variant="subtitle2">
            Provide your email and password bellow
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="filled-basic"
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="filled-basic"
            type="password"
            label="Password"
            variant="outlined"
            value={pass}
            required
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </Grid>
        {loginError ? (
          <Grid item xs={12}>
            <Alert severity="error">Invalid Credentials</Alert>
          </Grid>
        ) : null}
        <Grid item xs={12} mt={2}>
          <Button
            disableElevation
            size="large"
            type="submit"
            variant="contained"
            fullWidth
          >
            Login
          </Button>
        </Grid>
        <Grid mt={1} item xs={12}>
          <Link style={{ float: "right" }} to="/forgot-password">
            <L>Did you forget your password?</L>
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default Login;
