import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import Layout from "@/components/shared/Layout";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            path === "/login" || path === "*" ? (
              element
            ) : (
              <Layout>{element}</Layout>
            )
          }
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
