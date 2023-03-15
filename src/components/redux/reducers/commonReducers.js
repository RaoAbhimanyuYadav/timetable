import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeOffList: [],
    selectedColor: "#000000",
    groupList: [{ name: "Whole", code: "W" }],
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
            const data = action.payload;
            const index = state.timeOffList.findIndex(
                (timeOff) =>
                    timeOff.bell_timing.id === data.bell_timing.id &&
                    timeOff.working_day.id === data.working_day.id
            );
            state.timeOffList.splice(index, 1);
        },
        setTimeOffReducer: (state, action) => {
            state.timeOffList = action.payload;
        },
        setSelectedColorReducer: (state, action) => {
            state.selectedColor = action.payload;
        },
        addGroupReducer: (state, action) => {
            state.groupList.push(action.payload);
        },
        clearGroupReducer: (state) => {
            state.groupList = [{ name: "Whole", code: "W" }];
        },
        removeFromGroupReducer: (state, action) => {
            if (action.payload !== 0) state.groupList.splice(action.payload, 1);
        },
        setGroupListReducer: (state, action) => {
            state.groupList = action.payload;
        },
    },
});

export const {
    addTimeOffReducer,
    clearTimeOffReducer,
    removeFromTimeOffReducer,
    setTimeOffReducer,
    setSelectedColorReducer,
    addGroupReducer,
    clearGroupReducer,
    removeFromGroupReducer,
    setGroupListReducer,
} = subjectSlice.actions;

export default subjectSlice.reducer;
