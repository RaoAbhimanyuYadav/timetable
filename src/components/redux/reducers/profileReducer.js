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
      state.bellTimings = action.payload;
    },
    addTimingReducer: (state, action) => {
      state.bellTimings.push(action.payload);
    },
    updateTimingReducer: (state, action) => {
      const index = state.bellTimings.findIndex((obj) => {
        return obj.id === action.payload.id;
      });
      state.bellTimings.splice(index, 1, action.payload);
    },
  },
});

export const {
  setProfileReducer,
  setTimingReducer,
  addTimingReducer,
  updateTimingReducer,
} = profileSlice.actions;

export default profileSlice.reducer;
