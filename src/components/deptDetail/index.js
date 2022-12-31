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
import { East, Rule, Add } from "@mui/icons-material";
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

function Empty() {
  return (
    <div style={{ textAlign: "center", transform: "translateY(8rem)" }}>
      <Typography variant="h5" component="div">
        There is nothing to display
        <Typography variant="body2" component="div">
          Add more courses to see them here
        </Typography>
      </Typography>
    </div>
  );
}

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
          <Grid item xs={12} lg={8}>
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
                  onClick={() =>
                    dispatch(
                      openModal({
                        ID: "GENERIC_CREATE",
                        props: {
                          data: {
                            change: "", this: ""
                          },
                          header: "Add a new Constraint to this department",
                          caption: "Enter the details of the new constraint",
                          roleId: modalProps.id,
                        },
                        conStyle: { width: "30vw" },
                      })
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[500] }}>
                      <Rule />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Add a new constraint"
                    secondary="Click here to add a new constraint to the department"
                  />
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
                          data: dept,
                          header: "Update this department",
                          caption: "Update the details of the department",
                          url: "/dept",
                          ID: dept.id,
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
                    primary="Update this department"
                    secondary="Click here to change the details of this department"
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
              {`Courses in the ${dept.name} department`}
              <Typography variant="body2">
                {`These are all the courses in the ${dept.name} department`}
              </Typography>
            </Typography>
            <Divider style={{ marginTop: "1rem" }} />
            <br />
          </Grid>

          <Grid item sx={12}>
            <Paper variant="outlined" style={{ height: "20rem" }}>
              <Empty />
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
