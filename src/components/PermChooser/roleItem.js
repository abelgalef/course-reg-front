import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Add, Check, Close } from "@mui/icons-material";
import { green, orange, red } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../redux/constants";
import { openError } from "../../redux/nav";

function RoleItem({ hasRole, tag, desc, id, roleId, handelEdgeClick }) {
  const [hover, setHover] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const handelClick = () => {
    setLoading(true);

    axios
      .post(`${BACKEND_ENDPOINT}/role/give-perm/${roleId}/${id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          dispatch(
            openError({
              type: "error",
              header: "Something Went Wrong",
              desc: err.data,
            })
          );
        } else if (err.request) {
          dispatch(
            openError({
              type: "error",
              header: "Something Went Wrong",
              desc: "The request was made but no response was received. Make sure the back-end is reachable.",
            })
          );
        } else {
          dispatch(
            openError({
              type: "error",
              header: "Something Went Wrong",
              desc: err.message,
            })
          );
        }

        console.log({ err: err, "err data": err.data, "err req": err.request });
        setLoading(false);
      });
  };

  return (
    <ListItem
      alignItems="flex-start"
      disabled={loading}
      secondaryAction={
        !hasRole && (
          <IconButton
            edge="end"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            color={hover ? "error" : "default"}
            onClick={() => handelClick()}
            disabled={loading}
          >
            <Add />
          </IconButton>
        )
      }
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: hasRole ? green[500] : red[300] }}>
          {hasRole ? <Check /> : <Close />}
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
