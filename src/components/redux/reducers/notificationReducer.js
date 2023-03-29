import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    severity: "success",
    open: false,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotificationReducer: (state, action) => {
            state.message = action.payload.msg;
            state.severity = action.payload.severity;
            state.open = true;
        },
        hideNotificationReducer: (state) => {
            state.open = false;
        },
    },
});

export const { showNotificationReducer, hideNotificationReducer } =
    notificationSlice.actions;

export default notificationSlice.reducer;
