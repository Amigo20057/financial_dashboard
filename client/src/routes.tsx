import { useRoutes, Navigate, type RouteObject } from "react-router";
import MainLayout from "./layout/main-layout";
import Home from "./pages/home";
import AuthLayout from "./layout/auth-layout";
import Register from "./pages/register";
import Login from "./pages/login";
import NotFound from "./pages/not-found";
import Settings from "./pages/settings";
import Categories from "./pages/categories";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default function AppRouter() {
  return useRoutes(routes);
}
