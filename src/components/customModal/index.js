import { Modal, Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/nav";
import GenericUpdate from "../GenericUpdateModal";
import RoleModalChild from "../rightCollection/roleModalChild";

const modals = { "ROLE_DETAIL" : <RoleModalChild />, "GENERIC_UPDATE": <GenericUpdate/> };
const style = {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid gray",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          maxHeight: "95%",
          overflow: "auto"
        }

function CustomModal() {
  const { modalOpen, modalID, modalContainerStyle } = useSelector(
    (state) => state.nav
  );
  const dispatch = useDispatch();
  

  return (
    <Modal
      sx={{ overflow: "auto" }}
      open={modalOpen}
      onClose={() => dispatch(closeModal())}
    >
      <Box sx={{ ...style, ...modalContainerStyle }}>{modals[modalID]}</Box>
    </Modal>
  );
}

export default CustomModal;
