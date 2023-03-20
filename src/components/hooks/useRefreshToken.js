import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { setAccessTokenReducer } from "../redux/reducers/authReducer";

const useRefreshToken = () => {
    const dispatch = useDispatch();

    const refresh = async (setLoading) => {
        setLoading && setLoading(true);
        const refreshToken = localStorage.getItem("refresh");
        if (refreshToken) {
            try {
                const resp = await axios.post("login/token/refresh/", {
                    refresh: JSON.parse(refreshToken),
                });
                const token = resp.data.access;
                dispatch(setAccessTokenReducer(token));
            } catch (err) {
                console.log(err);
            } finally {
                setLoading && setLoading(false);
            }
        } else {
            setLoading && setLoading(false);
        }
    };

    return refresh;
};

export default useRefreshToken;
