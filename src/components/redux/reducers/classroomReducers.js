import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    classroomList: [],
    selectedClassroom: { id: "" },
};

const classroomSlice = createSlice({
    name: "classroom",
    initialState,
    reducers: {
        setClassroomReducer: (state, action) => {
            state.classroomList = action.payload;
        },

        resetClassroomReducer: (state) => {
            state.classroomList = [];
        },
        setSelectedClassroomReducer: (state, action) => {
            state.selectedClassroom = state.classroomList.find(
                (cls) => cls.id === action.payload
            ) || { id: "" };
        },
    },
});

export const {
    setClassroomReducer,
    resetClassroomReducer,
    setSelectedClassroomReducer,
} = classroomSlice.actions;

export default classroomSlice.reducer;
