import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/HOC/Navbar";
import Classrooms from "./components/pages/Classrooms";
import Generate from "./components/pages/Generate";
import HomePage from "./components/pages/Homepage";
import Profile from "./components/pages/Profile";
import Semesters from "./components/pages/Semesters";
import Subjects from "./components/pages/Subjects";
import Teachers from "./components/pages/Teachers";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import ProtectedRoute from "./components/HOC/ProtectedRoute";
import RestrictedRoute from "./components/HOC/RestrictedRoute";
import useRefreshToken from "./components/hooks/useRefreshToken";
import LoadingSpinner from "./components/specific/LoadingSpinner";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route
                path="/subjects"
                element={
                    <ProtectedRoute>
                        <Subjects />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/semesters"
                element={
                    <ProtectedRoute>
                        <Semesters />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/classrooms"
                element={
                    <ProtectedRoute>
                        <Classrooms />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teachers"
                element={
                    <ProtectedRoute>
                        <Teachers />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/generate"
                element={
                    <ProtectedRoute>
                        <Generate />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <RestrictedRoute>
                        <Login />
                    </RestrictedRoute>
                }
            />
            <Route
                path="/signup"
                element={
                    <RestrictedRoute>
                        <SignUp />
                    </RestrictedRoute>
                }
            />
        </Route>
    )
);

const RouteSelector = () => {
    const [loading, setLoading] = useState(true);
    const refresh = useRefreshToken();

    useEffect(() => {
        if (loading) refresh(setLoading);
    }, [refresh, loading]);

    return loading ? (
        <LoadingSpinner open={loading} />
    ) : (
        <RouterProvider router={router} />
    );
};

export default RouteSelector;
