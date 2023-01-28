import {
  Grid,
  Typography,
  Divider,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
} from "@mui/material";
import React from "react";
import CourseCard from "../../components/courseCard";
import HorizontalGrid from "../../components/horizontalGrid";
import PaperButton from "../../components/paperButton";
import { openModal } from "../../redux/nav";
import { blue, green, orang, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { PlaylistAdd, Check, Close, Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import {
  getCourse,
  getAllHistory,
  getCurrentHistory,
} from "../../redux/course";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 230 },
  {
    field: "course_id",
    headerName: "Course Code",
    width: 130,
    sortable: false,
  },
  { field: "credits", headerName: "Credits", width: 130, sortable: false },
  { field: "dept_id", headerName: "Dept ID", width: 130, sortable: false },
  {
    field: "created_at",
    headerName: "Created At",
    width: 230,
  },
];

function Course() {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.history);
  const {
    courses,
    currCourses,
    hisCourses,
    allLoading,
    hisCoursesLoading,
    currCoursesLoading,
  } = useSelector((state) => state.course);

  console.log(courses);

  React.useEffect(() => {
    dispatch(getCourse());
    dispatch(getAllHistory());
    dispatch(getCurrentHistory());
  }, [dispatch]);

  const { totCreditThisSem, totCreidts } = React.useMemo(() => {
    let totCreditThisSem = 0;
    let totCreidts = 0;
    if (currCourses != null){
      currCourses.forEach((item) => (totCreditThisSem += item.credits));
    }

    if (hisCourses != null) {
      hisCourses.forEach((item) => (totCreidts += item.credits));
    }

    return { totCreditThisSem, totCreidts };
  }, [hisCourses, currCourses]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">
              Courses You Are Teaching This Semester
              <Typography variant="body2">
                A list of all the departments available
              </Typography>
            </Typography>
            <Divider style={{ marginTop: ".5rem" }} />
            <br />
            <div
              style={{
                display: "flex",
                whiteSpace: "nowrap",
                overflow: "auto",
              }}
            >
              {currCourses != null && currCourses.map((item) => (
                <CourseCard {...item} />
              ))}
            </div>
            <br />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h6">
              Take a Course for teaching
              <Typography variant="body2">
                You can take a courses for teaching here
              </Typography>
            </Typography>
            <Divider />
            <br />
            <PaperButton>
              <ListItem
                onClick={() =>
                  dispatch(
                    openModal({
                      ID: "TAKE_COURSE",
                      props: {
                        data: {
                          change: "",
                          this: "",
                        },
                        header: "Search for a course to teach",
                        caption: "Enter the name of the course to teach",
                        url: "/course",
                      },
                      conStyle: { width: "30vw" },
                    })
                  )
                }
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar style={{ background: blue[500] }}>
                    <PlaylistAdd />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Take Course for Teaching"
                  secondary="Click here to take a course for teaching"
                />
              </ListItem>
            </PaperButton>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h6">
              Create A New Department
              <Typography variant="body2">
                You can create a new department here
              </Typography>
            </Typography>
            <Divider />
            <br />
            <PaperButton>
              <ListItem
                onClick={() =>
                  dispatch(
                    openModal({
                      ID: "SEARCH_TEACHER",
                      props: {
                        header: "Look for teachers",
                        caption: "Enter the name of the teacher",
                        data: { name: "", dept_code: "" },
                        url: "/dept",
                      },
                      conStyle: { width: "70vw" },
                    })
                  )
                }
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar style={{ background: red[500] }}>
                    <Search />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Search for teachers and the courses they teach"
                  secondary="Click here to search for teachers and thier courses"
                />
              </ListItem>
            </PaperButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <br />
          <Typography variant="h6">
            All the Courses Available in the University
            <Typography variant="body2">
              A list of all the courses available
            </Typography>
          </Typography>
          <Divider style={{ marginTop: ".5rem" }} />
          <br />
          <DataGrid
            columns={columns}
            rows={courses}
            pageSize={6}
            rowsPerPageOptions={[5]}
            autoHeight
            onRowClick={(params) => {
              dispatch(
                openModal({
                  ID: "COURSE_DETAIL",
                  props: {
                    header: "Details for the course",
                    caption: "Al available information on ",
                    data: params.row,
                  },
                  conStyle: { width: "80vw" },
                })
              );

              // console.log(params, {...params.row})
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Courses Summary
            <Typography variant="body2">
              A summary of the courses related to you
            </Typography>
          </Typography>
          <Divider style={{ marginTop: ".5rem" }} />
          <br />
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <ListItem alignItems="flex-start">
              <ListItemText>
                <Typography variant="h6">
                  {`${totCreditThisSem} Creidts`}
                  <Typography variant="body2">
                    Total number of Credit Hours this Semester
                  </Typography>
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText>
                <Typography variant="h6">
                  {`${
                    currCourses != null ? currCourses.length : 0
                  } Courses`}
                  <Typography variant="body2">
                    Total number of courses taken this Semster
                  </Typography>
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="h6">
                  {`${totCreidts} Creidts`}
                  <Typography variant="body2">
                    Total number of Credit Hours
                  </Typography>
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText>
                <Typography variant="h6">
                  {`${
                    hisCourses != null ? hisCourses.length : 0
                  } Courses`}
                  <Typography variant="body2">
                    Total number of courses taken
                  </Typography>
                </Typography>
              </ListItemText>
            </ListItem>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Course;
