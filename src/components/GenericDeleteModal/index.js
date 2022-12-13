import {
  Grid,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  Collapse,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import RoleItem from "./roleItem";
import { useNavigate } from "react-router-dom";
import moment from "moment"

function GenericDeleteModal() {
  const [searchBox, setSearchBox] = React.useState("");
  const { modalProps } = useSelector((state) => state.nav);

  const history = useNavigate();

  useEffect(() => {
    return () => {
      history(window.location.pathname);
    };
  }, []);

  const handleTextChange = (e) => {
    setSearchBox(e.target.value);
  };

  const roleListBuilder = ({ id, tag, description }, i) => (
    <Collapse key={i}>
      <RoleItem key={i} tag={tag} desc={description} id={id} url={"/role"} />
    </Collapse>
  );

  const deptListBuilder = ({ id, name, dept_code, created_at }, i) => (
    <Collapse key={i}>
      <RoleItem
        key={i}
        tag={name}
        desc={dept_code + ` ● ${moment(created_at).fromNow()}`}
        id={id}
        url={"/dept"}
      />
    </Collapse>
  );

  const roleSearchType = (item) => item.tag.includes(searchBox.toUpperCase());
  const deptSearchType = (item) => item.name.includes(searchBox);

  const delType = { role: roleListBuilder, dept: deptListBuilder };
  const serachType = { role: roleSearchType, dept: deptSearchType };

  return (
    <Grid container spacing={2}>
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
        <Paper variant="outlined">
          <List sx={{ width: "100%", height: "20rem", overflow: "auto" }}>
            <TransitionGroup>
              {modalProps.data
                .filter(serachType[modalProps.type])
                .map(delType[modalProps.type])}
            </TransitionGroup>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default GenericDeleteModal;
