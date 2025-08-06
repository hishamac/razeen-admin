import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  BarChart3,
  LogOut,
  Loader2,
  BookOpen,
  Calendar,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { useSidebarStore } from "@/stores/sidebarStore";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutation/user";
import toast from "react-hot-toast";

interface NavbarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string;
}

interface NavbarSection {
  title: string;
  items: NavbarItem[];
}

const navbarData: NavbarSection[] = [
  {
    title: "Main",
    items: [{ icon: BarChart3, label: "Dashboard", href: "/" }],
  },
  {
    title: "Management",
    items: [
      { icon: Users, label: "Admins", href: "/admins" },
      { icon: Users, label: "Students", href: "/students" },
      { icon: BookOpen, label: "Courses", href: "/courses" },
      { icon: Calendar, label: "Batches", href: "/batches" },
    ],
  },
];

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const { setMobileOpen } = useSidebarStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      toast.error("Logout failed, please try again");
      setIsLoggingOut(false);
    }
  };

  // Flatten all navigation items
  const allNavItems = navbarData.flatMap((section) => section.items);

  return (
    <>
      {/* Mobile Navbar (below lg) */}
      <nav className={cn(
        "lg:hidden flex items-center justify-between h-16 px-4 border-b bg-background",
        className
      )}>
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-8"
          />
        </Link>

        {/* Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileOpen(true)}
          className="p-2"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </nav>

      {/* Desktop Navbar (lg and above) */}
      <nav
        className={cn(
          "hidden lg:flex items-center justify-between h-16 px-6 border-b bg-background",
          className
        )}
      >
      {/* Logo/Brand */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-8"
          />
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center space-x-1">
          {allNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors rounded-md",
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
        </div>

      {/* User Menu */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 h-auto">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
