import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type LoginInput } from "../generated/graphql";
import { LOGIN } from "../graphql/mutation/user";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@apollo/client";
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
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

  const { user, token } = useAuthStore();

  if (token || user) {
    return <Navigate to="/" replace />;
  } else {
    null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50/30 via-indigo-50/20 to-violet-100/40">
      <Card className="w-full max-w-md mx-4 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <img 
                src="/logo.png" 
                alt="Razeen" 
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
          
          {/* Header Text */}
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Sign in to your admin dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`pl-10 h-12 border-2 transition-all duration-200 ${
                  errors.username 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-gray-200 focus:border-primary focus:ring-primary/20"
                } rounded-xl`}
                disabled={isLoggingIn}
              />
            </div>
            {errors.username && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`pl-10 pr-12 h-12 border-2 transition-all duration-200 ${
                  errors.password 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-gray-200 focus:border-primary focus:ring-primary/20"
                } rounded-xl`}
                disabled={isLoggingIn}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Login Button */}
          <Button
            onClick={handleSubmit}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={!isFormValid || isLoggingIn}
          >
            {isLoggingIn ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
