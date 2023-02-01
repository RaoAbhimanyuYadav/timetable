import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataFetched: true,
    accessToken: null,
};

const authSlice = createSlice({
    name: "classroom",
    initialState,
    reducers: {
        setDataFetchedReducer: (state, action) => {
            state.dataFetched = action.payload;
        },
        setAccessTokenReducer: (state, action) => {
            state.accessToken = action.payload;
        },
    },
});

export const { setDataFetchedReducer, setAccessTokenReducer } =
    authSlice.actions;

export default authSlice.reducer;
