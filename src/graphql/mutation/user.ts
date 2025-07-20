import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
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
  }
`;
