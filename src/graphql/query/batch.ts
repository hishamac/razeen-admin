import { gql } from "@apollo/client";

export const BATCH = gql`
  query Batch($id: ID!) {
    batch(id: $id) {
      id
      name
      courseId
      startDate
      endDate
      isActive
      createdAt
      updatedAt
      deletedAt
      deletedBy
      course {
        id
        title
        description
        isActive
        coverImage
        thumbnail
        createdAt
        updatedAt
        createdBy
        deletedAt
        deletedBy
        creator {
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
          deletedAt
          deletedBy
        }
        chapters {
          id
          title
          orderIndex
          courseId
          createdAt
          updatedAt
          deletedAt
          deletedBy
        }
      }
      enrollments {
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
          email
          phone
          role
          isActive
          createdAt
          updatedAt
          deletedAt
          deletedBy
        }
        batch {
          id
          name
          startDate
          endDate
        }
      }
      attendanceSessions {
        id
        sessionDate
        sessionTitle
        batchId
        createdAt
        updatedAt
        batch {
          id
          name
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
          session {
            id
            sessionTitle
            sessionDate
          }
          enrollment {
            id
            enrollmentDate
            status
          }
        }
      }
    }
  }
`;

export const BATCHES = gql`
  query Batches(
    $filter: BatchFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    batches(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        id
        name
        courseId
        startDate
        endDate
        isActive
        createdAt
        updatedAt
        deletedAt
        deletedBy
        course {
          id
          title
          description
          isActive
          coverImage
          thumbnail
          createdAt
          updatedAt
          createdBy
          deletedAt
          deletedBy
          creator {
            id
            firstName
            lastName
            username
            email
            phone
            role
            isActive
          }
        }
        enrollments {
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
            email
            phone
            role
            isActive
          }
        }
        attendanceSessions {
          id
          sessionDate
          sessionTitle
          batchId
          createdAt
          updatedAt
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

export const COURSE_BATCHES = gql`
  query CourseBatches($courseId: ID!) {
    courseBatches(courseId: $courseId) {
      id
      name
      courseId
      startDate
      endDate
      isActive
      createdAt
      updatedAt
      deletedAt
      deletedBy
      course {
        id
        title
        description
        isActive
        coverImage
        thumbnail
        createdAt
        updatedAt
        createdBy
      }
      enrollments {
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
          email
          phone
          role
          isActive
        }
      }
      attendanceSessions {
        id
        sessionDate
        sessionTitle
        batchId
        createdAt
        updatedAt
      }
    }
  }
`;

export const BATCH_ENROLLMENTS = gql`
  query BatchEnrollments($batchId: ID!) {
    batchEnrollments(batchId: $batchId) {
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
        email
        phone
        role
        isActive
        createdAt
        updatedAt
        deletedAt
        deletedBy
      }
      batch {
        id
        name
        startDate
        endDate
        isActive
        courseId
        createdAt
        updatedAt
        course {
          id
          title
          description
          isActive
        }
      }
    }
  }
`;

export const BATCH_STATS = gql`
  query BatchStats($batchId: ID!) {
    batchStats(batchId: $batchId)
  }
`;

// Get Deleted Batches
export const GET_DELETED_BATCHES = gql`
  query GetDeletedBatches {
    getDeletedBatches {
      id
      name
      courseId
      startDate
      endDate
      isActive
      createdAt
      updatedAt
      deletedAt
      deletedBy
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
        }
      }
      enrollments {
        id
        enrollmentDate
        status
        studentId
        student {
          id
          firstName
          lastName
          username
          email
        }
      }
      attendanceSessions {
        id
        sessionDate
        sessionTitle
        createdAt
        updatedAt
      }
    }
  }
`;
