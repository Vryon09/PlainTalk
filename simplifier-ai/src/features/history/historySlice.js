import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prevExplained: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addExplained(state, action) {
      state.prevExplained.push(action.payload);
    },
  },
});

export const { addExplained } = historySlice.actions;
export default historySlice.reducer;

export const getPrevExplained = (state) => state.history.prevExplained;
