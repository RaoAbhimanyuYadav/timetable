import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeOffList: [],
  subjectList: [],
  isSubjectsFetched: false,
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
    addSubjectReducer: (state, action) => {
      state.subjectList.push(action.payload);
    },
    setSubjectReducer: (state, action) => {
      state.subjectList = action.payload;
      state.isSubjectsFetched = true;
    },
    updateSubjectReducer: (state, action) => {
      const index = state.subjectList.findIndex(
        (sub) => sub.id === action.payload.id
      );
      state.subjectList.splice(index, 1, action.payload);
    },
    deleteSubjectReducer: (state, action) => {
      const index = state.subjectList.findIndex(
        (sub) => sub.id === action.payload.id
      );
      state.subjectList.splice(index, 1);
    },
  },
});

export const {
  addTimeOffReducer,
  clearTimeOffReducer,
  removeFromTimeOffReducer,
  setTimeOffReducer,
  addSubjectReducer,
  setSubjectReducer,
  updateSubjectReducer,
  deleteSubjectReducer,
} = subjectSlice.actions;

export default subjectSlice.reducer;
