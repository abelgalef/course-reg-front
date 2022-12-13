import { Modal, Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/nav";
import DeptDetail from "../deptDetail";
import GenericCreate from "../GenericCreateModal";
import GenericDeleteModal from "../GenericDeleteModal";
import GenericUpdate from "../GenericUpdateModal";
import PermChooser from "../PermChooser";
import RoleModalChild from "../rightCollection/roleModalChild";
import UserChooser from "../UserChooser";

const modals = {
  ROLE_DETAIL: <RoleModalChild />,
  DEPT_DETAIL: <DeptDetail />,
  GENERIC_UPDATE: <GenericUpdate />,
  PERM_CHOOSER: <PermChooser />,
  GENERIC_CREATE: <GenericCreate />,
  ROLE_USER_CHOOSER: <UserChooser />, 
  GENERIC_DELETE: <GenericDeleteModal />
};

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
  overflow: "auto",
};

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
