import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      createdAt
      email
      firstName
      id
      isActive
      lastName
      phone
      role
      updatedAt
      username
    }
  }
`;

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      createdAt
      email
      firstName
      id
      isActive
      lastName
      phone
      role
      updatedAt
      username
    }
  }
`;

export const USERS = gql`
  query Users(
    $filter: UserFilterInput
    $pagination: PaginationInput
    $sort: SortInput
  ) {
    users(filter: $filter, pagination: $pagination, sort: $sort) {
      data {
        createdAt
        email
        firstName
        id
        isActive
        lastName
        phone
        role
        updatedAt
        username
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

export const STUDENTS = gql`
  query Students {
    students {
      createdAt
      email
      firstName
      id
      isActive
      lastName
      phone
      role
      updatedAt
      username
    }
  }
`;
