import { gql } from "@apollo/client";

export const CHAPTER = gql`
  query Chapter($id: ID!) {
    chapter(id: $id) {
      courseId
      createdAt
      id
      orderIndex
      title
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
          email
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
  }
`;

export const CHAPTERS = gql`
  query Chapters($courseId: ID!) {
    chapters(courseId: $courseId) {
      courseId
      createdAt
      id
      orderIndex
      title
      updatedAt
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
  }
`;

// Get Deleted Chapters
export const GET_DELETED_CHAPTERS = gql`
  query GetDeletedChapters {
    getDeletedChapters {
      id
      title
      courseId
      orderIndex
      createdAt
      updatedAt
      deletedAt
      deletedBy
      course {
        id
        title
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
        courseId
        orderIndex
        createdAt
        updatedAt
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
        modules {
          id
          title
          type
          orderIndex
          fileName
          fileUrl
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
