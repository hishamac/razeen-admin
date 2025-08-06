import { gql } from '@apollo/client';

// Dashboard Overview Query
export const GET_DASHBOARD_OVERVIEW = gql`
  query GetDashboardOverview {
    dashboardOverview {
      totalStudents
      totalCourses
      totalBatches
      totalEnrollments
      totalAssignments
      totalModules
      completedModules
      averageProgress
      activeUsers
      totalAttendanceSessions
      overallAttendanceRate
    }
  }
`;

// Top Courses Query
export const GET_TOP_COURSES = gql`
  query GetTopCourses($limit: Float) {
    topCourses(limit: $limit) {
      courseId
      title
      totalEnrollments
      totalModules
      completedModules
      completionRate
      totalAssignments
      totalSubmissions
      averageScore
      createdAt
    }
  }
`;

// Top Students Query
export const GET_TOP_STUDENTS = gql`
  query GetTopStudents($limit: Float) {
    topStudents(limit: $limit) {
      studentId
      name
      email
      totalEnrollments
      completedModules
      totalModules
      progressPercentage
      attendancePercentage
      totalSubmissions
      gradedSubmissions
      averageScore
      lastActive
    }
  }
`;

// Recent Activities Query
export const GET_RECENT_ACTIVITIES = gql`
  query GetRecentActivities($limit: Float) {
    recentActivities(limit: $limit) {
      type
      description
      userId
      userName
      relatedId
      timestamp
    }
  }
`;

// System Metrics Query
export const GET_SYSTEM_METRICS = gql`
  query GetSystemMetrics {
    systemMetrics {
      totalUsers
      activeUsersToday
      newRegistrationsThisWeek
      totalFileUploads
      averageSessionDuration
      totalNotifications
      unreadNotifications
    }
  }
`;

// All Batch Statistics Query
export const GET_ALL_BATCH_STATS = gql`
  query GetAllBatchStats {
    allBatchStats {
      batchId
      name
      courseTitle
      totalStudents
      activeStudents
      averageProgress
      attendanceRate
      totalAssignments
      submittedAssignments
      submissionRate
      startDate
      endDate
    }
  }
`;

// Complete Dashboard Summary Query
export const GET_COMPLETE_DASHBOARD = gql`
  query GetCompleteDashboard {
    completeDashboard {
      overview {
        totalStudents
        totalCourses
        totalBatches
        totalEnrollments
        totalAssignments
        totalModules
        completedModules
        averageProgress
        activeUsers
        totalAttendanceSessions
        overallAttendanceRate
      }
      topCourses {
        courseId
        title
        totalEnrollments
        totalModules
        completedModules
        completionRate
        totalAssignments
        totalSubmissions
        averageScore
        createdAt
      }
      topStudents {
        studentId
        name
        email
        totalEnrollments
        completedModules
        totalModules
        progressPercentage
        attendancePercentage
        totalSubmissions
        gradedSubmissions
        averageScore
        lastActive
      }
      recentActivities {
        type
        description
        userId
        userName
        relatedId
        timestamp
      }
      systemMetrics {
        totalUsers
        activeUsersToday
        newRegistrationsThisWeek
        totalFileUploads
        averageSessionDuration
        totalNotifications
        unreadNotifications
      }
    }
  }
`;

// Enhanced Progress Analytics Query
export const GET_TYPED_PROGRESS_ANALYTICS = gql`
  query GetTypedProgressAnalytics($courseId: ID) {
    typedProgressAnalytics(courseId: $courseId) {
      totalProgress
      completedProgress
      overallCompletionRate
      moduleProgressData {
        moduleId
        moduleTitle
        chapterTitle
        courseTitle
        totalStudents
        completedStudents
        completionRate
      }
    }
  }
`;

// Enhanced Attendance Analytics Query
export const GET_TYPED_ATTENDANCE_ANALYTICS = gql`
  query GetTypedAttendanceAnalytics($batchId: ID) {
    typedAttendanceAnalytics(batchId: $batchId) {
      totalRecords
      presentRecords
      overallAttendanceRate
      studentAttendanceData {
        studentId
        studentName
        totalSessions
        presentSessions
        attendanceRate
      }
    }
  }
`;

// Enhanced Assignment Analytics Query
export const GET_TYPED_ASSIGNMENT_ANALYTICS = gql`
  query GetTypedAssignmentAnalytics($courseId: ID) {
    typedAssignmentAnalytics(courseId: $courseId) {
      totalAssignments
      totalSubmissions
      gradedSubmissions
      pendingSubmissions
      gradingRate
      submissionRate
      assignmentStats {
        assignmentId
        title
        courseTitle
        totalSubmissions
        gradedSubmissions
        pendingSubmissions
        submissionRate
        dueDate
        createdAt
      }
    }
  }
`;

// Student Dashboard Queries
export const GET_MY_DASHBOARD_STATS = gql`
  query GetMyDashboardStats {
    myDashboardStats {
      studentId
      name
      email
      totalEnrollments
      completedModules
      totalModules
      progressPercentage
      attendancePercentage
      totalSubmissions
      gradedSubmissions
      averageScore
      lastActive
    }
  }
`;

export const GET_MY_RECENT_ACTIVITIES = gql`
  query GetMyRecentActivities($limit: Float) {
    myRecentActivities(limit: $limit) {
      type
      description
      userId
      userName
      relatedId
      timestamp
    }
  }
`;
