import { gql } from "@apollo/client";

export const CREATE_CHAPTER = gql`
  mutation CreateChapter($createChapterInput: CreateChapterInput!) {
    createChapter(createChapterInput: $createChapterInput) {
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
          email
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

export const UPDATE_CHAPTER = gql`
  mutation UpdateChapter($id: ID!, $updateChapterInput: UpdateChapterInput!) {
    updateChapter(id: $id, updateChapterInput: $updateChapterInput) {
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
          email
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

export const REMOVE_CHAPTER = gql`
  mutation RemoveChapter($id: ID!) {
    removeChapter(id: $id) {
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
      }
    }
  }
`;

export const REORDER_CHAPTERS = gql`
  mutation ReorderChapters($courseId: ID!, $chapterIds: [ID!]!) {
    reorderChapters(courseId: $courseId, chapterIds: $chapterIds) {
      courseId
      createdAt
      id
      orderIndex
      title
      updatedAt
    }
  }
`;
