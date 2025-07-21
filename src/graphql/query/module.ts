import { gql } from "@apollo/client";

export const MODULE = gql`
  query Module($id: ID!) {
    module(id: $id) {
      chapterId
      createdAt
      fileName
      fileUrl
      id
      orderIndex
      title
      type
      updatedAt
      chapter {
        id
        title
        orderIndex
        courseId
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
      studentProgress {
        completedAt
        createdAt
        id
        isCompleted
        moduleId
        studentId
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
  }
`;

export const MODULES = gql`
  query Modules($chapterId: ID!) {
    modules(chapterId: $chapterId) {
      chapterId
      createdAt
      fileName
      fileUrl
      id
      orderIndex
      title
      type
      updatedAt
      chapter {
        id
        title
        orderIndex
        courseId
      }
      studentProgress {
        id
        isCompleted
        completedAt
        studentId
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

export const MODULE_PROGRESS = gql`
  query ModuleProgress($moduleId: ID!) {
    moduleProgress(moduleId: $moduleId) {
      completedAt
      createdAt
      id
      isCompleted
      moduleId
      studentId
      updatedAt
      module {
        id
        title
        type
        fileName
        fileUrl
        orderIndex
        chapter {
          id
          title
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
      }
    }
  }
`;

export const HAS_VALID_OFFLINE_CACHE = gql`
  query HasValidOfflineCache($moduleId: String!) {
    hasValidOfflineCache(moduleId: $moduleId)
  }
`;
