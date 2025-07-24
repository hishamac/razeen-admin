import { gql } from "@apollo/client";

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

export const BULK_ENROLL_STUDENTS = gql`
  mutation BulkEnrollStudents($bulkEnrollStudentsInput: BulkEnrollStudentsInput!) {
    bulkEnrollStudents(bulkEnrollStudentsInput: $bulkEnrollStudentsInput)
  }
`;

export const BULK_REMOVE_ENROLLMENTS = gql`
  mutation BulkRemoveEnrollments($bulkRemoveEnrollmentsInput: BulkRemoveEnrollmentsInput!) {
    bulkRemoveEnrollments(bulkRemoveEnrollmentsInput: $bulkRemoveEnrollmentsInput) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;
