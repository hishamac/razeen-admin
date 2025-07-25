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

// Soft Delete Operations
export const SOFT_DELETE_BATCH = gql`
  mutation SoftDeleteBatch($id: ID!) {
    softDeleteBatch(id: $id) {
      deletedAt
      deletedBy
      id
      message
    }
  }
`;

// Hard Delete Operations
export const HARD_DELETE_BATCH = gql`
  mutation HardDeleteBatch($id: ID!) {
    hardDeleteBatch(id: $id) {
      deleted
      id
      message
    }
  }
`;

// Restore Operations
export const RESTORE_BATCH = gql`
  mutation RestoreBatch($id: ID!) {
    restoreBatch(id: $id) {
      restoredAt
      restoredBy
      id
      message
    }
  }
`;

// Bulk Delete Operations
export const BULK_SOFT_DELETE_BATCHES = gql`
  mutation BulkSoftDeleteBatches($input: BulkDeleteInput!) {
    bulkSoftDeleteBatches(input: $input) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_HARD_DELETE_BATCHES = gql`
  mutation BulkHardDeleteBatches($input: BulkDeleteInput!) {
    bulkHardDeleteBatches(input: $input) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_RESTORE_BATCHES = gql`
  mutation BulkRestoreBatches($input: BulkRestoreInput!) {
    bulkRestoreBatches(input: $input) {
      success
      restoredCount
      restoredIds
      failedIds
      errorMessages
    }
  }
`;
