import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teacherList: [],
    isTeachersFetched: true,
};

const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {
        setTeacherReducer: (state, action) => {
            state.teacherList = action.payload;
            state.isTeachersFetched = false;
        },

        resetTeacherReducer: (state) => {
            state.isTeachersFetched = true;
            state.teacherList = [];
        },
    },
});

export const { setTeacherReducer, resetTeacherReducer } = teacherSlice.actions;

export default teacherSlice.reducer;
