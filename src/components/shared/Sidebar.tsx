import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Loader2,
  BookOpen,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebarStore } from "@/stores/sidebarStore";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutation/user";
import toast from "react-hot-toast";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sidebarData: SidebarSection[] = [
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

interface SidebarProps {
  className?: string;
}

const SidebarContent: React.FC<{
  collapsed?: boolean;
  onCollapse?: () => void;
}> = ({ collapsed = false, onCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
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
    if (isLoggingOut) return; // Prevent multiple clicks

    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      toast.error("Logout failed, please try again");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b bg-gradient-to-r from-primary/5 to-primary/10 px-6">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Razeen Admin</h2>
          </div>
        )}
        {onCollapse && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCollapse}
            className={cn(
              "hidden md:flex hover:bg-primary/10",
              collapsed && "w-full justify-center"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-8">
          {sidebarData.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <>
                  <div className="mb-4 px-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                      {section.title}
                    </h3>
                    <div className="mt-2 h-px bg-gradient-to-r from-border to-transparent" />
                  </div>
                </>
              )}
              <div className="space-y-2">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "group relative flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                        "hover:bg-accent/50 hover:text-accent-foreground hover:shadow-sm",
                        isActive && "bg-primary/10 text-primary shadow-sm border border-primary/20",
                        collapsed && "justify-center px-3"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {isActive && !collapsed && (
                        <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                      )}
                      <div className={cn(
                        "flex items-center justify-center rounded-lg p-1",
                        isActive ? "bg-primary/20" : "bg-transparent group-hover:bg-accent/30",
                        !collapsed && "mr-3"
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {!collapsed && (
                        <>
                          <span className="flex-1 font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-sm">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t bg-gradient-to-t from-muted/20 to-transparent p-4">
        {collapsed ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
                <span className="text-sm font-bold text-primary-foreground">
                  {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all duration-200"
              title="Logout"
            >
              {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-3 rounded-xl bg-card/50 p-3 border border-border/50">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
                <span className="text-sm font-bold text-primary-foreground">
                  {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-foreground">
                {user?.firstName || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all duration-200 shrink-0"
              title="Logout"
            >
              {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = () => {
  const { mobileOpen, setMobileOpen } = useSidebarStore();

  return (
    <>
      {/* Mobile & Tablet Sidebar - Sheet/Overlay */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            className="w-68 p-0 bg-card border-r"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
