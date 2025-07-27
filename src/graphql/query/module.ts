import { gql } from "@apollo/client";

export const MODULE = gql`
  query Module($id: ID!) {
    module(id: $id) {
      id
      title
      type
      orderIndex
      fileName
      fileUrl
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
          fileName
          fileUrl
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
        module {
          id
          title
          type
          orderIndex
          fileName
          fileUrl
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
      fileName
      fileUrl
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
        }
        module {
          id
          title
          type
          orderIndex
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
      module {
        id
        title
        type
        orderIndex
        fileName
        fileUrl
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
      fileName
      fileUrl
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
        createdAt
        updatedAt
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

// Modules Paginated
export const MODULES_PAGINATED = gql`
  query ModulesPaginated($filter: ModuleFilterInput, $pagination: PaginationInput, $sort: SortInput) {
    modulesPaginated(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        id
        title
        type
        orderIndex
        fileName
        fileUrl
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
            }
          }
        }
        studentProgress {
          id
          isCompleted
          completedAt
          studentId
          moduleId
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
