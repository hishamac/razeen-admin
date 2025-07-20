import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/generated/graphql";
import { useAuthStore } from "@/stores/authStore";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const { user } = useAuthStore();

  const navigate = useNavigate();
  const handleGoHome = () => {
    // Redirect if not logged in
    if (!user) {
      return navigate("/login", { replace: true });
    }

    // Role-based redirection
    switch (user.role) {
      case UserRole.Security:
        return navigate("/security/", { replace: true });
      case UserRole.Admin:
        return navigate("/admin/", { replace: true });
      case UserRole.Teacher:
        return navigate("/teacher/", { replace: true });
      default:
        return navigate("/login", { replace: true });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="text-6xl font-bold text-muted-foreground mb-4">
              404
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleGoHome}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Button>

              <Button
                onClick={handleGoBack}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
