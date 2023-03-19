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
            // groups arranged according to semester
            if (payload.key === "semester_group") {
                const list = [];
                state.semester.forEach((sem) => {
                    payload.id.forEach((grp) => {
                        const idx = sem.semester_group_set.findIndex(
                            (g) => g.id === grp.id
                        );
                        if (idx !== -1) list.push(sem.semester_group_set[idx]);
                    });
                });
                state.semester_group = list;
            }

            if (payload.key === "semester") {
                state.semester_group = new Array(
                    payload.groupData.length || 1
                ).fill({ id: "" });
                state.groupList = payload.groupData || [];
            }
        },
        addToLessonAssignmentReducer: (state, action) => {
            const OBJ = { id: "" };
            state[action.payload.key].push(OBJ);
            if (action.payload.key === "semester") {
                state.semester_group.push(OBJ);
            }
        },
        updateInLessonAssignmentReducer: (state, action) => {
            const key = action.payload.key;
            const i = action.payload.i;
            const val = action.payload.value;

            state[key].splice(i, 1, val);

            if (key === "semester") {
                state.semester_group.splice(i, 1, { id: "" });
                state.groupList.splice(i, 1, action.payload.groups);
            }
        },
        deleteFromLessonAssignmentReducer: (state, action) => {
            const key = action.payload.key;
            const i = action.payload.i;

            state[key].splice(i, 1);
            if (key === "semester") {
                state.semester_group.splice(i, 1);
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
            const idx = action.payload.teacher.findIndex(
                (t) => t.id === state.teacherId
            );
            if (idx !== -1) state.lessonList.push(action.payload);
        },
        setLessonReducer: (state, action) => {
            state.lessonList = action.payload;
        },
        updateLessonReducer: (state, action) => {
            const index = state.lessonList.findIndex(
                (les) => les.id === action.payload.id
            );
            const tInd = action.payload.teacher.findIndex(
                (t) => t.id === state.teacherId
            );
            if (tInd === -1) {
                state.lessonList.splice(index, 1);
            } else state.lessonList.splice(index, 1, action.payload);
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
    addToLessonAssignmentReducer,
    updateInLessonAssignmentReducer,
    deleteFromLessonAssignmentReducer,
    resetLessonAssignmentReducer,
    addLessonReducer,
    setLessonReducer,
    updateLessonReducer,
    deleteLessonReducer,
    resetLessonReducer,
} = subjectSlice.actions;

export default subjectSlice.reducer;
