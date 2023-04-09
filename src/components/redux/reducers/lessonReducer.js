import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedTeacher: { id: "" },
    lessonList: [],
};

const lessonSlice = createSlice({
    name: "lesson",
    initialState,
    reducers: {
        setSelectedTeacherReducer: (state, action) => {
            state.selectedTeacher = action.payload;
        },
        resetSelectedTeacherReducer: (state) => {
            state.selectedTeacher = { id: "" };
        },
        setLessonReducer: (state, action) => {
            state.lessonList = action.payload;
        },
        resetLessonReducer: (state) => {
            state.lessonList = [];
        },
    },
});

export const {
    setLessonReducer,
    resetLessonReducer,
    setSelectedTeacherReducer,
    resetSelectedTeacherReducer,
} = lessonSlice.actions;

export default lessonSlice.reducer;
