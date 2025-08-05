import { gql } from "@apollo/client";

export const MODULE = gql`
  query Module($id: ID!) {
    module(id: $id) {
      id
      title
      type
      orderIndex
      content
      duration
      encryptionKey
      fileName
      filePath
      fileSize
      fileUrl
      isDownloadable
      maxCacheSize
      mimeType
      chapterId
      createdAt
      updatedAt
      deletedAt
      deletedBy
      chapter {
        id
        title
        orderIndex
        courseId
        createdAt
        updatedAt
        deletedAt
        deletedBy
        course {
          id
          title
          description
          coverImage
          thumbnail
          isActive
          createdBy
          createdAt
          updatedAt
          creator {
            id
            firstName
            lastName
            username
            email
            phone
            role
            isActive
            lastLoginAt
            currentSessionToken
          }
          chapters {
            id
            title
            orderIndex
            createdAt
            updatedAt
          }
        }
        modules {
          id
          title
          type
          orderIndex
          content
          duration
          encryptionKey
          fileName
          filePath
          fileSize
          fileUrl
          isDownloadable
          maxCacheSize
          mimeType
          createdAt
          updatedAt
        }
      }
      studentProgress {
        id
        isCompleted
        completedAt
        studentId
        moduleId
        enrollmentId
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
          lastLoginAt
          currentSessionToken
          createdAt
          updatedAt
        }
        module {
          id
          title
          type
          orderIndex
          content
          duration
          encryptionKey
          fileName
          filePath
          fileSize
          fileUrl
          isDownloadable
          maxCacheSize
          mimeType
          chapterId
        }
      }
    }
  }
`;

export const MODULES = gql`
  query Modules($chapterId: ID!) {
    modules(chapterId: $chapterId) {
      id
      title
      type
      orderIndex
      content
      duration
      encryptionKey
      fileName
      filePath
      fileSize
      fileUrl
      isDownloadable
      maxCacheSize
      mimeType
      chapterId
      createdAt
      updatedAt
      deletedAt
      deletedBy
      chapter {
        id
        title
        orderIndex
        courseId
        createdAt
        updatedAt
        course {
          id
          title
          description
          isActive
          createdBy
        }
      }
      studentProgress {
        id
        isCompleted
        completedAt
        studentId
        moduleId
        enrollmentId
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
          lastLoginAt
          currentSessionToken
        }
        module {
          id
          title
          type
          orderIndex
          content
          duration
          encryptionKey
          fileName
          filePath
          fileSize
          fileUrl
          isDownloadable
          maxCacheSize
          mimeType
        }
      }
    }
  }
`;

export const MODULE_PROGRESS = gql`
  query ModuleProgress($moduleId: ID!) {
    moduleProgress(moduleId: $moduleId) {
      id
      isCompleted
      completedAt
      studentId
      moduleId
      enrollmentId
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
        lastLoginAt
        currentSessionToken
        createdAt
        updatedAt
      }
      module {
        id
        title
        type
        orderIndex
        content
        duration
        encryptionKey
        fileName
        filePath
        fileSize
        fileUrl
        isDownloadable
        maxCacheSize
        mimeType
        chapterId
        createdAt
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
            isActive
          }
        }
      }
    }
  }
`;

export const HAS_VALID_OFFLINE_CACHE = gql`
  query HasValidOfflineCache($moduleId: String!) {
    hasValidOfflineCache(moduleId: $moduleId)
  }
`;

// Get Deleted Modules
export const GET_DELETED_MODULES = gql`
  query GetDeletedModules {
    getDeletedModules {
      id
      title
      type
      orderIndex
      content
      duration
      encryptionKey
      fileName
      filePath
      fileSize
      fileUrl
      isDownloadable
      maxCacheSize
      mimeType
      chapterId
      createdAt
      updatedAt
      deletedAt
      deletedBy
      chapter {
        id
        title
        orderIndex
        courseId
        createdAt
        updatedAt
        course {
          id
          title
          description
          isActive
          createdBy
        }
      }
      studentProgress {
        id
        isCompleted
        completedAt
        studentId
        moduleId
        enrollmentId
        createdAt
        updatedAt
        student {
          id
          firstName
          lastName
          username
          lastLoginAt
          currentSessionToken
        }
      }
    }
  }
`;

// Modules Paginated
export const MODULES_PAGINATED = gql`
  query ModulesPaginated($filter: ModuleFilterInput, $pagination: PaginationInput, $sort: SortInput) {
    modulesPaginated(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        id
        title
        type
        orderIndex
        content
        duration
        encryptionKey
        fileName
        filePath
        fileSize
        fileUrl
        isDownloadable
        maxCacheSize
        mimeType
        chapterId
        createdAt
        updatedAt
        deletedAt
        deletedBy
        chapter {
          id
          title
          orderIndex
          courseId
          createdAt
          updatedAt
          course {
            id
            title
            description
            isActive
            createdBy
            creator {
              id
              firstName
              lastName
              username
              lastLoginAt
              currentSessionToken
            }
          }
        }
        studentProgress {
          id
          isCompleted
          completedAt
          studentId
          moduleId
          enrollmentId
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
            lastLoginAt
            currentSessionToken
          }
        }
      }
      meta {
        total
        page
        limit
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`;
