import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "nav",
  initialState: {
    drawerOpen: true,
    modalOpen: false,
    modalID: "",
    modalProps: null,
    modalContainerStyle: {},
    errorOpen: false,
    errorProps: null
  },
  reducers: {
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalID = action.payload.ID;
      state.modalProps = action.payload.props;
      state.modalContainerStyle = action.payload.conStyle;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalID = "";
      state.modalProps = null;
      state.modalContainerStyle = {};
    },
    openError: (state, action) => {
      state.errorOpen = true;
      state.dialogProps = action.payload.props;
    },
    closeError: (state) => {
      state.errorOpen = false;
      state.dialogProps = null;
    },
    updateStateRole: (state, action) => {
      console.log(state, action)
      state.modalProps = action.payload
    },
  },
});

export const {
  toggleDrawer,
  openModal,
  closeModal,
  openError,
  closeError,
  updateStateRole,
} = navSlice.actions;
export default navSlice.reducer;
