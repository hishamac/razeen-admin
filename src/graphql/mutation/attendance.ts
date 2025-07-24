import { gql } from "@apollo/client";

export const CREATE_ATTENDANCE_SESSION = gql`
  mutation CreateAttendanceSession($createSessionInput: CreateAttendanceSessionInput!) {
    createAttendanceSession(createSessionInput: $createSessionInput) {
      batchId
      createdAt
      id
      sessionDate
      sessionTitle
      updatedAt
      batch {
        id
        name
        course {
          id
          title
        }
      }
      attendanceRecords {
        id
        isPresent
        studentId
        student {
          id
          firstName
          lastName
          username
        }
      }
    }
  }
`;

export const DELETE_ATTENDANCE_SESSION = gql`
  mutation DeleteAttendanceSession($id: ID!) {
    deleteAttendanceSession(id: $id)
  }
`;

export const MARK_ATTENDANCE = gql`
  mutation MarkAttendance($markAttendanceInput: [MarkAttendanceInput!]!) {
    markAttendance(markAttendanceInput: $markAttendanceInput) {
      createdAt
      enrollmentId
      id
      isPresent
      sessionId
      studentId
      updatedAt
      enrollment {
        id
        enrollmentDate
        status
      }
      session {
        id
        sessionDate
        sessionTitle
        batchId
      }
      student {
        id
        firstName
        lastName
        username
        email
      }
    }
  }
`;

export const BULK_REMOVE_ATTENDANCE_SESSIONS = gql`
  mutation BulkRemoveAttendanceSessions($bulkRemoveAttendanceSessionsInput: BulkRemoveAttendanceSessionsInput!) {
    bulkRemoveAttendanceSessions(bulkRemoveAttendanceSessionsInput: $bulkRemoveAttendanceSessionsInput) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;
