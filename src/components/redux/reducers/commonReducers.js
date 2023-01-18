import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeOffList: [],
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    addTimeOffReducer: (state, action) => {
      state.timeOffList.push(action.payload);
    },
    clearTimeOffReducer: (state) => {
      state.timeOffList = [];
    },
    removeFromTimeOffReducer: (state, action) => {
      state.timeOffList.splice(action.payload, 1);
    },
    setTimeOffReducer: (state, action) => {
      state.timeOffList = action.payload;
    },
  },
});

export const {
  addTimeOffReducer,
  clearTimeOffReducer,
  removeFromTimeOffReducer,
  setTimeOffReducer,
} = subjectSlice.actions;

export default subjectSlice.reducer;
