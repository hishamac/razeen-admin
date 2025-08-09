import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
  mutation CreateCourse($createCourseInput: CreateCourseInput!) {
    createCourse(createCourseInput: $createCourseInput) {
      createdAt
      createdBy
      description
      id
      isActive
      title
      updatedAt
      creator {
        id
        firstName
        lastName
        username
        email
      }
      chapters {
        id
        title
        orderIndex
        courseId
        modules {
          id
          title
          type
          orderIndex
          fileName
          fileUrl
        }
      }
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $updateCourseInput: UpdateCourseInput!) {
    updateCourse(id: $id, updateCourseInput: $updateCourseInput) {
      createdAt
      createdBy
      description
      id
      isActive
      title
      updatedAt
      creator {
        id
        firstName
        lastName
        username
        email
      }
      chapters {
        id
        title
        orderIndex
        courseId
        modules {
          id
          title
          type
          orderIndex
          fileName
          fileUrl
        }
      }
    }
  }
`;

export const REMOVE_COURSE = gql`
  mutation RemoveCourse($id: ID!) {
    removeCourse(id: $id) {
      createdAt
      createdBy
      description
      id
      isActive
      title
      updatedAt
      creator {
        id
        firstName
        lastName
        username
        email
      }
    }
  }
`;

export const BULK_REMOVE_COURSES = gql`
  mutation BulkRemoveCourses($bulkRemoveCoursesInput: BulkRemoveCoursesInput!) {
    bulkRemoveCourses(bulkRemoveCoursesInput: $bulkRemoveCoursesInput) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

// Soft Delete Operations
export const SOFT_DELETE_COURSE = gql`
  mutation SoftDeleteCourse($id: ID!) {
    softDeleteCourse(id: $id) {
      deletedAt
      id
      message
    }
  }
`;

// Hard Delete Operations
export const HARD_DELETE_COURSE = gql`
  mutation HardDeleteCourse($id: ID!) {
    hardDeleteCourse(id: $id) {
      deleted
      id
      message
    }
  }
`;

// Restore Operations
export const RESTORE_COURSE = gql`
  mutation RestoreCourse($id: ID!) {
    restoreCourse(id: $id) {
      restoredAt
      id
      message
    }
  }
`;

// Bulk Delete Operations
export const BULK_SOFT_DELETE_COURSES = gql`
  mutation BulkSoftDeleteCourses($ids: [String!]!) {
    bulkSoftDeleteCourses(ids: $ids) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_HARD_DELETE_COURSES = gql`
  mutation BulkHardDeleteCourses($ids: [String!]!) {
    bulkHardDeleteCourses(ids: $ids) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_RESTORE_COURSES = gql`
  mutation BulkRestoreCourses($ids: [String!]!) {
    bulkRestoreCourses(ids: $ids) {
      success
      restoredCount
      restoredIds
      failedIds
      errorMessages
    }
  }
`;

// Toggle Operations
export const TOGGLE_COURSE_ACTIVE = gql`
  mutation ToggleCourseActive($id: ID!) {
    toggleCourseActive(id: $id) {
      createdAt
      createdBy
      description
      id
      isActive
      title
      updatedAt
      creator {
        id
        firstName
        lastName
        username
        email
      }
      chapters {
        id
        title
        orderIndex
        courseId
        modules {
          id
          title
          type
          orderIndex
          fileName
          fileUrl
        }
      }
    }
  }
`;
