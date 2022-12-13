import { defaultListboxReducer } from "@mui/base";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../constants";

export const getDepts = createAsyncThunk(
  "dept/get",
  async (payload, { rejectWithValue, getState }) => {
    return await (
      await axios.get(`${BACKEND_ENDPOINT}/dept/`, {
        headers: { Authorization: `Token ${getState().auth.token}` },
      })
    ).data;
  }
);

export const deptSlice = createSlice({
  name: "dept",
  initialState: {
    depts: [],
    pending: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDepts.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(getDepts.fulfilled, (state, action) => {
        state.pending = false;
        state.depts = action.payload;
      })
      .addCase(getDepts.rejected, (state, action) => {
        state.pending = false;
      });
  },
});

export default deptSlice.reducer