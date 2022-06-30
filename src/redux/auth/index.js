import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../constants";

export const login = createAsyncThunk("auth/login", async (payload) => {
  return await axios.post(`${BACKEND_ENDPOINT}/auth/login`, payload);
});

export const signup = createAsyncThunk("auth/signup", async (payload) => {
  return await axios.post(`${BACKEND_ENDPOINT}/auth/signup`, payload);
});

export const getUser = createAsyncThunk("auth/getUser", async () => {
  return await axios.post(`${BACKEND_ENDPOINT}/auth`);
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    getUserLoading: false,
    authenticated: true,
    token: null,
    loginError: {},
    signupError: {},
  },
  reducers: {
    clearError: (state) => {
      state.loginError = {}
      state.signupError = {}
    } 
  },
  extraReducers(builder) {
    builder
      .addCase(login.rejected, (state, action) => {
        console.log(action, action.payload);
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(signup.rejected, (state, action) => {
        console.log(action, action.payload);
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log(action, action.payload);
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(getUser.pending, (state, action) => {
        state.getUserLoading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.authenticated = true;
          state.loading = false;
          state.token = action.payload.data.token;
          state.user = action.payload.data;
          state.loginError = {};
          state.signupError = {};
        }
      );
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
