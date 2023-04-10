import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeOffList: [],
};

const timeOffsSlice = createSlice({
    name: "timeOffs",
    initialState,
    reducers: {
        setTimeOffsReducer: (state, action) => {
            state.timeOffList = action.payload;
        },
        resetTimeOffsReducer: (state) => {
            state.timeOffList = [];
        },
    },
});

export const { setTimeOffsReducer, resetTimeOffsReducer } =
    timeOffsSlice.actions;

export default timeOffsSlice.reducer;
