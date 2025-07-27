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
import { Separator } from "@/components/ui/separator";
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
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && <h2 className="text-lg font-semibold">Admin</h2>}
        {onCollapse && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCollapse}
            className={cn(
              "hidden md:flex",
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
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {sidebarData.map((section, index) => (
            <div key={section.title}>
              {!collapsed && (
                <>
                  <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {section.title}
                  </h3>
                </>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        isActive && "bg-accent text-accent-foreground",
                        collapsed && "justify-center"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
              {index < sidebarData.length - 1 && !collapsed && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        {collapsed ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">
                {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
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
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">
                {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.firstName}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
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
            className="w-60 p-0"
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
