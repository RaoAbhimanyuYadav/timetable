import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import useFetchAll from "../hooks/useFetchAll";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const accessToken = useSelector((state) => state.auth.accessToken);

    let location = useLocation();

    const fetchAll = useFetchAll();

    useEffect(() => {
        if (accessToken) {
            fetchAll(setLoading);
        }
    }, [accessToken, fetchAll]);

    if (!accessToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return loading ? <>Loading</> : children;
};

export default ProtectedRoute;
