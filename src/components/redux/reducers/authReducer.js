import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
};

const authSlice = createSlice({
    name: "classroom",
    initialState,
    reducers: {
        setAccessTokenReducer: (state, action) => {
            state.accessToken = action.payload;
        },
    },
});

export const { setAccessTokenReducer } = authSlice.actions;

export default authSlice.reducer;
