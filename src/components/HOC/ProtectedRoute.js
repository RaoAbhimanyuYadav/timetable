import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import useFetchAll from "../hooks/useFetchAll";
import LoadingSpinner from "../specific/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const accessToken = useSelector((state) => state.auth.accessToken);

    let location = useLocation();

    const fetchAll = useFetchAll();

    useEffect(() => {
        if (accessToken && loading) {
            fetchAll(setLoading);
        } // eslint-disable-next-line
    }, []);

    if (!accessToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return loading ? <LoadingSpinner open={loading} /> : children;
};

export default ProtectedRoute;
