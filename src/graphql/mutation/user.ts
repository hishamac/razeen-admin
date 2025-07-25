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

export const BULK_CREATE_USERS = gql`
  mutation BulkCreateUsers($bulkCreateUsersInput: BulkCreateUsersInput!) {
    bulkCreateUsers(bulkCreateUsersInput: $bulkCreateUsersInput) {
      successCount
      failureCount
      totalProcessed
      createdUsers {
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
      failedUsers
    }
  }
`;

export const BULK_REMOVE_USERS = gql`
  mutation BulkRemoveUsers($bulkRemoveUsersInput: BulkRemoveUsersInput!) {
    bulkRemoveUsers(bulkRemoveUsersInput: $bulkRemoveUsersInput) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

// Soft Delete Operations
export const SOFT_DELETE_USER = gql`
  mutation SoftDeleteUser($id: ID!) {
    softDeleteUser(id: $id) {
      deletedAt
      deletedBy
      id
      message
    }
  }
`;

// Hard Delete Operations
export const HARD_DELETE_USER = gql`
  mutation HardDeleteUser($id: ID!, $force: Boolean) {
    hardDeleteUser(id: $id, force: $force) {
      deleted
      id
      message
    }
  }
`;

// Restore Operations
export const RESTORE_USER = gql`
  mutation RestoreUser($id: ID!) {
    restoreUser(id: $id) {
      restoredAt
      restoredBy
      id
      message
    }
  }
`;

// Bulk Delete Operations
export const BULK_SOFT_DELETE_USERS = gql`
  mutation BulkSoftDeleteUsers($ids: [String!]!) {
    bulkSoftDeleteUsers(ids: $ids) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_HARD_DELETE_USERS = gql`
  mutation BulkHardDeleteUsers($ids: [String!]!, $force: Boolean) {
    bulkHardDeleteUsers(ids: $ids, force: $force) {
      success
      deletedCount
      deletedIds
      failedIds
      errorMessages
    }
  }
`;

export const BULK_RESTORE_USERS = gql`
  mutation BulkRestoreUsers($ids: [String!]!) {
    bulkRestoreUsers(ids: $ids) {
      success
      restoredCount
      restoredIds
      failedIds
      errorMessages
    }
  }
`;
