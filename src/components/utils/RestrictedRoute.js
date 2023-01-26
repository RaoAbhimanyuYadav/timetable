import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  if (accessToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RestrictedRoute;
