import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_ENDPOINT } from "../../redux/constants";
import Placeholder from "../modalPlaceholder/roleModalPlaceholder";
import {
  Grid,
  Box,
  Typography,
  Divider,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  List,
  Collapse,
  CircularProgress,
} from "@mui/material";
import moment from "moment";
import Empty from "../empty";
import PaperButton from "../paperButton";
import { orange, red, green, blue } from "@mui/material/colors";
import { East, Rule, CloudUpload } from "@mui/icons-material";
import { openModal } from "../../redux/nav";
import handelError from "../../utils/handelErr";

function CourseDetail() {
  const dispatch = useDispatch();
  const { modalProps } = useSelector((state) => state.nav);
  const { token } = useSelector((state) => state.auth);

  console.log(modalProps, modalProps.data);

  const [isLoading, setIsLoading] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [isTakeLoading, setIsTakeLoading] = useState(false);

  const [course, setCourse] = useState();

  // useEffect(() => {
  //   setIsLoading(true);

  // axios
  //   .get(`${BACKEND_ENDPOINT}/course/${modalProps.data.id}`, {
  //     headers: { Authorization: "Token " + token },
  //   })
  //   .then((res) => {
  //     setCourse(res.data);
  //     setIsLoading(false);
  //     console.log(res);
  //   })
  //   .catch((err) => setIsLoading(false));
  // }, [modalProps, token]);

  const handleTakeCourse = () => {
    setIsTakeLoading(true);

    axios
      .post(`${BACKEND_ENDPOINT}/course/take-course/${modalProps.data.id}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => {
        setIsTakeLoading(false);
      })
      .catch((err) => {
        handelError(err);
        setIsTakeLoading(false);
      });
  };

  if (isLoading) return <Placeholder />;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={12} lg={8}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {`${modalProps.header} "${modalProps.data.name}"`}
              <Typography variant="body2">
                {`These are the properties of the ${modalProps.data.name} course`}
              </Typography>
            </Typography>
            <Divider style={{ marginTop: "1rem" }} />
            <br />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container rowSpacing={4} columnSpacing={4}>
              <Grid item xs={6}>
                <Typography variant="h6">
                  <Typography variant="subtitle1">ID</Typography>
                  {modalProps.data.id}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  <Typography variant="subtitle1">Course Name</Typography>
                  {modalProps.data.name.charAt(0).toUpperCase() +
                    modalProps.data.name.slice(1)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  <Typography variant="subtitle1">
                    Resources Available
                  </Typography>
                  {/* {modalProps.data.resources.length + " Courses Available"} */}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  <Typography variant="subtitle1">Created At</Typography>
                  {moment(modalProps.data.created_at).fromNow()}
                </Typography>
              </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <br />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <PaperButton>
                <ListItem
                  alignItems="flex-start"
                  onClick={handleTakeCourse}
                  disabled={isTakeLoading || processed}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[500] }}>
                      <Rule />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Take this course Teaching"
                    secondary="Click here to teach this course"
                  />
                  {isTakeLoading && <CircularProgress sx={{ m: "auto" }} />}
                </ListItem>
              </PaperButton>
            </Grid>
            <Grid item xs={6}>
              <PaperButton>
                <ListItem
                  onClick={() =>
                    dispatch(
                      openModal({
                        ID: "GENERIC_UPDATE",
                        props: {
                          data: modalProps.data,
                          header: "Update this department",
                          caption: "Update the details of the department",
                          url: "/course",
                          ID: modalProps.data.id,
                        },
                        conStyle: { width: "30vw" },
                      })
                    )
                  }
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                      <CloudUpload />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Atach files to this course"
                    secondary="Click here to add flies for this course"
                  />
                  <East sx={{ m: "auto" }} />
                </ListItem>
              </PaperButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} lg={4}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {`Resources for this course`}
              <Typography variant="body2">
                {`These are all the resources available for the ${modalProps.data.name} course`}
              </Typography>
            </Typography>
            <Divider style={{ marginTop: "1rem" }} />
            <br />
          </Grid>

          <Grid item sx={12}>
            <Paper variant="outlined" style={{ height: "20rem" }}>
              <Empty caption="Add more resources to see them here" />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CourseDetail;
