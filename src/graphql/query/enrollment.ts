import { gql } from "@apollo/client";

export const ENROLLMENT = gql`
  query Enrollment($id: ID!) {
    enrollment(id: $id) {
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
          coverImage
          thumbnail
          isActive
          createdBy
          createdAt
          updatedAt
          creator {
            id
            firstName
            lastName
            username
            email
            phone
            role
          }
          chapters {
            id
            title
            orderIndex
            createdAt
            updatedAt
          }
        }
        enrollments {
          id
          enrollmentDate
          status
          studentId
          createdAt
          updatedAt
        }
        attendanceSessions {
          id
          sessionTitle
          sessionDate
          createdAt
          updatedAt
        }
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
        }
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
            }
          }
          enrollments {
            id
            enrollmentDate
            status
            studentId
          }
          attendanceSessions {
            id
            sessionTitle
            sessionDate
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

export const MY_ENROLLMENTS = gql`
  query MyEnrollments {
    myEnrollments {
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
          coverImage
          thumbnail
          isActive
          createdBy
          createdAt
          updatedAt
          creator {
            id
            firstName
            lastName
            username
            email
            phone
            role
          }
          chapters {
            id
            title
            orderIndex
            createdAt
            updatedAt
          }
        }
        attendanceSessions {
          id
          sessionTitle
          sessionDate
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const STUDENT_ENROLLMENTS = gql`
  query StudentEnrollments($studentId: ID!) {
    studentEnrollments(studentId: $studentId) {
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
      }
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
          coverImage
          thumbnail
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
        }
        attendanceSessions {
          id
          sessionTitle
          sessionDate
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const ENROLLMENT_PROGRESS = gql`
  query EnrollmentProgress($enrollmentId: ID!) {
    enrollmentProgress(enrollmentId: $enrollmentId)
  }
`;
