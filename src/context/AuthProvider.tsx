import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate, useLocation } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { ME } from "../graphql/query/user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuth, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [findMe] = useLazyQuery(ME, {
    onCompleted: (data) => {
      if (data?.me) {
        setAuth(localStorage.getItem("token")!, data.me);
      }
    },
    onError: () => {
      handleLogout();
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearAuth();
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      findMe();
    } else {
      navigate("/login");
    }
  }, [location.pathname]);

  return <>{children}</>;
};
