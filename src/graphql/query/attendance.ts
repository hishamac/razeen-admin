import { gql } from "@apollo/client";

export const ATTENDANCE_SESSION = gql`
  query AttendanceSession($id: ID!) {
    attendanceSession(id: $id) {
      id
      sessionTitle
      sessionDate
      batchId
      createdAt
      updatedAt
      batch {
        id
        name
        courseId
        startDate
        endDate
        isActive
        createdAt
        updatedAt
        course {
          id
          title
          description
          isActive
          createdBy
          creator {
            id
            firstName
            lastName
            username
            email
          }
        }
        enrollments {
          id
          enrollmentDate
          status
          studentId
          createdAt
          updatedAt
          student {
            id
            firstName
            lastName
            username
            email
            phone
            role
          }
        }
      }
      attendanceRecords {
        id
        isPresent
        studentId
        sessionId
        enrollmentId
        createdAt
        updatedAt
        student {
          id
          firstName
          lastName
          username
          email
          phone
          role
          isActive
          createdAt
          updatedAt
        }
        session {
          id
          sessionTitle
          sessionDate
          batchId
          createdAt
          updatedAt
        }
        enrollment {
          id
          enrollmentDate
          status
          studentId
          batchId
          createdAt
          updatedAt
          batch {
            id
            name
          }
          student {
            id
            firstName
            lastName
            username
          }
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
        id
        sessionTitle
        sessionDate
        batchId
        createdAt
        updatedAt
        batch {
          id
          name
          courseId
          startDate
          endDate
          isActive
          course {
            id
            title
            description
            isActive
            creator {
              id
              firstName
              lastName
              username
            }
          }
        }
        attendanceRecords {
          id
          isPresent
          studentId
          sessionId
          enrollmentId
          createdAt
          updatedAt
          student {
            id
            firstName
            lastName
            username
            email
            phone
            role
            isActive
          }
          enrollment {
            id
            enrollmentDate
            status
            studentId
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
      id
      isPresent
      studentId
      sessionId
      enrollmentId
      createdAt
      updatedAt
      student {
        id
        firstName
        lastName
        username
        email
        phone
        role
        isActive
        createdAt
        updatedAt
      }
      session {
        id
        sessionTitle
        sessionDate
        batchId
        createdAt
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
      enrollment {
        id
        enrollmentDate
        status
        studentId
        batchId
        createdAt
        updatedAt
        student {
          id
          firstName
          lastName
          username
        }
        batch {
          id
          name
          courseId
          startDate
          endDate
        }
      }
    }
  }
`;

export const BATCH_ATTENDANCE_SESSIONS = gql`
  query BatchAttendanceSessions($batchId: ID!) {
    batchAttendanceSessions(batchId: $batchId) {
      id
      sessionTitle
      sessionDate
      batchId
      createdAt
      updatedAt
      batch {
        id
        name
        courseId
        startDate
        endDate
        isActive
        course {
          id
          title
          description
        }
      }
      attendanceRecords {
        id
        isPresent
        studentId
        sessionId
        enrollmentId
        createdAt
        updatedAt
        student {
          id
          firstName
          lastName
          username
          email
          phone
          role
          isActive
        }
        enrollment {
          id
          enrollmentDate
          status
          studentId
        }
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
