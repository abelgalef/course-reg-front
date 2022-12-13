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
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_ENDPOINT } from "../../redux/constants";
import Placeholder from "../modalPlaceholder/roleModalPlaceholder";
import PaperButton from "../paperButton";
import { orange, red, green, blue } from "@mui/material/colors";
import { East, Person, Add } from "@mui/icons-material";
import { openModal } from "../../redux/nav";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";

const cols = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "allowed_num_of_courses",
    headerName: "Allowed Number of Courses",
    width: 230,
  },
  {
    field: "allowed_num_of_credits",
    headerName: "Allowed Number of Credits",
    width: 230,
  },
  {
    field: "semster_expiry",
    headerName: "Semster Expiry",
    width: 130,
    valueGetter: (params) => {
      return `${moment(params.row.created_at).fromNow()}`;
    },
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 130,
    valueGetter: (params) => {
      return `${moment(params.row.created_at).fromNow()}`;
    },
  },
];

function DeptDetail() {
  const { modalProps } = useSelector((state) => state.nav);
  const { token } = useSelector((state) => state.auth);
  const [dept, setDept] = useState({});
  const [loading, setLoading] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_ENDPOINT}/dept/${modalProps.id}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => {
        setDept(res.data);
        setLoading(false);
        console.log(res);
      })
      .catch((err) => setLoading(false));
  }, [modalProps, token]);

  if (loading) return <Placeholder />;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={12} lg={8}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {`Details for the ${dept.name} department`}
              <Typography variant="body2">
                {`These are the properties of the ${dept.name} department`}
              </Typography>
            </Typography>
            <Divider style={{ marginTop: "1rem" }} />
            <br />
          </Grid>
          <Grid spacing={4} item xs={12} lg={8}>
            <Grid container rowSpacing={4} columnSpacing={4}>
              <Grid item xs={6}>
                <Typography variant="h6">
                  <Typography variant="subtitle1">ID</Typography>
                  {dept.id}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  <Typography variant="subtitle1">Depatment Name</Typography>
                  {dept.name.charAt(0).toUpperCase() + dept.name.slice(1)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  <Typography variant="subtitle1">
                    Depatment Courses Available
                  </Typography>
                  {dept.courses.length + " Courses Available"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  <Typography variant="subtitle1">Created At</Typography>
                  {moment(dept.created_at).fromNow()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={6} sx={{ pr: 2 }}>
                  <PaperButton>
                    <ListItem
                      alignItems="flex-start"
                      onClick={() =>
                        dispatch(
                          openModal({
                            ID: "ROLE_USER_CHOOSER",
                            props: {
                              data: {
                                tag: modalProps.tag,
                                description: modalProps.description,
                              },
                              header: "Add a user to this role group",
                              caption:
                                "Enter the name of the user you want to add",
                              roleId: modalProps.id,
                            },
                            conStyle: { width: "30vw" },
                          })
                        )
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[500] }}>
                          <Person />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Add users to this role group"
                        secondary="Click here to Add or Remove users from this group"
                      />
                    </ListItem>
                  </PaperButton>
                </Grid>
                <Grid item xs={6} sx={{ pl: 2 }}>
                  <PaperButton>
                    <ListItem
                      onClick={() =>
                        dispatch(
                          openModal({
                            ID: "PERM_CHOOSER",
                            props: {
                              data: {
                                tag: modalProps.tag,
                                description: modalProps.description,
                              },
                              header: "Give a permission to a role",
                              caption: "Enter a keyword in the search bar.",
                              roleId: modalProps.id,
                            },
                            conStyle: { width: "30vw" },
                          })
                        )
                      }
                      alignItems="flex-start"
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: orange[500] }}>
                          <Add />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Add a right to this role"
                        secondary="Click here to give this role a new permission"
                      />
                      <East sx={{ m: "auto" }} />
                    </ListItem>
                  </PaperButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} lg={4}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {`Courses in the ${dept.name} department`}
              <Typography variant="body2">
                {`These are all the courses in the ${dept.name} department`}
              </Typography>
            </Typography>
            <Divider style={{ marginTop: "1rem" }} />
            <br />
          </Grid>

          <Grid item sx={12}>
            <Paper variant="outlined">
              <List sx={{ width: "100%", height: "20rem", overflow: "auto" }}>
                <TransitionGroup>
                  {dept.courses.map(({ id, name, course_id, credits }, i) => (
                    <Collapse key={i}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar>
                            <Person />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={name}
                          secondary={course_id + " ● Credits: " + credits}
                        />
                      </ListItem>
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            columns={cols}
            rows={[...dept.constraints]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DeptDetail;
