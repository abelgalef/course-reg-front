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
import { BACKEND_ENDPOINT } from "../../redux/constants";

function UserChooser() {
  const { modalProps } = useSelector((state) => state.nav);
  const { rights, rightLoading, roles } = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const [searchBox, setSearchBox] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);

  const roleID = useSelector((state) => state.auth.user.role_id);

  React.useEffect(() => {
    axios
      .get(`${BACKEND_ENDPOINT}/role/neg-users/${modalProps.roleId}`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, err.data, err.response);
        setLoading(false);
      });
  }, []);

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
          label="Enter a the Name of the User"
          variant="outlined"
          helperText="Searchs are case sensetive"
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
            {loading ? (
              <Backdrop style={{ position: "absolute" }} open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              <List sx={{ width: "100%", height: "20rem", overflow: "auto" }}>
                <TransitionGroup>
                  {users
                    .filter(
                      (item) =>
                        item.first_name.includes(searchBox) ||
                        item.last_name.includes(searchBox)
                    )
                    .map(({ id, first_name, last_name, email }, i) => (
                      <Collapse key={i}>
                        <RoleItem
                          key={i}
                          tag={first_name + " " + last_name}
                          desc={email}
                          roleId={modalProps.roleId}
                          id={id}
                          hasRole
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

export default UserChooser;
