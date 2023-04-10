import { unauthorized } from "../../utils/authFunctions";
import { showNotificationReducer } from "../reducers/notificationReducer";
import { SEVERITY } from "../../constants/notificationConstant";

const errNotification = (dispatch, err) => {
    dispatch(
        showNotificationReducer({
            severity: SEVERITY[err.response.status],
            msg: JSON.stringify(err.response.data.message),
        })
    );
};

const msgnotification = (dispatch, resp) => {
    dispatch(
        showNotificationReducer({
            severity: SEVERITY[resp.status],
            msg: JSON.stringify(resp.data.message),
        })
    );
};

export const getData = (axios, URL, reducer) => async (dispatch) => {
    try {
        const resp = await axios.get(URL);
        dispatch(reducer(resp.data.data));
        msgnotification(dispatch, resp);
    } catch (err) {
        errNotification(dispatch, err);
        unauthorized(err, dispatch);
    }
};

export const getDataWithId = (axios, URL, reducer, id) => async (dispatch) => {
    try {
        const resp = await axios.get(URL, { params: { id } });
        dispatch(reducer(resp.data.data));
        msgnotification(dispatch, resp);
    } catch (err) {
        errNotification(dispatch, err);
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
    (axios, URL, reducer, data, keyList, query = "") =>
    async (dispatch, getState) => {
        try {
            if (keyList) {
                data = keyListFunc(keyList, data, getState);
            }
            const resp = await axios.post(URL, data);
            const newResp = await axios.get(URL + query);
            msgnotification(dispatch, resp);
            dispatch(reducer(newResp.data.data));
        } catch (err) {
            errNotification(dispatch, err);
            unauthorized(err, dispatch);
        }
    };

export const updateData =
    (axios, URL, reducer, data, keyList, query = "") =>
    async (dispatch, getState) => {
        try {
            if (keyList) {
                data = keyListFunc(keyList, data, getState);
            }
            const resp = await axios.put(URL, data);
            const newResp = await axios.get(URL + query);
            msgnotification(dispatch, resp);
            dispatch(reducer(newResp.data.data));
        } catch (err) {
            console.log(err);
            errNotification(dispatch, err);
            unauthorized(err, dispatch);
        }
    };

export const deleteData = (axios, URL, reducer, id) => async (dispatch) => {
    try {
        const resp = await axios.delete(URL, { data: { id } });
        msgnotification(dispatch, resp);

        const newResp = await axios.get(URL);
        dispatch(reducer(newResp.data.data));
    } catch (err) {
        errNotification(dispatch, err);
        unauthorized(err, dispatch);
    }
};
