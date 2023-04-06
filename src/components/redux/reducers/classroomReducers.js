import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    classroomList: [],
    isClassroomsFetched: true,
};

const classroomSlice = createSlice({
    name: "classroom",
    initialState,
    reducers: {
        setClassroomReducer: (state, action) => {
            state.classroomList = action.payload;
            state.isClassroomsFetched = false;
        },

        resetClassroomReducer: (state) => {
            state.classroomList = [];
            state.isClassroomsFetched = true;
        },
    },
});

export const { setClassroomReducer, resetClassroomReducer } =
    classroomSlice.actions;

export default classroomSlice.reducer;
