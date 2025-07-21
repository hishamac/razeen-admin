import { gql } from "@apollo/client";

export const CREATE_MODULE = gql`
  mutation CreateModule($createModuleInput: CreateModuleInput!) {
    createModule(createModuleInput: $createModuleInput) {
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
        }
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

export const UPDATE_MODULE = gql`
  mutation UpdateModule($id: ID!, $updateModuleInput: UpdateModuleInput!) {
    updateModule(id: $id, updateModuleInput: $updateModuleInput) {
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
        }
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

export const REMOVE_MODULE = gql`
  mutation RemoveModule($id: ID!) {
    removeModule(id: $id) {
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
      }
    }
  }
`;

export const REORDER_MODULES = gql`
  mutation ReorderModules($chapterId: ID!, $moduleIds: [ID!]!) {
    reorderModules(chapterId: $chapterId, moduleIds: $moduleIds) {
      chapterId
      createdAt
      fileName
      fileUrl
      id
      orderIndex
      title
      type
      updatedAt
    }
  }
`;

export const UPDATE_MODULE_PROGRESS = gql`
  mutation UpdateModuleProgress($updateProgressInput: UpdateProgressInput!) {
    updateModuleProgress(updateProgressInput: $updateProgressInput) {
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
        chapterId
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

export const GENERATE_SECURE_STREAM_URL = gql`
  mutation GenerateSecureStreamUrl($moduleId: String!) {
    generateSecureStreamUrl(moduleId: $moduleId)
  }
`;

export const CREATE_OFFLINE_CACHE = gql`
  mutation CreateOfflineCache($moduleId: String!, $quality: String) {
    createOfflineCache(moduleId: $moduleId, quality: $quality)
  }
`;
