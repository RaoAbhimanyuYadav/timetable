import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savedList: [],
    selectedSavedTimetableId: null,
};

const savedTimetableSlice = createSlice({
    name: "savedTimetable",
    initialState,
    reducers: {
        setSavedTimetableReducer: (state, action) => {
            state.savedList = action.payload;
        },
        resetSavedTimetableReducer: (state) => {
            state.savedList = [];
            state.selectedSavedTimetableId = null;
        },
        setSelectedSavedTimetableIdReducer: (state, action) => {
            state.selectedSavedTimetableId = action.payload;
        },
    },
});

export const {
    setSavedTimetableReducer,
    resetSavedTimetableReducer,
    setSelectedSavedTimetableIdReducer,
} = savedTimetableSlice.actions;

export default savedTimetableSlice.reducer;
