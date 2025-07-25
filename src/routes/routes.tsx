import type { AppRoute } from "../interfaces";
import Login from "../components/Login";
import NotFoundPage from "../components/shared/404";
import Dashboard from "../components/Dashboard";
import Students from "@/pages/Students";
import Admins from "@/pages/Admins";
import Courses from "@/pages/Courses";
import Batches from "@/pages/Batches";
import Chapters from "@/pages/Chapters";
import Modules from "../pages/Modules";
import Enrollments from "../pages/Enrollments";
import Assignments from "../pages/Assignments";

export const routes: AppRoute[] = [
  { path: "/login", element: <Login /> },
  { path: "/students", element: <Students /> },
  { path: "/admins", element: <Admins /> },
  { path: "/courses", element: <Courses /> },
  { path: "/batches", element: <Batches /> },
  { path: "/assignments", element: <Assignments /> },
  { path: "/batches/:batchId/enrollments", element: <Enrollments /> },
  { path: "/courses/:courseId/chapters", element: <Chapters /> },
  { path: "/courses/:courseId/chapters/:chapterId/modules", element: <Modules /> },
  { path: "/enrollments", element: <Enrollments /> },
  { path: "/", element: <Dashboard /> },
  { path: "*", element: <NotFoundPage /> },
];
