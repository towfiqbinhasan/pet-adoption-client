import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllPets from "../pages/AllPets";
import PetDetails from "../pages/PetDetails";
import AddPet from "../pages/AddPet";
import MyListings from "../pages/MyListings";
import MyRequests from "../pages/MyRequests";
import UpdatePet from "../pages/UpdatePet";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "all-pets", element: <AllPets /> },
      {
        path: "pet/:id",
        element: <PrivateRoute><PetDetails /></PrivateRoute>
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-pet", element: <AddPet /> },
      { path: "my-listings", element: <MyListings /> },
      { path: "my-requests", element: <MyRequests /> },
      { path: "update-pet/:id", element: <UpdatePet /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);