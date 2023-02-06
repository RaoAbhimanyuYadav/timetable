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

export const addData =
    (axios, URL, reducer, data, keyList) => async (dispatch, getState) => {
        try {
            keyList.forEach((element) => {
                data[element.key] = element.statePath(getState);
            });
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
            keyList.forEach((element) => {
                data[element.key] = element.statePath(getState);
            });
            const resp = await axios.put(URL, data);
            dispatch(reducer(resp.data.data));
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
