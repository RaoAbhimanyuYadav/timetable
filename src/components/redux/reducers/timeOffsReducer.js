import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeOffList: [],
    isTimeOffFetched: true,
};

const timeOffsSlice = createSlice({
    name: "timeOffs",
    initialState,
    reducers: {
        setTimeOffsReducer: (state, action) => {
            state.timeOffList = action.payload;
            state.isTimeOffFetched = false;
        },
        resetTimeOffsReducer: (state) => {
            state.isTimeOffFetched = true;
            state.timeOffList = [];
        },
    },
});

export const { setTimeOffsReducer, resetTimeOffsReducer } =
    timeOffsSlice.actions;

export default timeOffsSlice.reducer;
