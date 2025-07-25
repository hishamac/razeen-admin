import { gql } from "@apollo/client";

export const ASSIGNMENT = gql`
  query Assignment($id: ID!) {
    assignment(id: $id) {
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
        course {
          id
          title
        }
      }
      submissions {
        id
        status
        submittedAt
        score
        student {
          id
          firstName
          lastName
          username
        }
      }
    }
  }
`;

export const ASSIGNMENTS = gql`
  query Assignments(
    $filter: AssignmentFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    assignments(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
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
          course {
            id
            title
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

export const BATCH_ASSIGNMENTS = gql`
  query BatchAssignments(
    $batchId: ID!
    $filter: AssignmentFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    batchAssignments(
      batchId: $batchId
      filter: $filter
      pagination: $pagination
      sort: $sort
    ) {
      data {
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

export const MY_ASSIGNMENTS = gql`
  query MyAssignments(
    $filter: AssignmentFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    myAssignments(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
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
          course {
            id
            title
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

export const ASSIGNMENT_SUBMISSION = gql`
  query AssignmentSubmission($assignmentId: ID!, $studentId: ID) {
    assignmentSubmission(assignmentId: $assignmentId, studentId: $studentId) {
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
        description
        dueDate
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

export const ASSIGNMENT_SUBMISSIONS = gql`
  query AssignmentSubmissions($assignmentId: ID!) {
    assignmentSubmissions(assignmentId: $assignmentId) {
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

export const PENDING_GRADING = gql`
  query PendingGrading(
    $filter: AssignmentFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    pendingGrading(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
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
          dueDate
          batch {
            id
            name
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

// Assignment Stats
export const ASSIGNMENT_STATS = gql`
  query AssignmentStats($assignmentId: ID!) {
    assignmentStats(assignmentId: $assignmentId)
  }
`;

// Get Deleted Assignments
export const GET_DELETED_ASSIGNMENTS = gql`
  query GetDeletedAssignments {
    getDeletedAssignments {
      id
      title
      description
      batchId
      dueDate
      isActive
      createdAt
      updatedAt
      deletedAt
      deletedBy
      batch {
        id
        name
      }
    }
  }
`;
