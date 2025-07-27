import { gql } from "@apollo/client";

export const CHAPTER = gql`
  query Chapter($id: ID!) {
    chapter(id: $id) {
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
        deletedAt
        deletedBy
        creator {
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
  }
`;

export const CHAPTERS = gql`
  query Chapters($courseId: ID!) {
    chapters(courseId: $courseId) {
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
        }
      }
      modules {
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
          module {
            id
            title
            type
          }
        }
      }
    }
  }
`;

// Get Deleted Chapters
export const GET_DELETED_CHAPTERS = gql`
  query GetDeletedChapters {
    getDeletedChapters {
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
        isActive
        createdBy
        creator {
          id
          firstName
          lastName
          username
        }
      }
      modules {
        id
        title
        type
        orderIndex
        fileName
        fileUrl
        chapterId
        createdAt
        updatedAt
      }
    }
  }
`;

// Chapters Paginated
export const CHAPTERS_PAGINATED = gql`
  query ChaptersPaginated($filter: ChapterFilterInput, $pagination: PaginationInput, $sort: SortInput) {
    chaptersPaginated(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
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
          }
        }
        modules {
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
          studentProgress {
            id
            isCompleted
            completedAt
            studentId
            moduleId
            createdAt
            updatedAt
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
