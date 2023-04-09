import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    semesterList: [],
    isSemestersFetched: true,
    selectedSemGrps: [{ semester: { id: "" }, group: { id: "" } }],
};

const semesterSlice = createSlice({
    name: "semester",
    initialState,
    reducers: {
        setSemesterReducer: (state, action) => {
            state.semesterList = action.payload;
            state.isSemestersFetched = false;
        },

        resetSemesterReducer: (state) => {
            state.isSemestersFetched = true;
            state.semesterList = [];
        },
        setSelectedSemGrpsReducer: (state, action) => {
            state.selectedSemGrps = action.payload;
        },
        resetSelectedSemGrpsReducer: (state) => {
            state.selectedSemGrps = [
                { semester: { id: "" }, group: { id: "" } },
            ];
        },
        pushInSelectedSemGrpsReducer: (state) => {
            state.selectedSemGrps.push({
                semester: { id: "" },
                group: { id: "" },
            });
        },
        deleteInSelectedSemGrpssReducer: (state, action) => {
            state.selectedSemGrps = state.selectedSemGrps
                .map((semGrp, i) => (action.payload === i ? null : semGrp))
                .filter((semGrp) => semGrp !== null);
        },
        updateInSelectedSemGrpsReducer: (state, action) => {
            const { index, key, data } = action.payload;

            state.selectedSemGrps = state.selectedSemGrps.map((semGrp, i) => {
                if (i === index) {
                    let sem = { ...semGrp.semester };
                    let grp = { ...semGrp.group };
                    if (key === "semester") {
                        sem = { ...data };
                    } else grp = { ...data };
                    return { semester: sem, group: grp };
                }
                return semGrp;
            });
        },
    },
});

export const {
    setSemesterReducer,
    resetSemesterReducer,
    setSelectedSemGrpsReducer,
    resetSelectedSemGrpsReducer,
    pushInSelectedSemGrpsReducer,
    deleteInSelectedSemGrpssReducer,
    updateInSelectedSemGrpsReducer,
} = semesterSlice.actions;

export default semesterSlice.reducer;
