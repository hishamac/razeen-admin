import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type LoginInput } from "../generated/graphql";
import { LOGIN } from "../graphql/mutation/user";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@apollo/client";
import { Eye, EyeOff, Lock, User, Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const { setAuth } = useAuthStore();
  const [formData, setFormData] = useState<LoginInput>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoggingIn) {
      handleSubmit();
    }
  };

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      toast.success("Welcome back! Login successful!", {
        icon: "🎉",
        duration: 3000,
      });
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login.user));
      setAuth(data.login.token, data.login.user);
      navigate("/");
    },
    onError: (error) => {
      setIsLoggingIn(false);
      toast.error(error.message || "Login failed. Please try again.", {
        id: "loginError",
        duration: 5000,
      });
    },
  });

  const handleSubmit = async () => {
    if (!validateForm() || isLoggingIn) return;

    setIsLoggingIn(true);

    try {
      await login({
        variables: {
          loginInput: formData,
        },
      });
    } catch (error) {
      // Error is handled in onError callback
    } finally {
      setIsLoggingIn(false);
    }
  };

  const isFormValid = formData.username.trim() && formData.password.trim();

  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" replace />;
  } else {
    null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4 shadow-lg">
            <LogIn className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`pl-11 h-12 transition-all duration-200 ${
                    errors.username
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  disabled={isLoggingIn}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`pl-11 pr-12 h-12 transition-all duration-200 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  disabled={isLoggingIn}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
                  disabled={isLoggingIn}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <Button
              onClick={handleSubmit}
              className={`w-full h-12 text-base font-medium transition-all duration-200 ${
                isFormValid && !isLoggingIn
                  ? "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid || isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </>
              )}
            </Button>

            {/* Helper Text */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Press{" "}
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                  Enter
                </kbd>{" "}
                to sign in
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Secure login powered by your school system
          </p>
        </div>
      </div>
    </div>
  );
}
