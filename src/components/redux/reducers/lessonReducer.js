import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teacherId: "",
    subject: "",
    classroom: "",
    teacher: [{ id: "" }],
    semester: [{ id: "" }],
    semester_group: [{ id: "" }],
    groupList: [],
    lessonList: [],
};

const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        setLessonAssignmentReducer: (state, action) => {
            const payload = action.payload;
            state[payload.key] = payload.id;
            if (payload.key === "semester") {
                state.semester_group = new Array(
                    payload.groupData.length || 1
                ).fill({ id: "" });
                state.groupList = payload.groupData || [];
            }
        },
        resetLessonAssignmentReducer: (state, action) => {
            const payload = action.payload;
            state[payload.key] = payload.value;
            if (payload.key === "semester") {
                state.semester_group = [{ id: "" }];
                state.groupList = [];
            }
        },
        addLessonReducer: (state, action) => {
            state.lessonList.push(action.payload);
        },
        setLessonReducer: (state, action) => {
            state.lessonList = action.payload;
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
        resetLessonReducer: (state) => {
            state.lessonList = [];
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
    resetLessonReducer,
} = subjectSlice.actions;

export default subjectSlice.reducer;
