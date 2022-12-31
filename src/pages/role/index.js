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
import {
  GroupAdd,
  FactCheck,
  Check,
  Close,
  GroupRemove,
} from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRight, getRole } from "../../redux/role";
import PaperButton from "../../components/paperButton";
import { orange, red, green } from "@mui/material/colors";
import RightCollection from "../../components/rightCollection";
import { openModal } from "../../redux/nav";
import CustomModal from "../../components/customModal";
import {useMemo} from "react"
import BigCard from "../../components/HisCard";
import HorizontalGrid from "../../components/horizontalGrid";

const conStyle = { width: "80vw" };

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

  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  const dispatch = useDispatch();

  const { roles, rights, roleLoading, rightLoading } = useSelector(
    (state) => state.role
  );
  const { history } = useSelector((state) => state.history);

   const roleHis = useMemo(() => {
     let his = [];

     his = history.filter((item) => item.tag === "ROLE");
     return his.reverse();
   }, [history]);

  useEffect(() => {
    dispatch(getRole());
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Grid container spacing={2} xs={12}>
          <Grid style={{ paddingBottom: ".75rem" }} item xs={12}>
            <Typography variant="h5">
              All Roles
              <Typography variant="body2">
                A list of all the roles available
              </Typography>
            </Typography>
            <Divider />
            <br />
            <DataGrid
              columns={columns}
              rows={roles}
              pageSize={3}
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
          <Grid item md={6} xs={12}>
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
              <ListItem
                onClick={() =>
                  dispatch(
                    openModal({
                      ID: "GENERIC_CREATE",
                      props: {
                        header: "Create A New Role",
                        caption:
                          "You can create a new role here by entering the required information",
                        data: { tag: "", description: "" },
                        url: "/role",
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
                  primary="Create a role"
                  secondary="Click here to create a role"
                />
              </ListItem>
            </PaperButton>
          </Grid>
          <Grid item md={6} xs={12}>
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
              <ListItem
                onClick={() =>
                  dispatch(
                    openModal({
                      ID: "GENERIC_DELETE",
                      props: {
                        header: "Delete An Existing Role",
                        caption: "Select a role to delete.",
                        data: roles,
                        url: "/role",
                        type: "role",
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
                  primary="Delete a role"
                  secondary="Click here to delete a role"
                />
              </ListItem>
            </PaperButton>
          </Grid>
          <Grid sx={{ mt: 2 }} item xs={12}>
            <Typography variant="h6">
              Your Depatment View History
              <Typography variant="body2">
                All the departments you viewed
              </Typography>
            </Typography>
            <Divider />
            <br />
            <HorizontalGrid>
              {roleHis.map((el) => (
                <BigCard {...el} />
              ))}
            </HorizontalGrid>
          </Grid>
        </Grid>
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
    </Grid>
  );
}

export default Role;
