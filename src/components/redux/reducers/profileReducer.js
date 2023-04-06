import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isBellTimingsFetched: true,
    isWorkingDaysFetched: true,
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
            state.isBellTimingsFetched = false;
        },
        setWorkingDaysReducer: (state, action) => {
            const orderedWorkingDays = action.payload.sort(
                (a, b) => days[a.name] > days[b.name]
            );
            state.workingDays = orderedWorkingDays;
            state.isWorkingDaysFetched = false;
        },
        resetProfileReducer: (state) => {
            state.isBellTimingsFetched = true;
            state.isWorkingDaysFetched = true;
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
