import {
  Grid,
  Typography,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { orange, red, green } from "@mui/material/colors";
import {
  GroupAdd,
  FactCheck,
  Check,
  Close,
  GroupRemove,
} from "@mui/icons-material";
import PaperButton from "../../components/paperButton";
import { useDispatch, useSelector } from "react-redux";
import { getDepts } from "../../redux/department";
import { openModal } from "../../redux/nav";
import { useLocation } from "react-router-dom";
import moment from "moment";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 230 },
  { field: "dept_code", headerName: "Code", width: 130, sortable: false },
  {
    field: "created_at", headerName: "Created At", width: 230, valueGetter: (params) => {
      return moment(params.row.created_at).fromNow()
    }
  },
];

function Department() {
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  
  const dispatch = useDispatch();
  const location = useLocation();

  const { depts, pending } = useSelector((state) => state.dept);
    
  useEffect(() => {
    dispatch(getDepts());
  }, [location, dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item md={12} lg={9}>
        <Grid container spacing={2} xs={12}>
          <Grid style={{ paddingBottom: ".75rem" }} item xs={12}>
            <Typography variant="h5">
              All Departments
              <Typography variant="body2">
                A list of all the departments available
              </Typography>
            </Typography>
            <Divider style={{ marginTop: "1rem" }} />
            <br />
            <DataGrid
              columns={columns}
              rows={depts}
              pageSize={8}
              rowsPerPageOptions={[5]}
              loading={pending}
              autoHeight
              onRowClick={(params) =>
                dispatch(
                  openModal({
                    ID: "DEPT_DETAIL",
                    props: params.row,
                    conStyle: { width: "80vw" },
                  })
                )
              }
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h6">
              Create A New Department
              <Typography variant="body2">
                You can create a new department here
              </Typography>
            </Typography>
            <Divider style={{ marginTop: "1rem" }} />
            <br />
            <PaperButton
              hoverStart={() => setHover2(true)}
              hoverEnd={() => setHover2(false)}
            >
              <ListItem
                onClick={() =>
                  dispatch(
                    openModal({
                      ID: "GENERIC_CREATE",
                      props: {
                        header: "Create A New Department",
                        caption:
                          "You can create a new role here by entering the required information",
                        data: { name: "", dept_code: "" },
                        url: "/dept",
                      },
                      conStyle: { width: "40vw" },
                    })
                  )
                }
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: green[500] }}>
                    <GroupAdd />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Create a new department"
                  secondary="Click here to create a department"
                />
              </ListItem>
            </PaperButton>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h6">
              Delete A Department
              <Typography variant="body2">
                You can create delete departments here
              </Typography>
            </Typography>
            <Divider style={{ marginTop: "1rem" }} />
            <br />
            <PaperButton
              hoverStart={() => setHover3(true)}
              hoverEnd={() => setHover3(false)}
            >
              <ListItem
                onClick={() =>
                  dispatch(
                    openModal({
                      ID: "GENERIC_DELETE",
                      props: {
                        header: "Delete An Existing Role",
                        caption: "Select a role to delete.",
                        data: depts,
                        url: "/dept",
                        type: "dept",
                      },
                      conStyle: { width: "40vw" },
                    })
                  )
                }
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: red[500] }}>
                    <GroupRemove />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Delete a department"
                  secondary="Click here to delete a department"
                />
              </ListItem>
            </PaperButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} lg={3}>
        <Typography variant="h5">
          Your Department
          <Typography variant="body2">
            A detailed view of your department
          </Typography>
        </Typography>
        <Divider style={{ marginTop: "1rem" }} />
        <br />
      </Grid>
    </Grid>
  );
}

export default Department;
