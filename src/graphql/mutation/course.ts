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
