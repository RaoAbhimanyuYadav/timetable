import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teacherList: [],
    isTeachersFetched: true,
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
            state.isTeachersFetched = false;
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
        resetTeacherReducer: (state) => {
            state.isTeachersFetched = true;
            state.teacherList = [];
        },
        addTeacherLessonReducer: (state, action) => {
            const data = action.payload;
            const index = state.teacherList.findIndex(
                (t) => t.id === data.teacher
            );
            state.teacherList[index].lesson_set.push(data);
        },
        updateTeacherLessonReducer: (state, action) => {
            const data = action.payload;
            const index = state.teacherList.findIndex(
                (t) => t.id === data.teacher
            );
            const teacher = state.teacherList[index];
            const lesInd = teacher.lesson_set.findIndex(
                (les) => les.id === data.id
            );
            state.teacherList[index].lesson_set.splice(lesInd, 1, data);
        },
        deleteTeacherLessonReducer: (state, action) => {
            const data = action.payload;
            const index = state.teacherList.findIndex(
                (t) => t.id === data.teacher
            );
            const teacher = state.teacherList[index];
            const lesInd = teacher.lesson_set.findIndex(
                (les) => les.id === data.id
            );
            state.teacherList[index].lesson_set.splice(lesInd, 1);
        },
    },
});

export const {
    addTeacherReducer,
    setTeacherReducer,
    updateTeacherReducer,
    deleteTeacherReducer,
    resetTeacherReducer,
    addTeacherLessonReducer,
    updateTeacherLessonReducer,
    deleteTeacherLessonReducer,
} = teacherSlice.actions;

export default teacherSlice.reducer;
