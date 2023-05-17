import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    noColor: false,
};

const timetableSlice = createSlice({
    name: "timetable",
    initialState,
    reducers: {
        toggleNoColorReducer: (state) => {
            state.noColor = !state.noColor;
        },
    },
});

export const { toggleNoColorReducer } = timetableSlice.actions;

export default timetableSlice.reducer;
