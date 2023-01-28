import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    semesterList: [],
    isSemestersFetched: false,
};

const semesterSlice = createSlice({
    name: "semester",
    initialState,
    reducers: {
        addSemesterReducer: (state, action) => {
            state.semesterList.push(action.payload);
        },
        setSemesterReducer: (state, action) => {
            state.semesterList = action.payload;
            state.isSemestersFetched = true;
        },
        updateSemesterReducer: (state, action) => {
            const index = state.semesterList.findIndex(
                (sem) => sem.id === action.payload.id
            );
            state.semesterList.splice(index, 1, action.payload);
        },
        deleteSemesterReducer: (state, action) => {
            const index = state.semesterList.findIndex(
                (sem) => sem.id === action.payload.id
            );
            state.semesterList.splice(index, 1);
        },
        resetSemesterReducer: (state) => {
            state.isSemestersFetched = false;
            state.semesterList = [];
        },
    },
});

export const {
    addSemesterReducer,
    setSemesterReducer,
    updateSemesterReducer,
    deleteSemesterReducer,
    resetSemesterReducer,
} = semesterSlice.actions;

export default semesterSlice.reducer;
