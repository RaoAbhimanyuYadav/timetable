import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import { auth } from "./components/api/firebase";

import { setUserReducer } from "./components/redux/reducers/authReducer";

import Navbar from "./components/HOC/Navbar";
import Classrooms from "./components/pages/Classrooms";
import Generate from "./components/pages/Generate";
import HomePage from "./components/pages/Homepage";
import LessonAssignment from "./components/pages/LessonAssignment";
import Profile from "./components/pages/Profile";
import Semesters from "./components/pages/Semesters";
import Subjects from "./components/pages/Subjects";
import Teachers from "./components/pages/Teachers";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import ProtectedRoute from "./components/utils/ProtectedRoute";

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
        path="/lessons"
        element={
          <ProtectedRoute>
            <LessonAssignment />
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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Route>
  )
);

const RouteSelector = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const body = {
          email: user.email,
          refreshToken: user.refreshToken,
          uid: user.uid,
        };
        dispatch(setUserReducer(body));
      } else {
        // User is signed out
        dispatch(setUserReducer(null));
      }
      setLoading(false);
    });
  }, [dispatch]);

  return loading ? <>Loading</> : <RouterProvider router={router} />;
};

export default RouteSelector;
