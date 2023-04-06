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
        setSemesterReducer: (state, action) => {
            state.semesterList = action.payload;
            state.isSemestersFetched = false;
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
    setSemesterReducer,
    resetSemesterReducer,
    setSelectedSemesterReducer,
    resetSelectedSemesterReducer,
    addToSelectedSemesterReducer,
    removeFromSelectedSemesterReducer,
} = semesterSlice.actions;

export default semesterSlice.reducer;
