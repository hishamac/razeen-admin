import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      username
      email
      firstName
      lastName
      phone
      role
      isActive
      lastLoginAt
      currentSessionToken
      createdAt
      updatedAt
      deletedAt
      deletedBy
    }
  }
`;

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      email
      firstName
      lastName
      phone
      role
      isActive
      lastLoginAt
      currentSessionToken
      createdAt
      updatedAt
      deletedAt
      deletedBy
    }
  }
`;

export const USERS = gql`
  query Users(
    $filter: UserFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    users(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        id
        username
        email
        firstName
        lastName
        phone
        role
        isActive
        lastLoginAt
        currentSessionToken
        createdAt
        updatedAt
        deletedAt
        deletedBy
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

export const STUDENTS = gql`
  query Students {
    students {
      id
      username
      email
      firstName
      lastName
      phone
      role
      isActive
      lastLoginAt
      currentSessionToken
      createdAt
      updatedAt
      deletedAt
      deletedBy
    }
  }
`;

// Enhanced User Queries
export const FIND_USER_WITH_DELETED = gql`
  query FindUserWithDeleted($id: ID!) {
    findUserWithDeleted(id: $id) {
      id
      username
      email
      firstName
      lastName
      phone
      role
      isActive
      lastLoginAt
      currentSessionToken
      createdAt
      updatedAt
      deletedAt
      deletedBy
    }
  }
`;

export const USERS_WITH_DELETED = gql`
  query UsersWithDeleted($filter: UserFilterInput, $pagination: PaginationInput, $sort: SortInput) {
    usersWithDeleted(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        id
        username
        email
        firstName
        lastName
        phone
        role
        isActive
        lastLoginAt
        currentSessionToken
        createdAt
        updatedAt
        deletedAt
        deletedBy
      }
      meta {
        total
        page
        limit
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`;

// User Stats
export const USER_STATS = gql`
  query UserStats {
    userStats
  }
`;

// Get Deleted Users
export const GET_DELETED_USERS = gql`
  query GetDeletedUsers {
    getDeletedUsers {
      id
      username
      email
      firstName
      lastName
      phone
      role
      isActive
      lastLoginAt
      currentSessionToken
      createdAt
      updatedAt
      deletedAt
      deletedBy
    }
  }
`;

// Student Attendance
export const STUDENT_ATTENDANCE = gql`
  query StudentAttendance($studentId: ID!) {
    studentAttendance(studentId: $studentId) {
      id
      isPresent
      sessionId
      studentId
      enrollmentId
      createdAt
      updatedAt
      session {
        id
        sessionTitle
        sessionDate
        batch {
          id
          name
          course {
            id
            title
          }
        }
      }
      student {
        id
        firstName
        lastName
        username
        email
        lastLoginAt
        currentSessionToken
      }
      enrollment {
        id
        enrollmentDate
        status
      }
    }
  }
`;

// Student Attendance Stats
export const STUDENT_ATTENDANCE_STATS = gql`
  query StudentAttendanceStats($studentId: ID!, $batchId: ID) {
    studentAttendanceStats(studentId: $studentId, batchId: $batchId)
  }
`;

// Student Progress
export const STUDENT_PROGRESS = gql`
  query StudentProgress($filter: StudentProgressFilterInput, $pagination: PaginationInput, $sort: SortInput) {
    studentProgress(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        id
        moduleId
        studentId
        enrollmentId
        isCompleted
        completedAt
        createdAt
        updatedAt
        module {
          id
          title
          type
          content
          duration
          encryptionKey
          fileName
          filePath
          fileSize
          fileUrl
          isDownloadable
          maxCacheSize
          mimeType
          orderIndex
          chapter {
            id
            title
            orderIndex
            course {
              id
              title
            }
          }
        }
        student {
          id
          firstName
          lastName
          username
          email
          lastLoginAt
          currentSessionToken
        }
      }
      meta {
        total
        page
        limit
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`;

// My Attendance
export const MY_ATTENDANCE = gql`
  query MyAttendance {
    myAttendance {
      id
      isPresent
      sessionId
      studentId
      enrollmentId
      createdAt
      updatedAt
      session {
        id
        sessionTitle
        sessionDate
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
      }
    }
  }
`;

// My Progress
export const MY_PROGRESS = gql`
  query MyProgress($filter: StudentProgressFilterInput, $pagination: PaginationInput, $sort: SortInput) {
    myProgress(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        id
        moduleId
        studentId
        enrollmentId
        isCompleted
        completedAt
        createdAt
        updatedAt
        module {
          id
          title
          type
          content
          duration
          encryptionKey
          fileName
          filePath
          fileSize
          fileUrl
          isDownloadable
          maxCacheSize
          mimeType
          orderIndex
          chapter {
            id
            title
            orderIndex
            course {
              id
              title
            }
          }
        }
        student {
          id
          firstName
          lastName
          username
          lastLoginAt
          currentSessionToken
        }
      }
      meta {
        total
        page
        limit
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`;
