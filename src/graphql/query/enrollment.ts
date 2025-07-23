import { gql } from "@apollo/client";

export const ENROLLMENT = gql`
  query Enrollment($id: ID!) {
    enrollment(id: $id) {
      batchId
      createdAt
      enrollmentDate
      id
      status
      studentId
      updatedAt
      batch {
        id
        name
        startDate
        endDate
        course {
          id
          title
          description
        }
      }
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
`;

export const ENROLLMENTS = gql`
  query Enrollments(
    $filter: EnrollmentFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    enrollments(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        batchId
        createdAt
        enrollmentDate
        id
        status
        studentId
        updatedAt
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
        student {
          id
          firstName
          lastName
          username
          email
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

export const MY_ENROLLMENTS = gql`
  query MyEnrollments {
    myEnrollments {
      batchId
      createdAt
      enrollmentDate
      id
      status
      studentId
      updatedAt
      batch {
        id
        name
        startDate
        endDate
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
    }
  }
`;

export const STUDENT_ENROLLMENTS = gql`
  query StudentEnrollments($studentId: ID!) {
    studentEnrollments(studentId: $studentId) {
      batchId
      createdAt
      enrollmentDate
      id
      status
      studentId
      updatedAt
      batch {
        id
        name
        startDate
        endDate
        course {
          id
          title
          description
        }
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

export const ENROLLMENT_PROGRESS = gql`
  query EnrollmentProgress($enrollmentId: ID!) {
    enrollmentProgress(enrollmentId: $enrollmentId)
  }
`;
