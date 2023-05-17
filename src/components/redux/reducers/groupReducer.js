import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groupList: [],
    selectedGroups: [{ id: "" }],
};

const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        setGroupsReducer: (state, action) => {
            state.groupList = action.payload;
        },
        resetGroupsReducer: (state) => {
            state.groupList = [];
        },
        setSelectedGroups: (state, action) => {
            state.selectedGroups = action.payload;
        },
        pushInSelectedGroupsReducer: (state) => {
            state.selectedGroups.push({ id: "" });
        },
        deleteInSelectedGroupsReducer: (state, action) => {
            state.selectedGroups = state.selectedGroups
                .map((grp, i) => (action.payload === i ? null : grp))
                .filter((grp) => grp !== null);
        },
        resetSelectedGroupsReducer: (state) => {
            state.selectedGroups = [{ id: "" }];
        },
        updateInSelectedGroupsReducer: (state, action) => {
            const val = state.groupList.find(
                (grp) => grp.id === action.payload.id
            );
            state.selectedGroups = state.selectedGroups.map((grp, i) =>
                i === action.payload.index ? val : grp
            );
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
