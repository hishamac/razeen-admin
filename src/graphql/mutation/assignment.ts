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
