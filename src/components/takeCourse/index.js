import React from "react";
import {
  Grid,
  TextField,
  Paper,
  List,
  Collapse,
  Typography,
  Divider,
  Backdrop,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { getCourse, getCurrentHistory } from "../../redux/course";
import RoleItem from "./roleItem";
import { TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";

function TakeCourse() {
  const dispatch = useDispatch();
  const [searchBox, setSearchBox] = React.useState("");
  const { modalProps } = useSelector((state) => state.nav);
  const { courses, allLoading, currCoursesLoading, currCourses } = useSelector(
    (state) => state.course
  );

  const history = useNavigate();

  React.useEffect(() => {
    dispatch(getCourse());
    dispatch(getCurrentHistory());

    return () => {
      history("/courses");
    };
  }, [history, dispatch]);

  return (
    <Grid contariner spacing={2}>
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
        />
      </Grid>
      <Grid item xs={12}>
        <div style={{ marginTop: "1rem" }}>
          <Paper variant="outlined">
            {allLoading || currCoursesLoading ? (
              <Backdrop style={{ position: "absolute" }} open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              <List sx={{ width: "100%", height: "20rem", overflow: "auto" }}>
                <TransitionGroup>
                  {courses
                    .filter(
                      (item) =>
                        item.name
                          .toUpperCase()
                          .includes(searchBox.toUpperCase()) &&
                        !currCourses.some((i) => i.id === item.id)
                    )
                    .map(({ id, name, course_id }, i) => (
                      <Collapse key={i}>
                        <RoleItem
                          key={i}
                          tag={name}
                          desc={course_id}
                          roleId={189}
                          id={id}
                        />
                      </Collapse>
                    ))}
                </TransitionGroup>
              </List>
            )}
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
}

export default TakeCourse;
