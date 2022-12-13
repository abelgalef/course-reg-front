import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Delete, Group, Close } from "@mui/icons-material";
import { green, orange, red } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../redux/constants";
import { openError } from "../../redux/nav";

function RoleItem({ hasRole, tag, desc, id, url, handelEdgeClick }) {
  const [hover, setHover] = React.useState(false);
  const [actionDone, setActionDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const handelClick = () => {
    setLoading(true);

    axios
      .delete(`${BACKEND_ENDPOINT}${url}/${id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setLoading(false);
        setActionDone(true)
      })
      .catch((err) => {
        if (err.response) {
          dispatch(
            openError({
              type: "error",
              header: "Something Went Wrong",
              desc: err.response.data,
              so: "dsafsdf"
            })
          );
        } else if (err.request) {
          dispatch(
            openError({
              type: "error",
              header: "Something Went Wrong",
              desc: "The request was made but no response was received. Make sure the back-end is reachable or contact the admin.",
            })
          );
        } else {
          dispatch(
            openError({
              type: "error",
              header: "Something Went Wrong",
              descc: "An error ocurred when setting up the request. Please contact the admin.",
              so: "dsafsdf",
            })
          );
        }
        
        console.log({ err: err, "err data": err.data, "err req": err.request });
        console.log({ err: err, "err data": err.data, "err req": err.request });
        setLoading(false);
      });
  };

  return (
    <ListItem
      alignItems="flex-start"
      disabled={loading || actionDone}
      secondaryAction={
        <IconButton
          edge="end"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          color={hover ? "error" : "default"}
          onClick={() => handelClick()}
          disabled={loading}
        >
          <Delete />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <Group />
        </Avatar>
        {loading && (
          <CircularProgress
            size={50}
            sx={{
              color: orange[500],
              position: "absolute",
              top: 11,
              left: 11,
            }}
          />
        )}
      </ListItemAvatar>
      <ListItemText primary={tag} secondary={desc} />
    </ListItem>
  );
}

export default RoleItem;
