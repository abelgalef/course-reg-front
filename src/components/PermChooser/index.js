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
import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStateRole, openModal } from "../../redux/nav";
import { getRight, getRole } from "../../redux/role";
import RoleItem from "./roleItem";
import { TransitionGroup } from "react-transition-group";

function PermChooser() {
  const { modalProps } = useSelector((state) => state.nav);
  const { rights, rightLoading, roles } = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const [searchBox, setSearchBox] = React.useState("");

  const roleID = useSelector((state) => state.auth.user.role_id);
  const myRole = React.useMemo(
    () => roles.find((role) => role.id === roleID),
    [roles, roleID]
  );
  const hasPerm = (tag) => {
    let found = myRole.premissions.find((perm) => perm.tag === tag);
    return found ? true : false;
  };

  React.useEffect(() => {
    dispatch(getRight());
  }, []);

  // const removePermFromList = (id) => {
  //   let modalClone = structuredClone(modalProps);
  //   modalClone.premissions = modalClone.premissions.filter(
  //     (el) => el.id !== id
  //   );
  //   dispatch(getRole());
  //   dispatch(updateStateRole(modalClone));
  // };

  const handleTextChange = (e) => {
      setSearchBox(e.target.value);
  };

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
          onChange={handleTextChange}
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
            {rightLoading ? (
              <Backdrop style={{ position: "absolute" }} open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              <List sx={{ width: "100%", height: "20rem", overflow: "auto" }}>
                <TransitionGroup>
                  {rights.filter(item => item.tag.includes(searchBox.toUpperCase())).map(({ id, tag, description }, i) => (
                    <Collapse key={i}>
                      <RoleItem
                        key={i}
                        tag={tag}
                        desc={description}
                        roleId={modalProps.roleId}
                        id={id}
                        hasRole={hasPerm(tag)}
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

export default PermChooser;
