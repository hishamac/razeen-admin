import type { AppRoute } from "../interfaces";
import Login from "../components/Login";
import NotFoundPage from "../components/shared/404";
import Dashboard from "../components/Dashboard";
import Students from "@/pages/Students";
import Admins from "@/pages/Admins";
import Assignments from "@/pages/Assignments";

export const routes: AppRoute[] = [
  { path: "/login", element: <Login /> },
  { path: "/students", element: <Students /> },
  { path: "/admins", element: <Admins /> },
  { path: "/assignments", element: <Assignments /> },
  { path: "/", element: <Dashboard /> },
  { path: "*", element: <NotFoundPage /> },
];
