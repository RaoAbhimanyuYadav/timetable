import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    setUserReducer: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserReducer } = authSlice.actions;

export default authSlice.reducer;
