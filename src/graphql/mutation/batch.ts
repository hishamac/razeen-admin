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

export const BULK_REMOVE_BATCHES = gql`
  mutation BulkRemoveBatches($bulkRemoveBatchesInput: BulkRemoveBatchesInput!) {
    bulkRemoveBatches(bulkRemoveBatchesInput: $bulkRemoveBatchesInput) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;
