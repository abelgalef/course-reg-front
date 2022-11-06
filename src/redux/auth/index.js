import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../constants";

export const login = createAsyncThunk("auth/login", async (payload, {rejectWithValue}) => {
  try {
    return await (await axios.post(`${BACKEND_ENDPOINT}/auth/login`, payload)).data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
});

export const signup = createAsyncThunk("auth/signup", async (payload, { rejectWithValue }) => {
  try {
    return await (await axios.post(`${BACKEND_ENDPOINT}/auth/register`, payload)).data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
   
});

export const getUser = createAsyncThunk("auth/getUser", async (payload, {getState}) => {
  return await (await axios.get(`${BACKEND_ENDPOINT}/user`, { headers: { Authorization: `Token ${getState().auth.token}` } })).data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    getUserLoading: false,
    authenticated: false,
    token: localStorage.getItem("token") || null,
    loginError: false,
    signupError: {}
  },
  reducers: {
    clearError: (state) => {
      state.loginError = false
      state.signupError = {}
    } 
  },
  extraReducers(builder) {
    builder
      .addCase(login.rejected, (state, action) => {
        console.log(action, action.payload);
        state.loading = false;
        state.authenticated = false;
        state.loginError = true;
      })
      .addCase(signup.rejected, (state, action) => {
        console.log(action, action.payload);
        state.loading = false;
        state.authenticated = false;

        let obj = {};

        action.payload.forEach((item) => {
          let vals = Object.values(item.overview);
          obj[vals[0]] = vals[1];
        });

        state.signupError = obj;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log(action, action.payload);
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.pending, (state, action) => {
        state.getUserLoading = true;
      })
      .addMatcher((action) => action.type.startsWith("auth") && action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.authenticated = true;
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload;
          state.loginError = {};
          state.signupError = {};
          axios.defaults.headers.common["Authorization"] =
            "Token " + action.payload.token;

          localStorage.setItem("token", state.token);
        }
      );
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
