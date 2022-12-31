import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    history: JSON.parse(localStorage.getItem("history")).history || [],
  },
  reducers: {
    addHistory: (state, action) => {
      let temp = state.history;
      temp.push(action.payload);
      state.history = temp;
    },
  },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
