import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import nav from "./nav";
import role from "./role";
import dept from "./department";

export default configureStore({
  reducer: {
    auth,
    nav,
    role,
    dept,
  },
});
