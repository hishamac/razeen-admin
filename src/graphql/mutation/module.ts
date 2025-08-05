import { gql } from "@apollo/client";

export const CREATE_MODULE = gql`
  mutation CreateModule($createModuleInput: CreateModuleInput!) {
    createModule(createModuleInput: $createModuleInput) {
      chapterId
      content
      createdAt
      duration
      encryptionKey
      fileName
      filePath
      fileSize
      fileUrl
      id
      isDownloadable
      maxCacheSize
      mimeType
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
        enrollmentId
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
      content
      createdAt
      duration
      encryptionKey
      fileName
      filePath
      fileSize
      fileUrl
      id
      isDownloadable
      maxCacheSize
      mimeType
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
        enrollmentId
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
      content
      createdAt
      duration
      encryptionKey
      fileName
      filePath
      fileSize
      fileUrl
      id
      isDownloadable
      maxCacheSize
      mimeType
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
      content
      createdAt
      duration
      encryptionKey
      fileName
      filePath
      fileSize
      fileUrl
      id
      isDownloadable
      maxCacheSize
      mimeType
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
      enrollmentId
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
        content
        duration
        fileName
        filePath
        fileSize
        fileUrl
        encryptionKey
        isDownloadable
        maxCacheSize
        mimeType
      }
      student {
        id
        firstName
        lastName
        username
        email
        lastLoginAt
        currentSessionToken
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

export const BULK_REMOVE_MODULES = gql`
  mutation BulkRemoveModules($bulkRemoveModulesInput: BulkRemoveModulesInput!) {
    bulkRemoveModules(bulkRemoveModulesInput: $bulkRemoveModulesInput) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

// Soft Delete Operations
export const SOFT_DELETE_MODULE = gql`
  mutation SoftDeleteModule($id: ID!) {
    softDeleteModule(id: $id) {
      deletedAt
      id
      message
    }
  }
`;

// Hard Delete Operations
export const HARD_DELETE_MODULE = gql`
  mutation HardDeleteModule($id: ID!) {
    hardDeleteModule(id: $id) {
      deleted
      id
      message
    }
  }
`;

// Restore Operations
export const RESTORE_MODULE = gql`
  mutation RestoreModule($id: ID!) {
    restoreModule(id: $id) {
      restoredAt
      id
      message
    }
  }
`;

// Bulk Delete Operations
export const BULK_SOFT_DELETE_MODULES = gql`
  mutation BulkSoftDeleteModules($ids: [String!]!) {
    bulkSoftDeleteModules(ids: $ids) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_HARD_DELETE_MODULES = gql`
  mutation BulkHardDeleteModules($ids: [String!]!) {
    bulkHardDeleteModules(ids: $ids) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_RESTORE_MODULES = gql`
  mutation BulkRestoreModules($ids: [String!]!) {
    bulkRestoreModules(ids: $ids) {
      success
      restoredCount
      restoredIds
      failedIds
      errorMessages
    }
  }
`;
