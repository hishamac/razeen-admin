import { useMutation } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import { Edit, Eye, Trash2, Users as UsersIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
  UserFilterInput,
} from "../../generated/graphql";
import { UserRole, useUsersQuery } from "../../generated/graphql";
import {
  CREATE_USER,
  REMOVE_USER,
  UPDATE_USER,
} from "../../graphql/mutation/user";
import type { FormField, UpdateFormField } from "../shared/DynamicDialogs";
import {
  ConfirmDeleteDialog,
  DynamicCreateDialog,
  DynamicUpdateDialog,
} from "../shared/DynamicDialogs";
import type {
  BulkAction,
  PaginationMeta,
  TableAction,
  TableColumn,
} from "../shared/Table";
import DynamicTable from "../shared/Table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const Students: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [usersToDelete, setUsersToDelete] = useState<string[]>([]);

  // Build filter based on search term
  const filter: UserFilterInput = {
    role: UserRole.Student,
    ...(searchTerm && {
      search: searchTerm,
    }),
  };

  // Build sort input
  const sort = sortKey ? { field: sortKey, order: sortDirection } : undefined;

  const { data, loading, error, refetch } = useUsersQuery({
    variables: {
      filter,
      pagination: {
        page: currentPage,
        limit: pageSize,
      },
      sort,
    },
  });

  // Mutation hooks
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      refetch(); // Refresh the users list
      setCreateDialogOpen(false); // Close create dialog
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      alert(`Error creating user: ${error.message}`);
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      refetch(); // Refresh the users list
      setUpdateDialogOpen(false); // Close update dialog
      setUserToUpdate(null); // Clear selected user
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      alert(`Error updating user: ${error.message}`);
    },
  });

  const [removeUser] = useMutation(REMOVE_USER, {
    onCompleted: () => {
      refetch(); // Refresh the users list
      setSelectedUsers([]); // Clear selection
    },
    onError: (error) => {
      console.error("Error removing user:", error);
      alert(`Error removing user: ${error.message}`);
    },
  });

  // CRUD Functions - Ready for integration with forms/modals
  const handleCreateUser = async (formData: Record<string, any>) => {
    try {
      const createUserInput: CreateUserInput = {
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        phone: formData.phone || null,
        role: UserRole.Student,
      };

      await createUser({
        variables: { createUserInput },
      });
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleUpdateUser = async (
    id: string,
    formData: Record<string, any>
  ) => {
    try {
      const updateUserInput: UpdateUserInput = {
        ...(formData.username && { username: formData.username }),
        ...(formData.email && { email: formData.email }),
        ...(formData.firstName && { firstName: formData.firstName }),
        ...(formData.lastName && { lastName: formData.lastName }),
        ...(formData.phone !== undefined && { phone: formData.phone }),
        ...(formData.role && { role: formData.role }),
        ...(formData.isActive !== undefined && { isActive: formData.isActive }),
      };

      await updateUser({
        variables: { id, updateUserInput },
      });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // Delete operation handlers
  const handleRemoveUser = async (id: string) => {
    try {
      await removeUser({
        variables: { id },
      });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Failed to remove user:", error);
    }
  };

  const handleBulkRemoveUsers = async (userIds: string[]) => {
    try {
      // Execute all remove mutations in parallel
      await Promise.all(userIds.map((id) => removeUser({ variables: { id } })));
      setBulkDeleteDialogOpen(false);
      setUsersToDelete([]);
      setSelectedUsers([]);
    } catch (error) {
      console.error("Failed to bulk remove users:", error);
    }
  };

  // Form field configurations
  const createUserFields: FormField[] = [
    {
      name: "username",
      type: "text",
      label: "Username",
      placeholder: "Enter username",
      required: true,
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Username must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter email address",
      required: true,
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          return {
            valid: false,
            message: "Please enter a valid email address",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Enter first name",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Enter last name",
      required: true,
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "Enter phone number",
      required: false,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      required: true,
      validation: (value) => {
        if (!value || value.length < 6) {
          return {
            valid: false,
            message: "Password must be at least 6 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
  ];

  const updateUserFields: UpdateFormField[] = [
    {
      name: "username",
      type: "text",
      label: "Username",
      placeholder: "Enter username",
      required: true,
      initialValue: userToUpdate?.username || "",
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Username must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      required: false,
      initialValue: "",
      validation: (value) => {
        if (value && value.length < 6) {
          return {
            valid: false,
            message: "Password must be at least 6 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter email address",
      required: true,
      initialValue: userToUpdate?.email || "",
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          return {
            valid: false,
            message: "Please enter a valid email address",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Enter first name",
      required: true,
      initialValue: userToUpdate?.firstName || "",
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Enter last name",
      required: true,
      initialValue: userToUpdate?.lastName || "",
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "Enter phone number",
      required: false,
      initialValue: userToUpdate?.phone || "",
    },
    {
      name: "isActive",
      type: "switch",
      label: "Active Status",
      initialValue: userToUpdate?.isActive || false,
    },
  ];

  // Table columns configuration
  const columns: TableColumn<User>[] = [
    {
      key: "name",
      title: "Full Name",
      sortable: true,
      render: (value: string, user: User) => (
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {user.firstName} {user.lastName}
        </p>
      ),
      width: "auto",
    },
    {
      key: "username",
      title: "Username",
      sortable: true,
      width: "auto",
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
      width: "auto",
    },
    {
      key: "phone",
      title: "Phone",
      render: (value: string | null) => value || "-",
      width: "auto",
    },
    {
      key: "isActive",
      title: "Status",
      sortable: true,
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Active" : "Inactive"}
        </Badge>
      ),
      width: "100px",
      align: "center",
    },
    {
      key: "createdAt",
      title: "Created",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900 dark:text-gray-100">
          <p className="truncate">{new Date(value).toLocaleDateString()}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {formatDistanceToNow(new Date(value), { addSuffix: true })}
          </p>
        </div>
      ),
      width: "auto",
    },
  ];

  // Table actions
  const actions: TableAction<User>[] = [
    {
      label: "View Details",
      onClick: (user: User) => {
        console.log("View user:", user.id);
        // TODO: Add navigation logic here - could open a modal or navigate to details page
      },
      icon: Eye,
    },
    {
      label: "Edit User",
      onClick: (user: User) => {
        setUserToUpdate(user);
        setUpdateDialogOpen(true);
      },
      icon: Edit,
    },
    {
      label: "Delete User",
      onClick: (user: User) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
  ];

  // Bulk actions for selected users
  const bulkActions: BulkAction[] = [
    {
      label: "Delete Selected",
      onClick: (selectedIds: string[]) => {
        setUsersToDelete(selectedIds);
        setBulkDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
    {
      label: "Activate Selected",
      onClick: (selectedIds: string[]) => {
        console.log("Bulk activate users:", selectedIds);
        // Add bulk activate logic here
        setSelectedUsers([]);
      },
      icon: UsersIcon,
    },
  ];

  // Handle add new user
  const handleAddNew = () => {
    setCreateDialogOpen(true);
  };

  // Event handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    setPageSize(limit);
    setCurrentPage(1); // Reset to first page when changing limit
  }, []);

  const handleSortChange = useCallback(
    (key: string, direction: "asc" | "desc") => {
      setSortKey(key);
      setSortDirection(direction);
    },
    []
  );

  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedUsers(selectedIds);
  }, []);

  // Prepare data for the table
  const users = (data?.users?.data || []).filter(
    (user): user is User => user !== null
  );
  const meta: PaginationMeta = {
    page: data?.users?.meta?.page || 1,
    limit: data?.users?.meta?.limit || 10,
    total: data?.users?.meta?.total || 0,
    totalPages: data?.users?.meta?.totalPages || 1,
    hasNext: data?.users?.meta?.hasNext || false,
    hasPrev: data?.users?.meta?.hasPrev || false,
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <Trash2 className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Error Loading Users
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {error.message}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden p-2">
      {/* Users Table */}
      <div className="w-full">
        <DynamicTable
          data={users}
          columns={columns}
          meta={meta}
          loading={loading}
          title="Students Management"
          selectable={true}
          actions={actions}
          bulkActions={bulkActions}
          selectedRows={selectedUsers}
          onSelectionChange={handleSelectionChange}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          onAddNew={handleAddNew}
          addNewLabel="Add User"
          rowKey="id"
          emptyMessage="No users found"
          className="bg-white dark:bg-gray-900"
        />
      </div>

      {/* Create User Dialog */}
      <DynamicCreateDialog
        title="Create New User"
        fields={createUserFields}
        onSubmit={handleCreateUser}
        submitLabel="Create User"
        isLoading={loading}
        open={createDialogOpen}
        setOpen={setCreateDialogOpen}
      />

      {/* Update User Dialog */}
      {userToUpdate && (
        <DynamicUpdateDialog
          id={userToUpdate.id}
          title="Update User"
          fields={updateUserFields}
          onSubmit={handleUpdateUser}
          submitLabel="Update User"
          isLoading={loading}
          open={updateDialogOpen}
          setOpen={setUpdateDialogOpen}
        />
      )}

      {/* Single User Delete Confirmation Dialog */}
      {userToDelete && (
        <ConfirmDeleteDialog
          title="Delete User"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete the user{" "}
                <strong>{userToDelete.username}</strong>?
              </p>
            </div>
          }
          description="This action will inactivate the user."
          onConfirm={() => handleRemoveUser(userToDelete.id)}
          isLoading={loading}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          confirmLabel="Delete"
        />
      )}

      {/* Bulk Delete Confirmation Dialog */}
      {usersToDelete.length > 0 && (
        <ConfirmDeleteDialog
          title={`Delete ${usersToDelete.length} Users`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete{" "}
                <strong>{usersToDelete.length}</strong> selected users?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">Users to be deleted:</p>
                <ul className="text-sm space-y-1">
                  {usersToDelete.map((userId) => {
                    const user = users.find((u) => u.id === userId);
                    return user ? (
                      <li key={userId} className="flex justify-between">
                        <span>{user.username}</span>
                        <span className="text-gray-500">{user.email}</span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          }
          description="This action cannot be undone. All data associated with these users will be permanently removed."
          onConfirm={() => handleBulkRemoveUsers(usersToDelete)}
          isLoading={loading}
          open={bulkDeleteDialogOpen}
          setOpen={setBulkDeleteDialogOpen}
          confirmLabel={`Delete ${usersToDelete.length} Users`}
        />
      )}
    </div>
  );
};

export default Students;
