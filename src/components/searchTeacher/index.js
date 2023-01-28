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
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Collapse,
  Paper,
  Backdrop,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import moment from "moment";
import Empty from "../empty";
import PaperButton from "../paperButton";
import { orange, red, green, blue } from "@mui/material/colors";
import {
  East,
  AutoStories,
  Close,
  Person,
  ArrowForward,
} from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";
import RoleItem from "./roleItem";
import { openModal } from "../../redux/nav";

function SearchForTeachers() {
  const { modalProps } = useSelector((state) => state.nav);
  const [searchBox, setSearchBox] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setloadingUsers] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);

  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get(`${BACKEND_ENDPOINT}/role/neg-users/999999999999999`)
      .then((res) => {
        setUsers(res.data);
        setloadingUsers(false);
      })
      .catch((err) => {
        console.log(err, err.data, err.response);
        setloadingUsers(false);
      });
  }, []);

  React.useEffect(() => {
    setLoadingCourses(true);
    axios
      .get(`${BACKEND_ENDPOINT}/course/current-user-history/${selectedUser}`)
      .then((res) => {
        if (res.data != null) {
          setCourses(res.data);
        } else {
          setCourses([]);
        }
        setLoadingCourses(false);
      })
      .catch((err) => {
        console.log(err, err.data, err.response);
        setLoadingCourses(false);
      });
  }, [selectedUser]);

  return (
    <Box>
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
            id="perm-search"
            label="Enter a Keyword"
            variant="outlined"
            value={searchBox}
            onChange={(e) => setSearchBox(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <Close />
                </IconButton>
              </InputAdornment>
            }
            style={{ marginBottom: "1rem" }}
          />
        </Grid>
        <Grid item md={6} sx={12}>
          <Typography variant="h6">
            Select a user
            <Typography variant="body2">
              All users containg the keyword from the search box
            </Typography>
          </Typography>
          <Divider style={{ marginTop: "1rem" }} />
          <br />
          <Paper variant="outlined" style={{ height: "20rem" }}>
            {loadingUsers ? (
              <Backdrop style={{ position: "absolute" }} open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : users.length === 0 ? (
              <Empty caption="There are no users to display here" />
            ) : (
              <List sx={{ width: "100%", height: "20rem", overflow: "auto" }}>
                <TransitionGroup>
                  {users
                    .filter(
                      (item) =>
                        item.first_name.includes(searchBox) ||
                        item.last_name.includes(searchBox)
                    )
                    .map(({ id, first_name, last_name, email }, i) => (
                      <Collapse key={i}>
                        <ListItemButton
                          onClick={() => setSelectedUser(id)}
                          secondaryAction={
                            <InputAdornment position="end">
                              <ArrowForward />
                            </InputAdornment>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <Person />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={first_name + " " + last_name}
                            secondary={email}
                          />
                        </ListItemButton>
                      </Collapse>
                    ))}
                </TransitionGroup>
              </List>
            )}
          </Paper>
        </Grid>
        <Grid item md={6} sx={12}>
          <Typography variant="h6">
            Courses taken by the user
            <Typography variant="body2">
              All the courses taken by the selected user for teaching
            </Typography>
          </Typography>
          <Divider style={{ marginTop: "1rem" }} />
          <br />
          <Paper variant="outlined" style={{ height: "20rem" }}>
            {loadingCourses ? (
              <Backdrop style={{ position: "absolute" }} open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : selectedUser === 0 ? (
              <Empty caption="Select a user to view the courses they are taking" />
            ) : courses.length === 0 ? (
              <Empty caption="This user is not taking any courses." />
            ) : (
              <List sx={{ width: "100%", height: "20rem", overflow: "auto" }}>
                <TransitionGroup>
                  {courses.map((item, i) => (
                    <Collapse key={i}>
                      <ListItemButton
                        onClick={() => {
                          dispatch(
                            openModal({
                              ID: "COURSE_DETAIL",
                              props: {
                                header: "Details for the course",
                                caption: "Al available information on ",
                                data: item,
                              },
                              conStyle: { width: "80vw" },
                            })
                          );
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar style={{ background: green[500] }}>
                            <AutoStories />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={item.course_id}
                        />
                      </ListItemButton>
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchForTeachers;
