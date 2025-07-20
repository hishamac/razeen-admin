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
