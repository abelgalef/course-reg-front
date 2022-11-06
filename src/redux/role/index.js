import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../constants";

export const getRole = createAsyncThunk(
  "role/get",
  async (payload, { rejectWithValue, getState }) => {
    return await (
      await axios.get(`${BACKEND_ENDPOINT}/role/`, {
        headers: { Authorization: `Token ${getState().auth.token}` },
      })
    ).data;
  }
);

export const getRight = createAsyncThunk(
  "right/get",
  async (payload, { rejectWithValue, getState }) => {
    return await (
      await axios.get(`${BACKEND_ENDPOINT}/right/`, {
        headers: { Authorization: `Token ${getState().auth.token}` },
      })
    ).data;
  }
);

export const roleSlice = createSlice({
  name: "role",
  initialState: {
    roles: [],
    rights: [],
    roleLoading: false,
    rightLoading: false,
  },
  extraReducers(builder) {
    builder
      .addCase(getRole.pending, (state, action) => {
        state.roleLoading = true;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.roles = action.payload;
      })
      .addCase(getRole.rejected, (state, action) => {
        state.roleLoading = false;
      })
      .addCase(getRight.pending, (state, action) => {
        state.rightLoading = true;
      })
      .addCase(getRight.fulfilled, (state, action) => {
        state.rightLoading = false;
        state.rights = action.payload;
      })
      .addCase(getRight.rejected, (state, action) => {
        state.rightLoading = false;
      });
  },
});

export default roleSlice.reducer;
