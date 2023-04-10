import axios from "../../api/axios";
import { resetAllState } from "../../utils/authFunctions";
import { setAccessTokenReducer } from "../reducers/authReducer";
import { showNotificationReducer } from "../reducers/notificationReducer";

export const login = (email, password, redirectFunc) => async (dispatch) => {
    try {
        const resp = await axios.post("login/token/", {
            username: email,
            password: password,
        });
        const accessToken = resp.data.access;
        const refreshToken = resp.data.refresh;
        localStorage.setItem("refresh", JSON.stringify(refreshToken));
        dispatch(setAccessTokenReducer(accessToken));
        redirectFunc();
    } catch (err) {
        dispatch(
            showNotificationReducer({
                severity: "error",
                msg: err.message,
            })
        );
    }
};

export const logout = () => async (dispatch) => {
    resetAllState(dispatch);
};

export const signup = (email, password, redirectFun) => async (dispatch) => {
    const data = {
        username: email,
        password: password,
    };
    try {
        const resp = await axios.post("register/", data, {
            // withCredentials: true,
        });
        console.log(resp);
        dispatch(setAccessTokenReducer(resp.data.access));
        localStorage.setItem("refresh", JSON.stringify(resp.data.refresh));
        redirectFun();
    } catch (err) {
        dispatch(
            showNotificationReducer({
                severity: "error",
                msg: err.message,
            })
        );
    }
};
