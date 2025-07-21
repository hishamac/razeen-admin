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
