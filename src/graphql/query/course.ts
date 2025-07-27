import { gql } from "@apollo/client";

export const COURSE = gql`
  query Course($id: ID!) {
    course(id: $id) {
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
        deletedAt
        deletedBy
      }
      chapters {
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
            courseId
          }
          studentProgress {
            id
            isCompleted
            completedAt
            studentId
            moduleId
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
  }
`;

export const COURSES = gql`
  query Courses(
    $filter: CourseFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    courses(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
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
          courseId
          createdAt
          updatedAt
          deletedAt
          deletedBy
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
      meta {
        hasNext
        hasPrev
        limit
        page
        total
        totalPages
      }
    }
  }
`;

export const MY_COURSES = gql`
  query MyCourses(
    $filter: CourseFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    myCourses(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
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
        }
        chapters {
          id
          title
          orderIndex
          courseId
          createdAt
          updatedAt
          deletedAt
          deletedBy
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
          }
        }
      }
      meta {
        hasNext
        hasPrev
        limit
        page
        total
        totalPages
      }
    }
  }
`;

export const COURSE_PROGRESS = gql`
  query CourseProgress($courseId: ID!) {
    courseProgress(courseId: $courseId)
  }
`;

export const COURSE_ANALYTICS = gql`
  query CourseAnalytics($courseId: ID) {
    courseAnalytics(courseId: $courseId)
  }
`;

export const CHECK_ENROLLMENT_ACCESS = gql`
  query CheckEnrollmentAccess($courseId: ID!) {
    checkEnrollmentAccess(courseId: $courseId)
  }
`;

// Get Deleted Courses
export const GET_DELETED_COURSES = gql`
  query GetDeletedCourses {
    getDeletedCourses {
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
      }
      chapters {
        id
        title
        orderIndex
        courseId
        createdAt
        updatedAt
        deletedAt
        deletedBy
      }
    }
  }
`;
