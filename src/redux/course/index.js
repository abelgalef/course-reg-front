import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../constants";

export const getCourse = createAsyncThunk(
  "courses/get-all",
  async (payload, { rejectWithValue, getState }) => {
    return await (
      await axios.get(`${BACKEND_ENDPOINT}/course/`, {
        headers: { Authorization: `Token ${getState().auth.token}` },
      })
    ).data;
  }
);

export const getCurrentHistory = createAsyncThunk(
  "courses/get-current",
  async (payload, { rejectWithValue, getState }) => {
    return await (
      await axios.get(`${BACKEND_ENDPOINT}/course/current-history`, {
        headers: { Authorization: `Token ${getState().auth.token}` },
      })
    ).data;
  }
);

export const getAllHistory = createAsyncThunk(
  "courses/all-history",
  async (payload, { rejectWithValue, getState }) => {
    return await (
      await axios.get(`${BACKEND_ENDPOINT}/course/all-history`, {
        headers: { Authorization: `Token ${getState().auth.token}` },
      })
    ).data;
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    currCourses: [],
    hisCourses: [],
    hisCoursesLoading: false,
    currCoursesLoading: false,
    allLoading: false,
  },
  extraReducers(builder) {
    builder
      .addCase(getCourse.rejected, (state, action) => {
        state.allLoading = false;
      })
      .addCase(getCourse.pending, (state, action) => {
        state.allLoading = true;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.allLoading = false;
        console.log(action, action.payload);
      })
      .addCase(getCurrentHistory.rejected, (state, action) => {
        state.currCoursesLoading = false;
      })
      .addCase(getCurrentHistory.pending, (state, action) => {
        state.currCoursesLoading = true;
      })
      .addCase(getCurrentHistory.fulfilled, (state, action) => {
        state.currCourses = action.payload;
        state.currCoursesLoading = false;
        console.log(action, action.payload);
      })
      .addCase(getAllHistory.rejected, (state, action) => {
        state.hisCoursesLoading = false;
      })
      .addCase(getAllHistory.pending, (state, action) => {
        state.hisCoursesLoading = true;
      })
      .addCase(getAllHistory.fulfilled, (state, action) => {
        state.hisCourses = action.payload;
        state.hisCoursesLoading = false;
        console.log(action, action.payload);
      });
  },
});

export default courseSlice.reducer;
