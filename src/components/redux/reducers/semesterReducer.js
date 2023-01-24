import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  semesterList: [],
  isSemestersFetched: false,
};

const semesterSlice = createSlice({
  name: "semester",
  initialState,
  reducers: {
    addSemesterReducer: (state, action) => {
      state.semesterList.push(action.payload);
    },
    setSemesterReducer: (state, action) => {
      state.semesterList = action.payload;
      state.isSemestersFetched = true;
    },
    updateSemesterReducer: (state, action) => {
      const index = state.semesterList.findIndex(
        (sem) => sem.id === action.payload.oldData.id
      );
      state.semesterList.splice(index, 1, action.payload.newData);
    },
    deleteSemesterReducer: (state, action) => {
      const index = state.semesterList.findIndex(
        (sem) => sem.id === action.payload.id
      );
      state.semesterList.splice(index, 1);
    },
  },
});

export const {
  addSemesterReducer,
  setSemesterReducer,
  updateSemesterReducer,
  deleteSemesterReducer,
} = semesterSlice.actions;

export default semesterSlice.reducer;
