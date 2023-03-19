import { unauthorized } from "../../utils/authFunctions";

export const getData = (axios, URL, reducer) => async (dispatch) => {
    try {
        const resp = await axios.get(URL);
        dispatch(reducer(resp.data.data));
    } catch (err) {
        console.log(err);
        unauthorized(err, dispatch);
    }
};

export const getDataWithId = (axios, URL, reducer, id) => async (dispatch) => {
    try {
        const resp = await axios.get(URL, { params: { id } });
        dispatch(reducer(resp.data.data));
    } catch (err) {
        console.log(err);
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
            dispatch(reducer(resp.data.data));
        } catch (err) {
            console.log(err);
            unauthorized(err, dispatch);
        }
    };

export const updateData =
    (axios, URL, reducer, data, keyList) => async (dispatch, getState) => {
        try {
            if (keyList) {
                data = keyListFunc(keyList, data, getState);
            }
            console.log(data);
            const resp = await axios.put(URL, data);
            if (resp.data.old_data) {
                dispatch(reducer(resp.data.data, resp.data.old_data));
            } else dispatch(reducer(resp.data.data));
        } catch (err) {
            console.log(err);
            unauthorized(err, dispatch);
        }
    };

export const deleteData = (axios, URL, reducer, id) => async (dispatch) => {
    try {
        const resp = await axios.delete(URL, { data: { id } });
        if (resp.data.success) {
            dispatch(reducer({ id }));
        }
    } catch (err) {
        console.log(err);
        unauthorized(err, dispatch);
    }
};
