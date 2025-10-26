import { useRoutes, Navigate, type RouteObject } from "react-router";
import MainLayout from "./layout/main-layout";
import Home from "./pages/home";

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
    ],
  },
];

export default function AppRouter() {
  return useRoutes(routes);
}
