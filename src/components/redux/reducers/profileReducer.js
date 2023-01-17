import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBellTimingsFetched: false,
  isWorkingDaysFetched: false,
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
      const orderedTiming = action.payload.sort((a, b) => +a.name > +b.name);
      state.bellTimings = orderedTiming;
      state.isBellTimingsFetched = true;
    },
    addTimingReducer: (state, action) => {
      state.bellTimings.push(action.payload);
      state.bellTimings.sort((a, b) => +a.name > +b.name);
    },
    updateTimingReducer: (state, action) => {
      const index = state.bellTimings.findIndex((obj) => {
        return obj.id === action.payload.id;
      });
      state.bellTimings.splice(index, 1, action.payload);
      state.bellTimings.sort((a, b) => +a.name > +b.name);
    },
    deleteTimingReducer: (state, action) => {
      const index = state.bellTimings.findIndex((obj) => {
        return obj.id === action.payload.id;
      });
      state.bellTimings.splice(index, 1);
    },
    addWorkingDayReducer: (state, action) => {
      state.workingDays.push(action.payload);
      state.workingDays.sort((a, b) => days[a.name] > days[b.name]);
    },
    setWorkingDaysReducer: (state, action) => {
      const orderedWorkingDays = action.payload.sort(
        (a, b) => days[a.name] > days[b.name]
      );
      state.workingDays = orderedWorkingDays;
      state.isWorkingDaysFetched = true;
    },
    updateWorkingDayReducer: (state, action) => {
      const index = state.workingDays.findIndex((obj) => {
        return obj.id === action.payload.id;
      });
      state.workingDays.splice(index, 1, action.payload);
      state.workingDays.sort((a, b) => days[a.name] > days[b.name]);
    },
    deleteWorkingDayReducer: (state, action) => {
      const index = state.workingDays.findIndex((obj) => {
        return obj.id === action.payload.id;
      });
      state.workingDays.splice(index, 1);
    },
  },
});

export const {
  setProfileReducer,
  setTimingReducer,
  addTimingReducer,
  updateTimingReducer,
  deleteTimingReducer,
  addWorkingDayReducer,
  setWorkingDaysReducer,
  updateWorkingDayReducer,
  deleteWorkingDayReducer,
} = profileSlice.actions;

export default profileSlice.reducer;
