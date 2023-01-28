import React, { useState } from "react";
import { Button, Grid, TextField, Typography, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../redux/constants";
import { openError, closeModal } from "../../redux/nav";
import LoadingButton from "@mui/lab/LoadingButton";
import { getRole } from "../../redux/role";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const { modalProps } = useSelector((state) => state.nav);
  const { token } = useSelector((state) => state.auth);

  const [courseId, setCourseId] = useState("");
  const [name, setName] = useState("");
  const [credits, setCredits] = useState(1);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleCreateClick = () => {
    setLoading(true);
    let dept_id = modalProps.data.dept_id;
    axios
      .post(
        `${BACKEND_ENDPOINT}${modalProps.url}/`,
        { course_id: courseId, name: name, credits: credits, dept_id: dept_id },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        setLoading(false);
        dispatch(closeModal());
        history("/department");
      })
      .catch((err) => {
        if (err.response) {
          dispatch(
            openError({
              type: "error",
              header: "Something Went Wrong",
              desc: err.response.data[0],
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

        console.log({
          err: err,
          "err data": err.data,
          "err req": err.request,
        });
        setLoading(false);
      });
  };

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
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Course Code"
          value={courseId}
          onChange={(event) => setCourseId(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Credits"
          type="number"
          value={credits}
          onChange={(event) => setCredits(parseInt(event.target.value))}
        />
      </Grid>
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

export default CreateCourse;
