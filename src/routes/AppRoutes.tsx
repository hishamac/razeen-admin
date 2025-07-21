import Layout from "@/components/shared/Layout";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

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
