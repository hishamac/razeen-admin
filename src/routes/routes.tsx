import type { AppRoute } from "../interfaces";
import Login from "../components/Login";
import NotFoundPage from "../components/shared/404";
import Dashboard from "@/components/Dashboard";

// Sample components for demonstration
const Analytics = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Analytics</h1>
    <p>Analytics dashboard content goes here.</p>
  </div>
);

const Reports = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Reports</h1>
    <p>Reports content goes here.</p>
  </div>
);

const Settings = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Settings</h1>
    <p>Settings content goes here.</p>
  </div>
);

export const routes: AppRoute[] = [
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/analytics", element: <Analytics /> },
  { path: "/reports", element: <Reports /> },
  { path: "/settings", element: <Settings /> },
  { path: "/", element: <Dashboard /> },
  { path: "*", element: <NotFoundPage /> },
];
