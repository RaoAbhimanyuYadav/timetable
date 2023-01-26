import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeOffList: [],
  selectedColor: "#000000",
  groupList: [{ name: "Whole", code: "W" }],
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
    setSelectedColorReducer: (state, action) => {
      state.selectedColor = action.payload;
    },
    addGroupReducer: (state, action) => {
      state.groupList.push(action.payload);
    },
    clearGroupReducer: (state) => {
      state.groupList = [{ name: "Whole", code: "W" }];
    },
    removeFromGroupReducer: (state, action) => {
      if (action.payload !== 0) state.groupList.splice(action.payload, 1);
    },
    setGroupListReducer: (state, action) => {
      state.groupList = action.payload;
    },
  },
});

export const {
  addTimeOffReducer,
  clearTimeOffReducer,
  removeFromTimeOffReducer,
  setTimeOffReducer,
  setSelectedColorReducer,
  addGroupReducer,
  clearGroupReducer,
  removeFromGroupReducer,
  setGroupListReducer,
} = subjectSlice.actions;

export default subjectSlice.reducer;
