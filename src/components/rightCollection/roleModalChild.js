import {
  Box,
  Grid,
  Typography,
  Divider,
  ListItemAvatar,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import { East, Person, Add } from "@mui/icons-material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RoleItem from "./roleItem";
import PaperButton from "../paperButton";
import { orange, red, green, blue } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import { updateStateRole, openModal } from "../../redux/nav";
import { getRole } from "../../redux/role";
import { TransitionGroup } from "react-transition-group";
import { BACKEND_ENDPOINT } from "../../redux/constants";
import RolePlaceholder from "./roleModalPlaceholder";

const cols = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "first_name", headerName: "First Name", width: 230 },
  { field: "last_name", headerName: "Last Name", width: 230 },
  { field: "email", headerName: "Email", width: 230 },
  { field: "created_at", headerName: "Joined", width: 230 },
  { field: "role_id", headerName: "Role", width: 430 },
];

function RoleModalChild() {
  const modalProps = useSelector((state) => state.nav.modalProps);
  const dispatch = useDispatch();
  console.log(modalProps);

  // TODO: SEND THE REQUEST FOR THE ROLE DETAILS FROM HERE SO THAT THE MODAL HYDRATES WHEN THE MODAL OPENS

  const removePermFromList = (id) => {
    let modalClone = structuredClone(modalProps);
    modalClone.premissions = modalClone.premissions.filter(
      (el) => el.id !== id
    );
    dispatch(getRole());
    dispatch(updateStateRole(modalClone));
  };
  // return <RolePlaceholder /> IF THE ROLE IS LOADING USE THIS
  return (
    <Box>
      <Grid container spaceing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {`Details for the ${modalProps.tag} Role`}
            <Typography variant="body2">Update the fields bellow</Typography>
          </Typography>
          <Divider style={{ marginTop: "1rem" }} />
          <br />
        </Grid>
        <Grid spacing={4} item xs={8}>
          <Grid container rowSpacing={4} columnSpacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                <Typography variant="subtitle1">ID</Typography>
                {modalProps.id}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                <Typography variant="subtitle1">Tag</Typography>
                {modalProps.tag}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h6">
                <Typography variant="subtitle1">Description</Typography>
                {modalProps.description}
              </Typography>
            </Grid>
            <Grid container rowSpacing={4} sx={{ p: 4, mt: 0.1 }}>
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
        <Grid item xs={4}>
          <div>
            <Paper variant="outlined">
              <List sx={{ width: "100%", height: "20rem", overflow: "auto" }}>
                <TransitionGroup>
                  {modalProps.premissions.map(({ id, tag, description }, i) => (
                    <Collapse key={i}>
                      <RoleItem
                        key={i}
                        tag={tag}
                        desc={description}
                        roleId={modalProps.id}
                        id={id}
                        hasRole
                        handelEdgeClick={removePermFromList}
                      />
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            columns={cols}
            rows={[
              ...modalProps.users
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoleModalChild;
