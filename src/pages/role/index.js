import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, FactCheck, Check, Close, Delete } from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRight, getRole } from "../../redux/role";
import PaperButton from "../../components/paperButton";
import { orange, red, green } from "@mui/material/colors";
import RightCollection from "../../components/rightCollection"
import {openModal} from "../../redux/nav"
import CustomModal from "../../components/customModal";

const conStyle = {width: "80vw"}

function Role() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "tag", headerName: "Tag", width: 230 },
    { field: "active", headerName: "Active", width: 130 },
    {
      field: "description",
      headerName: "Description",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 500,
    },
  ];

  const [hover1, setHover1] = useState(false)
  const [hover2, setHover2] = useState(false)
  const [hover3, setHover3] = useState(false)
  
  const dispatch = useDispatch();
  
  const { roles, rights, roleLoading, rightLoading } = useSelector(
    (state) => state.role
  );

  useEffect(() => {
    dispatch(getRole());
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Typography variant="h5">
          All Roles
          <Typography variant="body2">
            A list of all the roles available
          </Typography>
        </Typography>
        <Divider style={{ marginTop: "1rem" }} />
        <br />
        <DataGrid
          columns={columns}
          rows={roles}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={roleLoading}
          autoHeight
          onRowClick={(params) =>
            dispatch(
              openModal({
                ID: "ROLE_DETAIL",
                props: params.row,
                conStyle: conStyle,
              })
            )
          }
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h5">
          All Rights
          <Typography variant="body2">
            A list of all the rights available
          </Typography>
        </Typography>
        <Divider style={{ marginTop: "1rem" }} />
        <br />
        <RightCollection />
      </Grid>
      <Grid xs={12}>
        <br />
      </Grid>
      <Grid item md={4} xs={12}>
        <Typography variant="h5">
          Create A New Role
          <Typography variant="body2">
            You can create a new role here
          </Typography>
        </Typography>
        <Divider style={{ marginTop: "1rem" }} />
        <br />
        <PaperButton
          hoverStart={() => setHover1(true)}
          hoverEnd={() => setHover1(false)}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={hover1 ? { bgcolor: green[500] } : undefined}>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Create a role"
              secondary="Click here to create a role"
            />
          </ListItem>
        </PaperButton>
      </Grid>
      <Grid item md={4} xs={12}>
        <Typography variant="h5">
          Create A New Right
          <Typography variant="body2">
            You can create a new right here
          </Typography>
        </Typography>
        <Divider style={{ marginTop: "1rem" }} />
        <br />
        <PaperButton
          hoverStart={() => setHover2(true)}
          hoverEnd={() => setHover2(false)}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={hover2 ? { bgcolor: orange[500] } : undefined}>
                <FactCheck />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Add a new right"
              secondary="Click here to add a new right"
            />
          </ListItem>
        </PaperButton>
      </Grid>
      <Grid item md={4} xs={12}>
        <Typography variant="h5">
          Delete A Role
          <Typography variant="body2">
            You can create delete roles here
          </Typography>
        </Typography>
        <Divider style={{ marginTop: "1rem" }} />
        <br />
        <PaperButton
          hoverStart={() => setHover3(true)}
          hoverEnd={() => setHover3(false)}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={hover3 ? { bgcolor: red[500] } : undefined}>
                <Delete />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Delete a role"
              secondary="Click here to delete a role"
            />
          </ListItem>
        </PaperButton>
      </Grid>
    </Grid>
  );
}

export default Role;
