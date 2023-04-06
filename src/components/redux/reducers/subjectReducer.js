import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subjectList: [],
    isSubjectsFetched: true,
};

const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        setSubjectReducer: (state, action) => {
            state.subjectList = action.payload;
            state.isSubjectsFetched = false;
        },

        resetSubjectReducer: (state) => {
            state.isSubjectsFetched = true;
            state.subjectList = [];
        },
    },
});

export const { setSubjectReducer, resetSubjectReducer } = subjectSlice.actions;

export default subjectSlice.reducer;
