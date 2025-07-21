import { gql } from "@apollo/client";

export const BATCH = gql`
  query Batch($id: ID!) {
    batch(id: $id) {
      courseId
      createdAt
      endDate
      id
      isActive
      name
      startDate
      updatedAt
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
          email
        }
      }
      enrollments {
        id
        enrollmentDate
        status
        studentId
        batchId
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
      attendanceSessions {
        id
        sessionDate
        sessionTitle
        batchId
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
        courseId
        createdAt
        endDate
        id
        isActive
        name
        startDate
        updatedAt
        course {
          id
          title
          description
          creator {
            id
            firstName
            lastName
            username
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

export const COURSE_BATCHES = gql`
  query CourseBatches($courseId: ID!) {
    courseBatches(courseId: $courseId) {
      courseId
      createdAt
      endDate
      id
      isActive
      name
      startDate
      updatedAt
      course {
        id
        title
        description
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
      }
      batch {
        id
        name
        startDate
        endDate
        course {
          id
          title
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
