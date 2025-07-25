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

// Get Deleted Modules
export const GET_DELETED_MODULES = gql`
  query GetDeletedModules {
    getDeletedModules {
      id
      title
      type
      chapterId
      orderIndex
      fileName
      fileUrl
      createdAt
      updatedAt
      deletedAt
      deletedBy
      chapter {
        id
        title
        courseId
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
        chapterId
        orderIndex
        fileName
        fileUrl
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
