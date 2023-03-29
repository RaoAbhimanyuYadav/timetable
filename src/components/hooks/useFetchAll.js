import { useDispatch } from "react-redux";

import useAxiosPrivate from "./useAxiosPrivate";

import { KEY_REDUCER } from "../utils/authFunctions";
import { showNotificationReducer } from "../redux/reducers/notificationReducer";

const useFetchAll = () => {
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const fetchAll = async (setLoading) => {
        try {
            const resp = await axios.get("all/");
            const data = resp.data;
            KEY_REDUCER.forEach((pair) => {
                dispatch(pair.reducer(data[pair.key]));
            });
        } catch (err) {
            dispatch(
                showNotificationReducer({ severity: "error", msg: err.message })
            );
        } finally {
            setLoading && setLoading(false);
        }
    };

    return fetchAll;
};

export default useFetchAll;
