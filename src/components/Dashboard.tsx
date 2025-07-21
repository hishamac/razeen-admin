import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../graphql/mutation/user";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Dashboard: React.FC = () => {
  const { user, token, clearAuth } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      localStorage.removeItem("token");
      clearAuth();
      toast.success("Logged out successfully!");
      navigate("/login");
      setIsLoggingOut(false);
    },
    onError: () => {
      localStorage.removeItem("token");
      clearAuth();
      toast.success("Logged out successfully!");
      navigate("/login");
      setIsLoggingOut(false);
    },
  });

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks

    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      toast.error("Logout failed, please try again");
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">No User Data</h2>
          <p className="text-gray-600">
            No user information available. Please log in.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          onClick={handleLogout}
          variant="outline"
          disabled={isLoggingOut}
          className={`${isLoggingOut ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging out...
            </>
          ) : (
            "Logout"
          )}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Profile Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Name:</span>
              <span className="ml-2">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Username:</span>
              <span className="ml-2">{user.username}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <span className="ml-2">{user.email}</span>
            </div>
            {user.phone && (
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <span className="ml-2">{user.phone}</span>
              </div>
            )}
            <div>
              <span className="font-medium text-gray-700">Role:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${
                  user.role === "ADMIN"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${
                  user.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </Card>

        {/* Account Details Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">User ID:</span>
              <span className="ml-2 font-mono text-sm">{user.id}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Created:</span>
              <span className="ml-2">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Last Updated:</span>
              <span className="ml-2">
                {new Date(user.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            {token && (
              <div>
                <span className="font-medium text-gray-700">Token Status:</span>
                <span className="ml-2 px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                  Authenticated
                </span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Welcome Section */}
      <Card className="p-6 mt-6">
        <h2 className="text-xl font-semibold mb-2">
          Welcome back, {user.firstName}!
        </h2>
        <p className="text-gray-600">
          You are logged in as a <strong>{user.role.toLowerCase()}</strong>.
          Your account is currently{" "}
          <strong>{user.isActive ? "active" : "inactive"}</strong>.
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;
