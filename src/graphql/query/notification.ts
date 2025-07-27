import { gql } from "@apollo/client";

export const NOTIFICATIONS = gql`
  query Notifications($filter: NotificationFilterInput, $pagination: PaginationInput, $sort: SortInput) {
    notifications(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        id
        title
        message
        type
        isRead
        relatedId
        userId
        createdAt
        updatedAt
        user {
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

export const MY_NOTIFICATIONS = gql`
  query MyNotifications($filter: NotificationFilterInput, $pagination: PaginationInput, $sort: SortInput) {
    myNotifications(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        id
        title
        message
        type
        isRead
        relatedId
        userId
        createdAt
        updatedAt
        user {
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

export const UNREAD_NOTIFICATION_COUNT = gql`
  query UnreadNotificationCount {
    unreadNotificationCount
  }
`;
