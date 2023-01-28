import { createSlice } from "@reduxjs/toolkit";

let his = []

if (JSON.parse(localStorage.getItem("history")) !== null) {
  his = JSON.parse(localStorage.getItem("history")).history
}

export const historySlice = createSlice({
  name: "history",
  initialState: {
    history: his,
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
