import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teacherList: [],
  isTeachersFetched: false,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    addTeacherReducer: (state, action) => {
      state.teacherList.push(action.payload);
    },
    setTeacherReducer: (state, action) => {
      state.teacherList = action.payload;
      state.isTeachersFetched = true;
    },
    updateTeacherReducer: (state, action) => {
      const index = state.teacherList.findIndex(
        (sub) => sub.id === action.payload.id
      );
      state.teacherList.splice(index, 1, action.payload);
    },
    deleteTeacherReducer: (state, action) => {
      const index = state.teacherList.findIndex(
        (sub) => sub.id === action.payload.id
      );
      state.teacherList.splice(index, 1);
    },
  },
});

export const {
  addTeacherReducer,
  setTeacherReducer,
  updateTeacherReducer,
  deleteTeacherReducer,
} = teacherSlice.actions;

export default teacherSlice.reducer;
