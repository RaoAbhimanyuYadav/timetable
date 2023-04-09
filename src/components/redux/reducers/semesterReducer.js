import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    semesterList: [],
    isSemestersFetched: true,
    selectedSemGrps: [{ semester: { id: "" }, group: { id: "" } }],
    groupsAvailable: [[]],
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
            state.groupsAvailable = action.payload.map(
                (semGrp) => semGrp.semester.groups
            );
        },
        resetSelectedSemGrpsReducer: (state) => {
            state.selectedSemGrps = [
                { semester: { id: "" }, group: { id: "" } },
            ];
            state.groupsAvailable = [[]];
        },
        pushInSelectedSemGrpsReducer: (state) => {
            state.selectedSemGrps.push({
                semester: { id: "" },
                group: { id: "" },
            });
            state.groupsAvailable.push([]);
        },
        deleteInSelectedSemGrpssReducer: (state, action) => {
            state.selectedSemGrps = state.selectedSemGrps
                .map((semGrp, i) => (action.payload === i ? null : semGrp))
                .filter((semGrp) => semGrp !== null);
            state.groupsAvailable = state.groupsAvailable
                .map((grps, i) => (i === action.payload ? null : grps))
                .filter((grps) => grps !== null);
        },
        updateInSelectedSemGrpsReducer: (state, action) => {
            const { index, key, id } = action.payload;

            state.selectedSemGrps = state.selectedSemGrps.map((semGrp, i) => {
                if (i === index) {
                    let sem = { ...semGrp.semester };
                    let grp = { ...semGrp.group };
                    if (key === "semester") {
                        sem = state.semesterList.find((sem) => sem.id === id);
                        grp = { id: "" };
                        state.groupsAvailable = state.groupsAvailable.map(
                            (grps, i) => (i === index ? sem.groups : grps)
                        );
                    } else
                        grp = state.groupsAvailable[index].find(
                            (grp) => grp.id === id
                        );
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
