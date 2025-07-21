import { gql } from "@apollo/client";

export const CREATE_BATCH = gql`
  mutation CreateBatch($createBatchInput: CreateBatchInput!) {
    createBatch(createBatchInput: $createBatchInput) {
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

export const UPDATE_BATCH = gql`
  mutation UpdateBatch($id: ID!, $updateBatchInput: UpdateBatchInput!) {
    updateBatch(id: $id, updateBatchInput: $updateBatchInput) {
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

export const REMOVE_BATCH = gql`
  mutation RemoveBatch($id: ID!) {
    removeBatch(id: $id) {
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
    }
  }
`;

export const ENROLL_STUDENT = gql`
  mutation EnrollStudent($batchId: ID!, $studentId: ID!) {
    enrollStudent(batchId: $batchId, studentId: $studentId)
  }
`;

export const UNENROLL_STUDENT = gql`
  mutation UnenrollStudent($batchId: ID!, $studentId: ID!) {
    unenrollStudent(batchId: $batchId, studentId: $studentId)
  }
`;
