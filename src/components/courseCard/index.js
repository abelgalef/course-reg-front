import {
  Avatar,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Typography,
  Grid,
  AvatarGroup,
  Stack,
  CardActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { blue, green, orange } from "@mui/material/colors";
import { NavigateNext, AutoStories } from "@mui/icons-material";
import genColor from "../../utils/colorGen";
import "./card.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/nav";

const hoverStyle = {
  borderColor: blue[900],
  bgcolor: blue[100],
  boxShadow: "0 10px 40px rgb(0 0 0 / 0.2)",
};
function CourseCard({
  name,
  course_id,
  credits,
  id,
  created_at,
  resources,
  dept_id,
}) {
  const [onHover, setHover] = useState({});
  const dispatch = useDispatch();

  return (
    <Paper
      variant="outlined"
      className="No-Scroll"
      sx={{
        width: 350,
        textAlign: "left",
        mr: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar style={{ background: green[500] }}>
            <AutoStories />
          </Avatar>
        }
        title={name}
        subheader={moment(created_at).format("ll")}
      />
      <Divider />
      <CardContent style={{ textAlign: "center" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <Typography variant="body1">
            {course_id}
            <Typography variant="subtitle2">Course ID</Typography>
          </Typography>
          <Typography variant="body">
            {credits} <Typography variant="subtitle2">Credits</Typography>
          </Typography>
        </Stack>
      </CardContent>
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body1">
            4 Resources available
            <Typography variant="subtitle2">Click here to view them</Typography>
          </Typography>
          <AvatarGroup title="Files for this course" max={3}>
            <Avatar style={{ background: orange[500] }}>MA</Avatar>
            <Avatar style={{ background: orange[500] }}>MA</Avatar>
            <Avatar style={{ background: orange[500] }}>MA</Avatar>
            <Avatar style={{ background: orange[500] }}>MA</Avatar>
          </AvatarGroup>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          onClick={() =>
            dispatch(
              openModal({
                ID: "COURSE_DETAIL",
                props: {
                  header: "Details for the course",
                  caption: "Al available information on ",
                  data: {
                    name,
                    course_id,
                    credits,
                    id,
                    created_at,
                    resources,
                    dept_id,
                  },
                },
                conStyle: { width: "80vw" },
              })
            )
          }
          fullWidth
          endIcon={<NavigateNext />}
        >
          View Course Detail
        </Button>
      </CardActions>
    </Paper>
  );
}

export default CourseCard;
