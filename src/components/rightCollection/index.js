import React, { useEffect, useMemo } from "react";
import {
  Paper,
  List,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRight } from "../../redux/role";
import RoleItem from "./roleItem";

function RightCollection() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRight());
  }, []);

  const { rightLoading, roleLoading, rights, roles } = useSelector(
    (state) => state.role
  );

  const roleID = useSelector((state) => state.auth.user.role_id);
  const myRole = useMemo(
    () => roles.find((role) => role.id === roleID),
    [roles, roleID]
  );
  const hasPerm = (tag) => {
    if (myRole !== undefined) {
      let found = myRole.premissions.find((perm) => perm.tag === tag);
      return found ? true : false;
    }
    return false
  };

  return (
    <Paper variant="outlined" style={{ position: "relative" }}>
      {rightLoading || roleLoading ? (
        <Backdrop style={{ position: "absolute" }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <List sx={{ width: "100%", height: "45rem", overflow: "auto" }}>
          {rights.length === 0 ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">
                <b>There are no rights to display.</b>
                <br />
                <Typography variant="caption">
                  Check out the options bellow to create a new right or role
                </Typography>
              </Typography>
            </div>
          ) : (
            rights.map(({ tag, description }, i) => (
              <RoleItem
                key={i}
                tag={tag}
                desc={description}
                hasRole={hasPerm(tag)}
              />
            ))
          )}
        </List>
      )}
    </Paper>
  );
}

export default RightCollection;
