import { unauthorized } from "../../utils/authFunctions";
import { showNotificationReducer } from "../reducers/notificationReducer";
import { SEVERITY } from "../../constants/notificationConstant";

export const getData = (axios, URL, reducer) => async (dispatch) => {
    try {
        const resp = await axios.get(URL);
        dispatch(reducer(resp.data.data));
        dispatch(
            showNotificationReducer({
                severity: SEVERITY[resp.status],
                message: resp.data.message,
            })
        );
    } catch (err) {
        dispatch(
            showNotificationReducer({
                severity: "error",
                msg: err.message,
            })
        );
        unauthorized(err, dispatch);
    }
};

export const getDataWithId = (axios, URL, reducer, id) => async (dispatch) => {
    try {
        const resp = await axios.get(URL, { params: { id } });
        dispatch(reducer(resp.data.data));
    } catch (err) {
        dispatch(
            showNotificationReducer({
                severity: "error",
                msg: err.message,
            })
        );
        unauthorized(err, dispatch);
    }
};

const keyListFunc = (keyList, data, getState) => {
    keyList.forEach((element) => {
        if (element.createObjWithId) {
            let obj = {};
            obj["id"] = element.statePath(getState);
            data[element.key] = obj;
        } else {
            data[element.key] = element.statePath(getState);
        }
    });
    return data;
};

export const addData =
    (axios, URL, reducer, data, keyList) => async (dispatch, getState) => {
        try {
            if (keyList) {
                data = keyListFunc(keyList, data, getState);
            }
            const resp = await axios.post(URL, data);
            const newResp = await axios.get(URL);
            dispatch(
                showNotificationReducer({
                    severity: SEVERITY[resp.status],
                    msg: resp.data.message,
                })
            );
            dispatch(reducer(newResp.data.data));
        } catch (err) {
            dispatch(
                showNotificationReducer({
                    severity: "error",
                    msg: err.message,
                })
            );
            unauthorized(err, dispatch);
        }
    };

export const updateData =
    (axios, URL, reducer, data, keyList) => async (dispatch, getState) => {
        try {
            if (keyList) {
                data = keyListFunc(keyList, data, getState);
            }
            const resp = await axios.put(URL, data);
            const newResp = await axios.get(URL);
            dispatch(
                showNotificationReducer({
                    severity: SEVERITY[resp.status],
                    msg: resp.data.message,
                })
            );
            dispatch(reducer(newResp.data.data));
        } catch (err) {
            dispatch(
                showNotificationReducer({
                    severity: "error",
                    msg: err.message,
                })
            );
            unauthorized(err, dispatch);
        }
    };

export const deleteData = (axios, URL, reducer, id) => async (dispatch) => {
    try {
        const resp = await axios.delete(URL, { data: { id } });
        dispatch(
            showNotificationReducer({
                severity: SEVERITY[resp.status],
                msg: resp.data.message,
            })
        );

        const newResp = await axios.get(URL);
        dispatch(reducer(newResp.data.data));
    } catch (err) {
        dispatch(
            showNotificationReducer({
                severity: "error",
                msg: err.message,
            })
        );
        unauthorized(err, dispatch);
    }
};
