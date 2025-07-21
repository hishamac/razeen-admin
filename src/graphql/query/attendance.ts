import { gql } from "@apollo/client";

export const ATTENDANCE_SESSION = gql`
  query AttendanceSession($id: ID!) {
    attendanceSession(id: $id) {
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
        createdAt
        enrollmentId
        id
        isPresent
        sessionId
        studentId
        updatedAt
        student {
          id
          firstName
          lastName
          username
          email
        }
        enrollment {
          id
          enrollmentDate
          status
        }
      }
    }
  }
`;

export const ATTENDANCE_SESSIONS = gql`
  query AttendanceSessions(
    $filter: AttendanceFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    attendanceSessions(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
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
      }
      meta {
        hasNext
        hasPrev
        limit
        page
        total
        totalPages
      }
    }
  }
`;

export const BATCH_ATTENDANCE = gql`
  query BatchAttendance($batchId: ID!) {
    batchAttendance(batchId: $batchId) {
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
        batch {
          id
          name
        }
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

export const BATCH_ATTENDANCE_SESSIONS = gql`
  query BatchAttendanceSessions($batchId: ID!) {
    batchAttendanceSessions(batchId: $batchId) {
      batchId
      createdAt
      id
      sessionDate
      sessionTitle
      updatedAt
      batch {
        id
        name
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

export const MY_ATTENDANCE = gql`
  query MyAttendance {
    myAttendance {
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
        batch {
          id
          name
          course {
            id
            title
          }
        }
      }
      session {
        id
        sessionDate
        sessionTitle
        batchId
      }
    }
  }
`;

export const STUDENT_ATTENDANCE = gql`
  query StudentAttendance($studentId: ID!) {
    studentAttendance(studentId: $studentId) {
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
        batch {
          id
          name
          course {
            id
            title
          }
        }
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

export const ATTENDANCE_ANALYTICS = gql`
  query AttendanceAnalytics($batchId: ID) {
    attendanceAnalytics(batchId: $batchId)
  }
`;

export const ATTENDANCE_STATS = gql`
  query AttendanceStats($batchId: ID!) {
    attendanceStats(batchId: $batchId)
  }
`;

export const STUDENT_ATTENDANCE_STATS = gql`
  query StudentAttendanceStats($batchId: ID, $studentId: ID) {
    studentAttendanceStats(batchId: $batchId, studentId: $studentId)
  }
`;
