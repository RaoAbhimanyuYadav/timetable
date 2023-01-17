import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Navbar from "./components/HOC/Navbar";
import Classrooms from "./components/pages/Classrooms";
import Generate from "./components/pages/Generate";
import HomePage from "./components/pages/Homepage";
import Profile from "./components/pages/Profile";
import Semesters from "./components/pages/Semesters";
import Subjects from "./components/pages/Subjects";
import Teachers from "./components/pages/Teachers";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<HomePage />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/semesters" element={<Semesters />} />
      <Route path="/classrooms" element={<Classrooms />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/generate" element={<Generate />} />
    </Route>
  )
);

const routes = () => {
  return <RouterProvider router={router} />;
};

export default routes;
