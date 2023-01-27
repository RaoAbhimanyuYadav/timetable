import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teacher: "",
    subject: "",
    classroom: "",
    semester: "",
    groupList: [],
    semester_group: "",
    lessonList: [],
    isLessonsFetched: false,
};

const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        setLessonAssignmentReducer: (state, action) => {
            const payload = action.payload;
            state[payload.key] = payload.id;
            if (payload.key === "semester") {
                state.semester_group = "";
                state.groupList = payload.groupData || [];
            }
        },
        resetLessonAssignmentReducer: (state, action) => {
            const payload = action.payload;
            state[payload.key] = "";
            if (payload.key === "semester") {
                state.semester_group = "";
                state.groupList = [];
            }
        },
        addLessonReducer: (state, action) => {
            state.lessonList.push(action.payload);
        },
        setLessonReducer: (state, action) => {
            state.lessonList = action.payload;
            state.isLessonsFetched = true;
        },
        updateLessonReducer: (state, action) => {
            const index = state.lessonList.findIndex(
                (les) => les.id === action.payload.id
            );
            state.lessonList.splice(index, 1, action.payload);
        },
        deleteLessonReducer: (state, action) => {
            const index = state.lessonList.findIndex(
                (les) => les.id === action.payload.id
            );
            state.lessonList.splice(index, 1);
        },
    },
});

export const {
    setLessonAssignmentReducer,
    resetLessonAssignmentReducer,
    addLessonReducer,
    setLessonReducer,
    updateLessonReducer,
    deleteLessonReducer,
} = subjectSlice.actions;

export default subjectSlice.reducer;
