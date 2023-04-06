import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groupList: [],
    isGroupsFetched: true,
};

const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        setGroupsReducer: (state, action) => {
            state.groupList = action.payload;
            state.isGroupsFetched = false;
        },
        resetGroupsReducer: (state) => {
            state.isGroupsFetched = true;
            state.groupList = [];
        },
    },
});

export const { setGroupsReducer, resetGroupsReducer } = groupSlice.actions;

export default groupSlice.reducer;
