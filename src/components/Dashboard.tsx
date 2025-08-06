import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutation/user";
import {
  GET_COMPLETE_DASHBOARD,
  GET_MY_DASHBOARD_STATS,
  GET_MY_RECENT_ACTIVITIES,
} from "../graphql/query/dashboard";
import toast from "react-hot-toast";
import { 
  Loader2, 
  Users, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Activity,
  Award,
  Clock,
  BarChart3,
  Target
} from "lucide-react";

// Helper component for metric cards
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}> = ({ title, value, icon, trend, color = "blue" }) => (
  <Card className="p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {trend && (
          <p className={`text-sm ${color === "green" ? "text-green-600" : "text-blue-600"}`}>
            {trend}
          </p>
        )}
      </div>
      <div className={`p-2 rounded-full bg-${color}-100 text-${color}-600`}>
        {icon}
      </div>
    </div>
  </Card>
);

const Dashboard: React.FC = () => {
  const { user, clearAuth } = useAuthStore();
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

  // Admin dashboard data
  const { 
    data: adminDashboard, 
    loading: adminLoading, 
    error: adminError 
  } = useQuery(GET_COMPLETE_DASHBOARD, {
    skip: user?.role !== "ADMIN",
    errorPolicy: "all",
  });

  // Student dashboard data
  const { 
    data: studentStats, 
    loading: studentStatsLoading, 
    error: studentStatsError 
  } = useQuery(GET_MY_DASHBOARD_STATS, {
    skip: user?.role !== "STUDENT",
    errorPolicy: "all",
  });

  const { 
    data: studentActivities, 
    loading: studentActivitiesLoading 
  } = useQuery(GET_MY_RECENT_ACTIVITIES, {
    variables: { limit: 10 },
    skip: user?.role !== "STUDENT",
    errorPolicy: "all",
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

  // Admin Dashboard
  if (user.role === "ADMIN") {
    if (adminLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    if (adminError && !adminDashboard) {
      return (
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline" disabled={isLoggingOut}>
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
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Dashboard Error</h2>
            <p className="text-gray-600">
              Unable to load dashboard data. Please refresh the page or try again later.
            </p>
          </Card>
        </div>
      );
    }

    const overview = adminDashboard?.completeDashboard?.overview;
    const topCourses = adminDashboard?.completeDashboard?.topCourses || [];
    const topStudents = adminDashboard?.completeDashboard?.topStudents || [];
    const recentActivities = adminDashboard?.completeDashboard?.recentActivities || [];
    const systemMetrics = adminDashboard?.completeDashboard?.systemMetrics;

    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.firstName}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline" disabled={isLoggingOut}>
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

        {/* Overview Metrics */}
        {overview && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Students"
              value={overview.totalStudents}
              icon={<Users className="h-6 w-6" />}
              color="blue"
            />
            <MetricCard
              title="Total Courses"
              value={overview.totalCourses}
              icon={<BookOpen className="h-6 w-6" />}
              color="green"
            />
            <MetricCard
              title="Total Batches"
              value={overview.totalBatches}
              icon={<GraduationCap className="h-6 w-6" />}
              color="purple"
            />
            <MetricCard
              title="Total Assignments"
              value={overview.totalAssignments}
              icon={<FileText className="h-6 w-6" />}
              color="orange"
            />
            <MetricCard
              title="Active Users"
              value={overview.activeUsers}
              icon={<Activity className="h-6 w-6" />}
              color="green"
            />
            <MetricCard
              title="Average Progress"
              value={`${overview.averageProgress.toFixed(1)}%`}
              icon={<TrendingUp className="h-6 w-6" />}
              color="blue"
            />
            <MetricCard
              title="Attendance Rate"
              value={`${overview.overallAttendanceRate.toFixed(1)}%`}
              icon={<Calendar className="h-6 w-6" />}
              color="green"
            />
            <MetricCard
              title="Total Modules"
              value={overview.totalModules}
              icon={<Target className="h-6 w-6" />}
              color="purple"
            />
          </div>
        )}

        {/* System Metrics */}
        {systemMetrics && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              System Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{systemMetrics.activeUsersToday}</p>
                <p className="text-sm text-gray-600">Active Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{systemMetrics.newRegistrationsThisWeek}</p>
                <p className="text-sm text-gray-600">New This Week</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{systemMetrics.totalFileUploads}</p>
                <p className="text-sm text-gray-600">File Uploads</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{systemMetrics.averageSessionDuration.toFixed(1)}m</p>
                <p className="text-sm text-gray-600">Avg Session</p>
              </div>
            </div>
          </Card>
        )}

        {/* Top Courses and Students */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Courses */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Top Courses
            </h2>
            <div className="space-y-4">
              {topCourses.slice(0, 5).map((course: any, index: number) => (
                <div key={course.courseId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-gray-600">
                      {course.totalEnrollments} students • {course.completionRate.toFixed(1)}% completion
                    </p>
                  </div>
                  <Badge variant="outline">#{index + 1}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Students */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Top Students
            </h2>
            <div className="space-y-4">
              {topStudents.slice(0, 5).map((student: any, index: number) => (
                <div key={student.studentId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">
                      {student.progressPercentage.toFixed(1)}% progress • {student.attendancePercentage.toFixed(1)}% attendance
                    </p>
                  </div>
                  <Badge variant="outline">#{index + 1}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recent Activities
          </h2>
          <div className="space-y-3">
            {recentActivities.slice(0, 10).map((activity: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50">
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-600">by {activity.userName}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  // Student Dashboard
  if (user.role === "STUDENT") {
    if (studentStatsLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    if (studentStatsError && !studentStats) {
      return (
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <Button onClick={handleLogout} variant="outline" disabled={isLoggingOut}>
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
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Dashboard Error</h2>
            <p className="text-gray-600">
              Unable to load your dashboard data. Please refresh the page or try again later.
            </p>
          </Card>
        </div>
      );
    }

    const stats = studentStats?.myDashboardStats;
    const activities = studentActivities?.myRecentActivities || [];

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.firstName}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline" disabled={isLoggingOut}>
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

        {/* Student Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Course Enrollments"
              value={stats.totalEnrollments}
              icon={<BookOpen className="h-6 w-6" />}
              color="blue"
            />
            <MetricCard
              title="Progress"
              value={`${stats.progressPercentage.toFixed(1)}%`}
              icon={<TrendingUp className="h-6 w-6" />}
              color="green"
            />
            <MetricCard
              title="Attendance"
              value={`${stats.attendancePercentage.toFixed(1)}%`}
              icon={<Calendar className="h-6 w-6" />}
              color="blue"
            />
            <MetricCard
              title="Assignments"
              value={`${stats.gradedSubmissions}/${stats.totalSubmissions}`}
              icon={<FileText className="h-6 w-6" />}
              color="purple"
            />
          </div>
        )}

        {/* Detailed Stats */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Learning Progress
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Completed Modules</span>
                  <Badge variant="outline">{stats.completedModules}/{stats.totalModules}</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${stats.progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Score</span>
                  <Badge variant={stats.averageScore >= 80 ? "default" : "secondary"}>
                    {stats.averageScore ? stats.averageScore.toFixed(1) : 'N/A'}%
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Account Info
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2">{stats.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Last Active:</span>
                  <span className="ml-2">
                    {new Date(stats.lastActive).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Recent Activities */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            My Recent Activities
          </h2>
          {studentActivitiesLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : activities.length > 0 ? (
            <div className="space-y-3">
              {activities.map((activity: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50">
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-600">{activity.type}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No recent activities found.</p>
          )}
        </Card>
      </div>
    );
  }

  // Fallback for unknown roles
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={handleLogout} variant="outline" disabled={isLoggingOut}>
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
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.firstName}!</h2>
        <p className="text-gray-600">
          Your role ({user.role}) doesn't have a specific dashboard configured yet.
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;
