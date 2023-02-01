import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    semesterList: [],
    isSemestersFetched: true,
    selectedSemesters: [],
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
            state.isSemestersFetched = false;
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
            state.isSemestersFetched = true;
            state.semesterList = [];
        },
        setSelectedSemesterReducer: (state, action) => {
            state.selectedSemesters = action.payload;
        },
        resetSelectedSemesterReducer: (state) => {
            state.selectedSemesters = [];
        },
        addToSelectedSemesterReducer: (state, action) => {
            state.selectedSemesters.push(action.payload);
        },
        removeFromSelectedSemesterReducer: (state, action) => {
            state.selectedSemesters = state.selectedSemesters.filter(
                (sem) => sem.id !== action.payload
            );
        },
    },
});

export const {
    addSemesterReducer,
    setSemesterReducer,
    updateSemesterReducer,
    deleteSemesterReducer,
    resetSemesterReducer,
    setSelectedSemesterReducer,
    resetSelectedSemesterReducer,
    addToSelectedSemesterReducer,
    removeFromSelectedSemesterReducer,
} = semesterSlice.actions;

export default semesterSlice.reducer;
