import React, { useState } from "react";
import { Button, Grid, TextField, Typography, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import giveMakeOver from "./local_utils";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment"
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../redux/constants";
import { openError, closeModal } from "../../redux/nav";
import LoadingButton from "@mui/lab/LoadingButton";
import { getRole } from "../../redux/role"
import {useNavigate} from "react-router-dom"

function GenericCreate() {
  const { modalProps } = useSelector((state) => state.nav);
  const { token } = useSelector((state) => state.auth);

  const [data, setData] = useState(modalProps.data)
  const [loading, setLoading] = React.useState(false);
  
  const dispatch = useDispatch();
  const history = useNavigate()
  
  const handleChange = (event) => {
    let d = Object.assign({}, data)
    d[event.target.id] = event.target.value
    setData(d)
  };

  const handleCreateClick = () => {
    setLoading(true);

    axios
      .post(`${BACKEND_ENDPOINT}${modalProps.url}/`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setLoading(false);
        dispatch(getRole())
        dispatch(closeModal())
        history("/department")
      })
      .catch((err) => {
        if (err.response) {
          dispatch(
            openError({
              type: "error",
              header: "Something Went Wrong",
              desc: err.data,
            })
          );
        } else if (err.request) {
          dispatch(
            openError({
              type: "error",
              header: "Something Went Wrong",
              desc: "The request was made but no response was received. Make sure the back-end is reachable.",
            })
          );
        } else {
          dispatch(
            openError({
              type: "error",
              header: "Something Went Wrong",
              desc: err.message,
            })
          );
        }

        console.log({ err: err, "err data": err.data, "err req": err.request });
        setLoading(false);
      });
  }

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
        let { shouldSkip, useBigTextField, label, type } = giveMakeOver(key);
        if (shouldSkip) return null;

        if (type === "date") {
          return (
            <Grid item md={6} xs={12}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={label}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          );
        }
        return (
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              id={key}
              label={label}
              value={data[key]}
              onChange={handleChange}
              multiline={useBigTextField}
              rows={useBigTextField ? 4 : undefined}
            />
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <div style={{ float: "right" }}>
          <LoadingButton
            variant="contained"
            disableElevation
            onClick={handleCreateClick}
            loading={loading}
          >
            Create
          </LoadingButton>
        </div>
      </Grid>
    </Grid>
  );
}

export default GenericCreate;
