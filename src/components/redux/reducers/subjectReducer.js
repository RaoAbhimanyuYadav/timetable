import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subjectList: [],
    isSubjectsFetched: true,
};

const sortSubjects = (state) => {
    return state.subjectList.sort((a, b) => a.code > b.code);
};

const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        addSubjectReducer: (state, action) => {
            state.subjectList.push(action.payload);
            state.subjectList = sortSubjects(state);
        },
        setSubjectReducer: (state, action) => {
            state.subjectList = action.payload;
            state.isSubjectsFetched = false;
            state.subjectList = sortSubjects(state);
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
            state.isSubjectsFetched = true;
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
