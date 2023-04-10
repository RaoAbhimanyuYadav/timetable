import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nameOfOrganisation: "NITH",
    academicYear: "2022-23",
    bellTimings: [],
    workingDays: [],
};

const days = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thrusday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setProfileReducer: (state, action) => {
            const { nameOfOrganisation, academicYear } = action.payload[0];
            state.nameOfOrganisation = nameOfOrganisation;
            state.academicYear = academicYear;
        },
        setTimingReducer: (state, action) => {
            const orderedTiming = action.payload.sort(
                (a, b) => +a.name > +b.name
            );
            state.bellTimings = orderedTiming;
        },
        setWorkingDaysReducer: (state, action) => {
            const orderedWorkingDays = action.payload.sort(
                (a, b) => days[a.name] > days[b.name]
            );
            state.workingDays = orderedWorkingDays;
        },
        resetProfileReducer: (state) => {
            state.bellTimings = [];
            state.workingDays = [];
        },
    },
});

export const {
    setProfileReducer,
    setTimingReducer,
    setWorkingDaysReducer,
    resetProfileReducer,
} = profileSlice.actions;

export default profileSlice.reducer;
