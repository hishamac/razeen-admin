import { gql } from "@apollo/client";

export const ASSIGNMENT = gql`
  query Assignment($id: ID!) {
    assignment(id: $id) {
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
          createdAt
          updatedAt
        }
      }
      submissions {
        id
        status
        submittedAt
        score
        feedback
        gradedAt
        assignmentId
        studentId
        submissionFiles {
          fileName
          filePath
          fileSize
          mimeType
        }
        submissionText
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
        assignment {
          id
          title
          description
          dueDate
          batchId
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
          courseId
          startDate
          endDate
          isActive
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
            }
          }
        }
        submissions {
          id
          status
          submittedAt
          score
          feedback
          studentId
          submissionFiles {
            fileName
            filePath
            fileSize
            mimeType
          }
          submissionText
          student {
            id
            firstName
            lastName
            username
            email
          }
        }
        allowFileSubmission
        allowResubmission
        allowTextSubmission
        allowVoiceSubmission
        assignmentFiles {
          fileName
          filePath
          fileSize
          mimeType
        }
        maxResubmissions
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
          courseId
          startDate
          endDate
          isActive
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
          feedback
          studentId
          submissionFiles {
            fileName
            filePath
            fileSize
            mimeType
          }
          submissionText
          student {
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

export const MY_ASSIGNMENTS = gql`
  query MyAssignments(
    $filter: AssignmentFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    myAssignments(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
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
          courseId
          startDate
          endDate
          isActive
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
            }
          }
        }
        submissions {
          id
          status
          submittedAt
          score
          feedback
          studentId
          submissionFiles {
            fileName
            filePath
            fileSize
            mimeType
          }
          submissionText
          student {
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

export const ASSIGNMENT_SUBMISSION = gql`
  query AssignmentSubmission($assignmentId: ID!, $studentId: ID) {
    assignmentSubmission(assignmentId: $assignmentId, studentId: $studentId) {
      id
      assignmentId
      studentId
      status
      submissionFiles {
        fileName
        filePath
        fileSize
        mimeType
      }
      submissionText
      submittedAt
      score
      feedback
      gradedAt
      createdAt
      updatedAt
      assignment {
        id
        title
        description
        dueDate
        batchId
        isActive
        createdAt
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
    }
  }
`;

export const ASSIGNMENT_SUBMISSIONS = gql`
  query AssignmentSubmissions(
    $assignmentId: ID!
    $filter: AssignmentFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    assignmentSubmissions(
      assignmentId: $assignmentId
      filter: $filter
      pagination: $pagination
      sort: $sort
    ) {
      data {
        id
        assignmentId
        studentId
        status
        submissionFiles {
          fileName
          filePath
          fileSize
          mimeType
        }
        submissionText
        submittedAt
        score
        feedback
        gradedAt
        createdAt
        updatedAt
        assignment {
          id
          title
          description
          dueDate
          batchId
          isActive
        }
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

export const PENDING_GRADING = gql`
  query PendingGrading(
    $filter: AssignmentFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    pendingGrading(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        id
        assignmentId
        studentId
        status
        submissionFiles {
          fileName
          filePath
          fileSize
          mimeType
        }
        submissionText
        submittedAt
        score
        feedback
        gradedAt
        createdAt
        updatedAt
        assignment {
          id
          title
          description
          dueDate
          batchId
          isActive
          createdAt
          updatedAt
          batch {
            id
            name
            courseId
            startDate
            endDate
            course {
              id
              title
            }
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
          isActive
          createdAt
          updatedAt
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
        courseId
        startDate
        endDate
        isActive
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
      submissions {
        id
        status
        submittedAt
        score
        feedback
        studentId
        submissionFiles {
          fileName
          filePath
          fileSize
          mimeType
        }
        submissionText
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
