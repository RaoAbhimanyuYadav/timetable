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
    setProfile: (state, action) => {
      state.nameOfOrganisation = "asdjk";
      console.log(action.payload);
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
