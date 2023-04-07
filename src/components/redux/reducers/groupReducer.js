import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groupList: [],
    isGroupsFetched: true,
    selectedGroups: [],
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
        setSelectedGroups: (state, action) => {
            state.selectedGroups = action.payload;
        },
        pushInSelectedGroupsReducer: (state, action) => {
            state.selectedGroups.push(action.payload);
        },
        deleteInSelectedGroupsReducer: (state, action) => {
            state.selectedGroups = state.selectedGroups.splice(
                action.payload,
                1
            );
        },
        resetSelectedGroupsReducer: (state) => {
            state.selectedGroups = [];
        },
        updateInSelectedGroupsReducer: (state, action) => {
            const val = state.groupList.find(
                (grp) => grp.id === action.payload.id
            );
            state.selectedGroups.splice(action.payload.index, 1, val);
        },
    },
});

export const {
    setGroupsReducer,
    resetGroupsReducer,
    setSelectedGroups,
    pushInSelectedGroupsReducer,
    deleteInSelectedGroupsReducer,
    resetSelectedGroupsReducer,
    updateInSelectedGroupsReducer,
} = groupSlice.actions;

export default groupSlice.reducer;
