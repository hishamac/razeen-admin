import { gql } from "@apollo/client";

export const CREATE_ASSIGNMENT = gql`
  mutation CreateAssignment($createAssignmentInput: CreateAssignmentInput!) {
    createAssignment(createAssignmentInput: $createAssignmentInput) {
      batchId
      createdAt
      description
      dueDate
      id
      isActive
      title
      updatedAt
      batch {
        id
        name
      }
    }
  }
`;

export const UPDATE_ASSIGNMENT = gql`
  mutation UpdateAssignment($id: ID!, $updateAssignmentInput: UpdateAssignmentInput!) {
    updateAssignment(id: $id, updateAssignmentInput: $updateAssignmentInput) {
      batchId
      createdAt
      description
      dueDate
      id
      isActive
      title
      updatedAt
      batch {
        id
        name
      }
    }
  }
`;

export const REMOVE_ASSIGNMENT = gql`
  mutation RemoveAssignment($id: ID!) {
    removeAssignment(id: $id) {
      batchId
      createdAt
      description
      dueDate
      id
      isActive
      title
      updatedAt
      batch {
        id
        name
      }
    }
  }
`;

export const SUBMIT_ASSIGNMENT = gql`
  mutation SubmitAssignment($submitAssignmentInput: SubmitAssignmentInput!) {
    submitAssignment(submitAssignmentInput: $submitAssignmentInput) {
      assignmentId
      createdAt
      feedback
      gradedAt
      id
      score
      status
      studentId
      submissionFiles
      submittedAt
      updatedAt
      assignment {
        id
        title
      }
      student {
        id
        firstName
        lastName
        username
      }
    }
  }
`;

export const GRADE_ASSIGNMENT = gql`
  mutation GradeAssignment($gradeAssignmentInput: GradeAssignmentInput!) {
    gradeAssignment(gradeAssignmentInput: $gradeAssignmentInput) {
      assignmentId
      createdAt
      feedback
      gradedAt
      id
      score
      status
      studentId
      submissionFiles
      submittedAt
      updatedAt
      assignment {
        id
        title
      }
      student {
        id
        firstName
        lastName
        username
      }
    }
  }
`;

export const BULK_REMOVE_ASSIGNMENTS = gql`
  mutation BulkRemoveAssignments($bulkRemoveAssignmentsInput: BulkRemoveAssignmentsInput!) {
    bulkRemoveAssignments(bulkRemoveAssignmentsInput: $bulkRemoveAssignmentsInput) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

// Soft Delete Operations
export const SOFT_DELETE_ASSIGNMENT = gql`
  mutation SoftDeleteAssignment($id: ID!) {
    softDeleteAssignment(id: $id) {
      deletedAt
      deletedBy
      id
      message
    }
  }
`;

// Hard Delete Operations
export const HARD_DELETE_ASSIGNMENT = gql`
  mutation HardDeleteAssignment($id: ID!) {
    hardDeleteAssignment(id: $id) {
      deleted
      id
      message
    }
  }
`;

// Restore Operations
export const RESTORE_ASSIGNMENT = gql`
  mutation RestoreAssignment($id: ID!) {
    restoreAssignment(id: $id) {
      restoredAt
      restoredBy
      id
      message
    }
  }
`;

// Bulk Delete Operations
export const BULK_SOFT_DELETE_ASSIGNMENTS = gql`
  mutation BulkSoftDeleteAssignments($ids: [String!]!) {
    bulkSoftDeleteAssignments(ids: $ids) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_HARD_DELETE_ASSIGNMENTS = gql`
  mutation BulkHardDeleteAssignments($ids: [String!]!) {
    bulkHardDeleteAssignments(ids: $ids) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_RESTORE_ASSIGNMENTS = gql`
  mutation BulkRestoreAssignments($ids: [String!]!) {
    bulkRestoreAssignments(ids: $ids) {
      success
      restoredCount
      restoredIds
      failedIds
      errorMessages
    }
  }
`;

// Toggle Operations
export const TOGGLE_ASSIGNMENT_ACTIVE = gql`
  mutation ToggleAssignmentActive($id: ID!) {
    toggleAssignmentActive(id: $id) {
      batchId
      createdAt
      description
      dueDate
      id
      isActive
      title
      updatedAt
      batch {
        id
        name
      }
    }
  }
`;
