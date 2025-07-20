import type { AppRoute } from "../interfaces";
import Login from "../components/Login";
import NotFoundPage from "../components/shared/404";
import Dashboard from "@/components/Dashboard";

export const routes: AppRoute[] = [
  { path: "/login", element: <Login /> },
  { path: "/", element: <Dashboard /> },
  { path: "*", element: <NotFoundPage /> },
];
