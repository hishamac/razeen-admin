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

export const BULK_REMOVE_CHAPTERS = gql`
  mutation BulkRemoveChapters($bulkRemoveChaptersInput: BulkRemoveChaptersInput!) {
    bulkRemoveChapters(bulkRemoveChaptersInput: $bulkRemoveChaptersInput) {
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

// Soft Delete Operations
export const SOFT_DELETE_CHAPTER = gql`
  mutation SoftDeleteChapter($id: ID!) {
    softDeleteChapter(id: $id) {
      deletedAt
      id
      message
    }
  }
`;

// Hard Delete Operations
export const HARD_DELETE_CHAPTER = gql`
  mutation HardDeleteChapter($id: ID!) {
    hardDeleteChapter(id: $id) {
      deleted
      id
      message
    }
  }
`;

// Restore Operations
export const RESTORE_CHAPTER = gql`
  mutation RestoreChapter($id: ID!) {
    restoreChapter(id: $id) {
      restoredAt
      id
      message
    }
  }
`;

// Bulk Delete Operations
export const BULK_SOFT_DELETE_CHAPTERS = gql`
  mutation BulkSoftDeleteChapters($input: BulkDeleteInput!) {
    bulkSoftDeleteChapters(input: $input) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_HARD_DELETE_CHAPTERS = gql`
  mutation BulkHardDeleteChapters($input: BulkDeleteInput!) {
    bulkHardDeleteChapters(input: $input) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_RESTORE_CHAPTERS = gql`
  mutation BulkRestoreChapters($input: BulkRestoreInput!) {
    bulkRestoreChapters(input: $input) {
      success
      restoredCount
      restoredIds
      failedIds
      errorMessages
    }
  }
`;
