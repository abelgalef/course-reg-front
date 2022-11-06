import { configureStore } from '@reduxjs/toolkit'
import auth from "./auth"
import nav from "./nav"
import role from "./role"

export default configureStore({
  reducer: {
    auth,
    nav,
    role
  },
});
