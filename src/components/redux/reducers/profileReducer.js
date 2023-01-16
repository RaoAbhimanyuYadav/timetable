import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nameOfOrganisation: "NITH",
  academicYear: "2022-23",
  bellTimings: [],
  workingDays: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setProfileReducer: (state, action) => {
      const { nameOfOrganisation, academicYear, workingDays } =
        action.payload[0];
      state.nameOfOrganisation = nameOfOrganisation;
      state.academicYear = academicYear;
      state.workingDays = workingDays;
    },
    setTimingReducer: (state, action) => {
      const orderedTiming = action.payload.sort((a, b) => +a.name > +b.name);
      state.bellTimings = orderedTiming;
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
  },
});

export const {
  setProfileReducer,
  setTimingReducer,
  addTimingReducer,
  updateTimingReducer,
  deleteTimingReducer,
} = profileSlice.actions;

export default profileSlice.reducer;
