import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeOffList: [],
    selectedColor: "#000000",
};

const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        addTimeOffReducer: (state, action) => {
            state.timeOffList.push(action.payload);
        },
        clearTimeOffReducer: (state) => {
            state.timeOffList = [];
        },
        removeFromTimeOffReducer: (state, action) => {
            console.log(action);
            const data = action.payload;
            state.timeOffList = state.timeOffList
                .map((timeOff) =>
                    timeOff.bell_timing.id === data.bell_timing.id &&
                    timeOff.working_day.id === data.working_day.id
                        ? null
                        : timeOff
                )
                .filter((tOff) => tOff !== null);
        },
        setTimeOffReducer: (state, action) => {
            state.timeOffList = action.payload;
        },
        setSelectedColorReducer: (state, action) => {
            state.selectedColor = action.payload;
        },
    },
});

export const {
    addTimeOffReducer,
    clearTimeOffReducer,
    removeFromTimeOffReducer,
    setTimeOffReducer,
    setSelectedColorReducer,
} = subjectSlice.actions;

export default subjectSlice.reducer;
