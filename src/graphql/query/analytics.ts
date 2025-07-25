import { gql } from "@apollo/client";

export const MY_ANALYTICS = gql`
  query MyAnalytics {
    myAnalytics
  }
`;

export const SYSTEM_OVERVIEW = gql`
  query SystemOverview {
    systemOverview
  }
`;

export const RECENT_ACTIVITY = gql`
  query RecentActivity($limit: Float) {
    recentActivity(limit: $limit)
  }
`;

export const STUDENT_ANALYTICS = gql`
  query StudentAnalytics($studentId: ID) {
    studentAnalytics(studentId: $studentId)
  }
`;

export const PROGRESS_ANALYTICS = gql`
  query ProgressAnalytics($courseId: ID) {
    progressAnalytics(courseId: $courseId)
  }
`;

export const ASSIGNMENT_ANALYTICS = gql`
  query AssignmentAnalytics($courseId: ID) {
    assignmentAnalytics(courseId: $courseId)
  }
`;

export const ASSIGNMENT_STATS = gql`
  query AssignmentStats($assignmentId: ID!) {
    assignmentStats(assignmentId: $assignmentId)
  }
`;
