import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teacherList: [],
    isTeachersFetched: true,
    selectedTeachersList: [{ id: "" }],
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

        setSelectedTeachersListReducer: (state, action) => {
            state.selectedTeachersList = action.payload;
        },
        resetSelectedTeachersListReducer: (state) => {
            state.selectedTeachersList = [{ id: "" }];
        },
        pushInSelectedTeachersListReducer: (state) => {
            state.selectedTeachersList.push({ id: "" });
        },
        deleteInSelectedTeachersListReducer: (state, action) => {
            state.selectedTeachersList = state.selectedTeachersList
                .map((tchr, i) => (action.payload === i ? null : tchr))
                .filter((tchr) => tchr !== null);
        },
        updateInSelectedTeachersListReducer: (state, action) => {
            const val = state.teacherList.find(
                (tchr) => tchr.id === action.payload.id
            );
            state.selectedTeachersList = state.selectedTeachersList.map(
                (tchr, i) => (i === action.payload.index ? val : tchr)
            );
        },
    },
});

export const {
    setTeacherReducer,
    resetTeacherReducer,
    setSelectedTeachersListReducer,
    resetSelectedTeachersListReducer,
    pushInSelectedTeachersListReducer,
    deleteInSelectedTeachersListReducer,
    updateInSelectedTeachersListReducer,
} = teacherSlice.actions;

export default teacherSlice.reducer;
