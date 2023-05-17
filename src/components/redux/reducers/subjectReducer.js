import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subjectList: [],
    selectedSubject: { id: "" },
};

const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        setSubjectReducer: (state, action) => {
            state.subjectList = action.payload;
        },

        resetSubjectReducer: (state) => {
            state.subjectList = [];
        },

        setSelectedSubjectReducer: (state, action) => {
            state.selectedSubject = state.subjectList.find(
                (sub) => sub.id === action.payload
            ) || { id: "" };
        },
    },
});

export const {
    setSubjectReducer,
    resetSubjectReducer,
    setSelectedSubjectReducer,
} = subjectSlice.actions;

export default subjectSlice.reducer;
