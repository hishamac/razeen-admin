import { gql } from "@apollo/client";

export const NOTIFICATIONS = gql`
  query Notifications($limit: Int) {
    notifications(limit: $limit)
  }
`;

export const UNREAD_NOTIFICATION_COUNT = gql`
  query UnreadNotificationCount {
    unreadNotificationCount
  }
`;
