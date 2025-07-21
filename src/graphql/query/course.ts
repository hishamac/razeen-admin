import { gql } from "@apollo/client";

export const COURSE = gql`
  query Course($id: ID!) {
    course(id: $id) {
      createdAt
      createdBy
      description
      id
      isActive
      title
      updatedAt
      creator {
        id
        firstName
        lastName
        username
        email
        role
      }
      chapters {
        id
        title
        orderIndex
        courseId
        createdAt
        updatedAt
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
        createdAt
        createdBy
        description
        id
        isActive
        title
        updatedAt
        creator {
          id
          firstName
          lastName
          username
          email
        }
        chapters {
          id
          title
          orderIndex
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
        createdAt
        createdBy
        description
        id
        isActive
        title
        updatedAt
        creator {
          id
          firstName
          lastName
          username
          email
        }
        chapters {
          id
          title
          orderIndex
          modules {
            id
            title
            type
            orderIndex
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
