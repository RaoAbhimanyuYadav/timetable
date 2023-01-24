import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  dataFetched: false,
};

const authSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    setUserReducer: (state, action) => {
      state.user = action.payload;
    },
    setDataFetchedReducer: (state, action) => {
      state.dataFetched = action.payload;
    },
  },
});

export const { setUserReducer, setDataFetchedReducer } = authSlice.actions;

export default authSlice.reducer;
