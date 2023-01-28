import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subjectList: [],
    isSubjectsFetched: false,
};

const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        addSubjectReducer: (state, action) => {
            state.subjectList.push(action.payload);
        },
        setSubjectReducer: (state, action) => {
            state.subjectList = action.payload;
            state.isSubjectsFetched = true;
        },
        updateSubjectReducer: (state, action) => {
            const index = state.subjectList.findIndex(
                (sub) => sub.id === action.payload.id
            );
            state.subjectList.splice(index, 1, action.payload);
        },
        deleteSubjectReducer: (state, action) => {
            const index = state.subjectList.findIndex(
                (sub) => sub.id === action.payload.id
            );
            state.subjectList.splice(index, 1);
        },
        resetSubjectReducer: (state) => {
            state.isSubjectsFetched = false;
            state.subjectList = [];
        },
    },
});

export const {
    addSubjectReducer,
    setSubjectReducer,
    updateSubjectReducer,
    deleteSubjectReducer,
    resetSubjectReducer,
} = subjectSlice.actions;

export default subjectSlice.reducer;
