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

export const LOGOUT = gql`
  mutation Mutation {
    logout
  }
`;

export const REGISTER = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
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

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
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

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $updateUserInput: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
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

export const REMOVE_USER = gql`
  mutation RemoveUser($id: ID!) {
    removeUser(id: $id) {
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
