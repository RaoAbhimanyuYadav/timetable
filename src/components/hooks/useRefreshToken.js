import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { setAccessTokenReducer } from "../redux/reducers/authReducer";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const refreshToken = localStorage.getItem("refresh");
    const resp = await axios.post("login/token/refresh/", {
      refresh: JSON.parse(refreshToken),
    });
    const token = resp.data.access;
    dispatch(setAccessTokenReducer(token));
    return token;
  };

  return refresh;
};

export default useRefreshToken;
