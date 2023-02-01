import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    classroomList: [],
    isClassroomsFetched: true,
};

const classroomSlice = createSlice({
    name: "classroom",
    initialState,
    reducers: {
        addClassroomReducer: (state, action) => {
            state.classroomList.push(action.payload);
        },
        setClassroomReducer: (state, action) => {
            state.classroomList = action.payload;
            state.isClassroomsFetched = false;
        },
        updateClassroomReducer: (state, action) => {
            const index = state.classroomList.findIndex(
                (sub) => sub.id === action.payload.id
            );
            state.classroomList.splice(index, 1, action.payload);
        },
        deleteClassroomReducer: (state, action) => {
            const index = state.classroomList.findIndex(
                (sub) => sub.id === action.payload.id
            );
            state.classroomList.splice(index, 1);
        },
        resetClassroomReducer: (state) => {
            state.classroomList = [];
            state.isClassroomsFetched = true;
        },
    },
});

export const {
    addClassroomReducer,
    setClassroomReducer,
    updateClassroomReducer,
    deleteClassroomReducer,
    resetClassroomReducer,
} = classroomSlice.actions;

export default classroomSlice.reducer;
