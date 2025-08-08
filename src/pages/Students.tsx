import { useMutation, useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import {
  Edit,
  Trash2,
  Users as UsersIcon,
  UserPlus,
  Upload,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import type {
  FormField,
  UpdateFormField,
} from "../components/shared/DynamicDialogs";
import {
  ConfirmDeleteDialog,
  DynamicCreateDialog,
  DynamicUpdateDialog,
} from "../components/shared/DynamicDialogs";
import ExcelBulkUploadDialog, {
  type FieldConfig,
} from "../components/shared/ExcelBulkUploadDialog";
import type {
  BulkAction,
  PaginationMeta,
  TableAction,
  TableColumn,
  TableFilter,
} from "../components/shared/Table";
import DynamicTable from "../components/shared/Table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
  UserFilterInput,
  Batch,
  BulkCreateUsersInput,
} from "../generated/graphql";
import { UserRole } from "../generated/graphql";
import { USERS } from "../graphql/query/user";
import { BATCHES } from "../graphql/query/batch";
import {
  BULK_REMOVE_USERS,
  CREATE_USER,
  REMOVE_USER,
  UPDATE_USER,
  HARD_DELETE_USER,
  BULK_HARD_DELETE_USERS,
  BULK_CREATE_USERS,
} from "../graphql/mutation/user";
import {
  ENROLL_STUDENT,
  BULK_ENROLL_STUDENTS,
} from "../graphql/mutation/enrollment";
import toast from "react-hot-toast";

const Students: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isActiveFilter, setIsActiveFilter] = useState<string>("");

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [bulkDeactivateDialogOpen, setBulkDeactivateDialogOpen] =
    useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [bulkEnrollDialogOpen, setBulkEnrollDialogOpen] = useState(false);
  const [bulkUploadDialogOpen, setBulkUploadDialogOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
  const [userToDeactivate, setUserToDeactivate] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToEnroll, setUserToEnroll] = useState<User | null>(null);
  const [usersToDeactivate, setUsersToDeactivate] = useState<string[]>([]);
  const [usersToDelete, setUsersToDelete] = useState<string[]>([]);
  const [usersToEnroll, setUsersToEnroll] = useState<string[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>("");

  // Loading states for operations
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deactivateLoading, setDeactivateLoading] = useState(false);
  const [bulkDeactivateLoading, setBulkDeactivateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [bulkEnrollLoading, setBulkEnrollLoading] = useState(false);
  const [bulkUploadLoading, setBulkUploadLoading] = useState(false);

  // Build filter based on search term
  const filter: UserFilterInput = {
    role: UserRole.Student,
    ...(searchTerm && {
      search: searchTerm,
    }),
    ...(isActiveFilter &&
      isActiveFilter !== "all" && {
        isActive: isActiveFilter === "true",
      }),
  };

  // Build sort input
  const sort = sortKey ? { field: sortKey, order: sortDirection } : undefined;

  const { data, loading, error, refetch } = useQuery(USERS, {
    variables: {
      filter,
      pagination: {
        page: currentPage,
        limit: pageSize,
      },
      sort,
    },
  });

  // Query for batches to populate the dropdown
  const { data: batchesData, loading: batchesLoading } = useQuery(BATCHES, {
    variables: {
      filter: { isActive: true },
      pagination: { page: 1, limit: 100 }, // Get first 100 active batches
    },
  });

  // Mutation hooks
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      toast.success("User created successfully");
      refetch(); // Refresh the users list
      setCreateDialogOpen(false); // Close create dialog
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      toast.error(`Error creating user: ${error.message}`);
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.success("User updated successfully");
      refetch(); // Refresh the users list
      setUpdateDialogOpen(false); // Close update dialog
      setUserToUpdate(null); // Clear selected user
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast.error(`Error updating user: ${error.message}`);
    },
  });

  const [removeUser] = useMutation(REMOVE_USER, {
    onCompleted: () => {
      toast.success("User deactivated successfully");
      refetch(); // Refresh the users list
      setDeactivateDialogOpen(false);
      setUserToDeactivate(null);
    },
    onError: (error) => {
      console.error("Error deactivating user:", error);
      toast.error(`Error deactivating user: ${error.message}`);
    },
  });

  const [removeManyUsers] = useMutation(BULK_REMOVE_USERS, {
    onCompleted: () => {
      if (usersToDeactivate.length === 1) {
        toast.success("User deactivated successfully");
      } else {
        toast.success(
          `${usersToDeactivate.length} users deactivated successfully`
        );
      }
      refetch(); // Refresh the users list
      setBulkDeactivateDialogOpen(false); // Close bulk deactivate dialog
      setSelectedUsers([]); // Clear selection
      setUsersToDeactivate([]); // Clear users to deactivate
    },
    onError: (error) => {
      console.error("Error bulk deactivating users:", error);
      toast.error(`Error bulk deactivating users: ${error.message}`);
    },
  });

  const [deleteUser] = useMutation(HARD_DELETE_USER, {
    onCompleted: () => {
      toast.success("User deleted successfully");
      refetch(); // Refresh the users list
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      toast.error(`Error deleting user: ${error.message}`);
    },
  });

  const [deleteManyUsers] = useMutation(BULK_HARD_DELETE_USERS, {
    onCompleted: () => {
      if (usersToDelete.length === 1) {
        toast.success("User deleted successfully");
      } else {
        toast.success(`${usersToDelete.length} users deleted successfully`);
      }
      refetch(); // Refresh the users list
      setBulkDeleteDialogOpen(false); // Close bulk delete dialog
      setSelectedUsers([]); // Clear selection
      setUsersToDelete([]); // Clear users to delete
    },
    onError: (error) => {
      console.error("Error bulk deleting users:", error);
      toast.error(`Error bulk deleting users: ${error.message}`);
    },
  });

  // Individual enrollment mutation
  const [enrollStudent] = useMutation(ENROLL_STUDENT, {
    onCompleted: () => {
      toast.success("Student enrolled successfully");
      refetch(); // Refresh the users list
      setEnrollDialogOpen(false);
      setUserToEnroll(null);
      setSelectedBatchId("");
    },
    onError: (error) => {
      console.error("Error enrolling student:", error);
      toast.error(`Error enrolling student: ${error.message}`);
    },
  });

  // Bulk enrollment mutation
  const [bulkEnrollStudents] = useMutation(BULK_ENROLL_STUDENTS, {
    onCompleted: () => {
      if (usersToEnroll.length === 1) {
        toast.success("Student enrolled successfully");
      } else {
        toast.success(`${usersToEnroll.length} students enrolled successfully`);
      }
      refetch(); // Refresh the users list
      setBulkEnrollDialogOpen(false); // Close bulk enroll dialog
      setSelectedUsers([]); // Clear selection
      setUsersToEnroll([]); // Clear users to enroll
      setSelectedBatchId(""); // Clear selected batch
    },
    onError: (error) => {
      console.error("Error bulk enrolling students:", error);
      toast.error(`Error bulk enrolling students: ${error.message}`);
    },
  });

  // Bulk create users mutation
  const [bulkCreateUsers] = useMutation(BULK_CREATE_USERS, {
    onCompleted: (data) => {
      const { successCount, failureCount, failedUsers } = data.bulkCreateUsers;
      if (failureCount > 0) {
        toast.success(
          `Successfully created ${successCount} users. ${failureCount} failed.\n\n ${failedUsers
            .map((user: string) => user)
            .join(", ")}`,
          { duration: 5000 }
        );
      } else {
        toast.success(`Successfully created ${successCount} users`);
      }
      refetch(); // Refresh the users list
      setBulkUploadDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error bulk creating users:", error);
      toast.error(`Error bulk creating users: ${error.message}`);
    },
  });

  // CRUD Functions - Ready for integration with forms/modals
  const handleCreateUser = async (formData: Record<string, any>) => {
    setCreateLoading(true);
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
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateUser = async (
    id: string,
    formData: Record<string, any>
  ) => {
    setUpdateLoading(true);
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
    } finally {
      setUpdateLoading(false);
    }
  };

  // Delete operation handlers
  const handleRemoveUser = async (id: string) => {
    setDeactivateLoading(true);
    try {
      await removeUser({
        variables: { id },
      });
      setDeactivateDialogOpen(false);
      setUserToDeactivate(null);
    } catch (error) {
      console.error("Failed to deactivate user:", error);
    } finally {
      setDeactivateLoading(false);
    }
  };

  const handleBulkRemoveUsers = async (userIds: string[]) => {
    setBulkDeactivateLoading(true);
    try {
      await removeManyUsers({
        variables: { bulkRemoveUsersInput: { userIds } },
      });
      setBulkDeactivateDialogOpen(false);
      setUsersToDeactivate([]);
    } catch (error) {
      console.error("Failed to bulk deactivate users:", error);
    } finally {
      setBulkDeactivateLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    setDeleteLoading(true);
    try {
      await deleteUser({
        variables: { id },
      });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBulkDeleteUsers = async (userIds: string[]) => {
    setBulkDeleteLoading(true);
    try {
      await deleteManyUsers({
        variables: { ids: userIds },
      });
      setBulkDeleteDialogOpen(false);
      setUsersToDelete([]);
    } catch (error) {
      console.error("Failed to bulk delete users:", error);
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  // Enrollment operation handlers
  const handleEnrollStudent = async (batchId: string, studentId: string) => {
    setEnrollLoading(true);
    try {
      await enrollStudent({
        variables: {
          batchId,
          studentId,
        },
      });
      setEnrollDialogOpen(false);
      setUserToEnroll(null);
      setSelectedBatchId("");
    } catch (error) {
      console.error("Failed to enroll student:", error);
    } finally {
      setEnrollLoading(false);
    }
  };

  const handleBulkEnrollStudents = async (
    batchId: string,
    studentIds: string[]
  ) => {
    setBulkEnrollLoading(true);
    try {
      await bulkEnrollStudents({
        variables: {
          bulkEnrollStudentsInput: {
            batchId,
            studentIds,
          },
        },
      });
      setBulkEnrollDialogOpen(false);
      setUsersToEnroll([]);
      setSelectedBatchId("");
    } catch (error) {
      console.error("Failed to bulk enroll students:", error);
    } finally {
      setBulkEnrollLoading(false);
    }
  };

  // Bulk upload operation handler
  const handleBulkUploadUsers = async (data: Record<string, any>[]) => {
    setBulkUploadLoading(true);
    try {
      const users: CreateUserInput[] = data.map((row) => ({
        username: row.username,
        email: row.email,
        firstName: row.firstName,
        lastName: row.lastName,
        password: row.password,
        phone: row.phone || null,
        role: UserRole.Student,
      }));

      const bulkCreateUsersInput: BulkCreateUsersInput = { users };

      await bulkCreateUsers({
        variables: { bulkCreateUsersInput },
      });
    } catch (error) {
      console.error("Failed to bulk create users:", error);
    } finally {
      setBulkUploadLoading(false);
    }
  };

  // Excel upload configuration
  const expectedColumns: FieldConfig[] = [
    {
      key: "username",
      label: "Username",
      type: "text",
      required: true,
      aliases: ["user", "login"],
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      required: true,
      aliases: ["mail", "email_address"],
    },
    {
      key: "firstName",
      label: "First Name",
      type: "text",
      required: true,
      aliases: ["first_name", "fname"],
    },
    {
      key: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
      aliases: ["last_name", "lname"],
    },
    {
      key: "phone",
      label: "Phone",
      type: "phone",
      required: false,
      aliases: ["mobile", "contact"],
    },
    {
      key: "password",
      label: "Password",
      type: "password",
      required: true,
      aliases: ["pass", "pwd"],
    },
  ];

  const templateData = [
    {
      username: "john.doe",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      password: "password123",
    },
  ];

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

  // Define table filters
  const tableFilters: TableFilter[] = [
    {
      key: "isActive",
      label: "Status",
      options: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
    },
  ];

  // Table columns configuration
  const columns: TableColumn<User>[] = [
    {
      key: "firstName",
      title: "First Name",
      sortable: true,
      render: (value: string) => (
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {value}
        </p>
      ),
    },
    {
      key: "lastName",
      title: "Last Name",
      sortable: true,
      render: (value: string) => (
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {value}
        </p>
      ),
    },
    {
      key: "username",
      title: "Username",
      sortable: true,
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
    },
    {
      key: "lastLoginAt",
      title: "Last Login",
      sortable: true,
      render: (value: string | null) => (
        <div className="text-sm text-gray-900 dark:text-gray-100">
          {value ? (
            <>
              <p className="truncate">{new Date(value).toLocaleDateString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {formatDistanceToNow(new Date(value), { addSuffix: true })}
              </p>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Never logged in
            </span>
          )}
        </div>
      ),
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
    },
  ];

  // Table actions
  const actions: TableAction<User>[] = [
    {
      label: "Edit User",
      onClick: (user: User) => {
        setUserToUpdate(user);
        setUpdateDialogOpen(true);
      },
      icon: Edit,
    },
    {
      label: "Enroll Student",
      onClick: (user: User) => {
        setUserToEnroll(user);
        setEnrollDialogOpen(true);
      },
      icon: UserPlus,
    },
    {
      label: "Deactivate User",
      onClick: (user: User) => {
        setUserToDeactivate(user);
        setDeactivateDialogOpen(true);
      },
      icon: Trash2,
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
      label: "Enroll Selected",
      onClick: (selectedIds: string[]) => {
        setUsersToEnroll(selectedIds);
        setBulkEnrollDialogOpen(true);
      },
      icon: UserPlus,
    },
    {
      label: "Deactivate Selected",
      onClick: (selectedIds: string[]) => {
        setUsersToDeactivate(selectedIds);
        setBulkDeactivateDialogOpen(true);
      },
      icon: Trash2,
    },
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
      onClick: () => {
        setSelectedUsers([]);
      },
      icon: UsersIcon,
    },
  ];

  // Handle add new user
  const handleAddNew = () => {
    setCreateDialogOpen(true);
  };

  // Handle bulk upload dialog
  const handleCreateMany = () => {
    setBulkUploadDialogOpen(true);
  };

  // Custom buttons for the table header
  const customButtons = [
    {
      label: "Create Many",
      onClick: handleCreateMany,
      variant: "outline" as const,
      icon: Upload,
    },
  ];

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

  // Handle filter changes
  const handleFilterChange = useCallback((filterKey: string, value: string) => {
    if (filterKey === "isActive") {
      setIsActiveFilter(value);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Prepare data for the table
  const users = (data?.users?.data || []).filter(
    (user: User | null): user is User => user !== null
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
    <div className="w-full max-w-full overflow-hidden">
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
          filters={tableFilters}
          selectedRows={selectedUsers}
          onSelectionChange={handleSelectionChange}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onAddNew={handleAddNew}
          addNewLabel="Add User"
          customButtons={customButtons}
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
        isLoading={createLoading}
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
          isLoading={updateLoading}
          open={updateDialogOpen}
          setOpen={setUpdateDialogOpen}
        />
      )}

      {/* Single User Deactivate Confirmation Dialog */}
      {userToDeactivate && (
        <ConfirmDeleteDialog
          title="Deactivate User"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to deactivate the user{" "}
                <strong>{userToDeactivate.username}</strong>?
              </p>
            </div>
          }
          description="This action will set the user's isActive status to false, and you can reactivate it later"
          onConfirm={() => handleRemoveUser(userToDeactivate.id)}
          isLoading={deactivateLoading}
          open={deactivateDialogOpen}
          setOpen={setDeactivateDialogOpen}
          confirmLabel="Deactivate"
        />
      )}

      {/* Single User Delete Confirmation Dialog */}
      {userToDelete && (
        <ConfirmDeleteDialog
          title="Delete User"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to permanently delete the user{" "}
                <strong>{userToDelete.username}</strong>?
              </p>
            </div>
          }
          description="This action will permanently delete the user and cannot be undone"
          onConfirm={() => handleDeleteUser(userToDelete.id)}
          isLoading={deleteLoading}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          confirmLabel="Delete"
        />
      )}

      {/* Bulk Deactivate Confirmation Dialog */}
      {usersToDeactivate.length > 0 && (
        <ConfirmDeleteDialog
          title={`Deactivate ${usersToDeactivate.length} Users`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to deactivate{" "}
                <strong>{usersToDeactivate.length}</strong> selected users?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">
                  Users to be deactivated:
                </p>
                <ul className="text-sm space-y-1">
                  {usersToDeactivate.map((userId) => {
                    const user = users.find((u: User) => u.id === userId);
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
          description="This action will set the users' isActive status to false, and you can reactivate them later"
          onConfirm={() => handleBulkRemoveUsers(usersToDeactivate)}
          isLoading={bulkDeactivateLoading}
          open={bulkDeactivateDialogOpen}
          setOpen={setBulkDeactivateDialogOpen}
          confirmLabel={`Deactivate ${usersToDeactivate.length} Users`}
        />
      )}

      {/* Bulk Delete Confirmation Dialog */}
      {usersToDelete.length > 0 && (
        <ConfirmDeleteDialog
          title={`Delete ${usersToDelete.length} Users`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to permanently delete{" "}
                <strong>{usersToDelete.length}</strong> selected users?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">Users to be deleted:</p>
                <ul className="text-sm space-y-1">
                  {usersToDelete.map((userId) => {
                    const user = users.find((u: User) => u.id === userId);
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
          description="This action will permanently delete the users and cannot be undone"
          onConfirm={() => handleBulkDeleteUsers(usersToDelete)}
          isLoading={bulkDeleteLoading}
          open={bulkDeleteDialogOpen}
          setOpen={setBulkDeleteDialogOpen}
          confirmLabel={`Delete ${usersToDelete.length} Users`}
        />
      )}

      {/* Single Student Enroll Dialog */}
      {userToEnroll && (
        <Dialog open={enrollDialogOpen} onOpenChange={setEnrollDialogOpen}>
          <DialogContent className="max-w-lg w-full mx-4">
            <DialogHeader>
              <DialogTitle>Enroll Student in Batch</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enrolling student:{" "}
                  <strong>
                    {userToEnroll.firstName} {userToEnroll.lastName}
                  </strong>{" "}
                  ({userToEnroll.username})
                </p>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Select Batch
                </label>
                <Select
                  value={selectedBatchId}
                  onValueChange={setSelectedBatchId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a batch..." />
                  </SelectTrigger>
                  <SelectContent className="max-w-[480px]">
                    {batchesLoading ? (
                      <SelectItem value="" disabled>
                        Loading batches...
                      </SelectItem>
                    ) : (
                      batchesData?.batches?.data
                        ?.filter((batch: Batch | null) => batch !== null)
                        .map((batch: Batch) => (
                          <SelectItem
                            key={batch.id}
                            value={batch.id}
                            className="max-w-full"
                          >
                            <div className="flex flex-col items-start py-1 w-full">
                              <span className="font-medium text-sm truncate w-full">
                                {batch.name}
                              </span>
                              <span className="text-xs text-gray-500 truncate w-full">
                                {batch.course?.title}
                              </span>
                            </div>
                          </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEnrollDialogOpen(false);
                    setUserToEnroll(null);
                    setSelectedBatchId("");
                  }}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    handleEnrollStudent(selectedBatchId, userToEnroll.id)
                  }
                  disabled={!selectedBatchId || enrollLoading}
                  className="w-full sm:w-auto"
                >
                  {enrollLoading ? "Enrolling..." : "Enroll Student"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Bulk Students Enroll Dialog */}
      {usersToEnroll.length > 0 && (
        <Dialog
          open={bulkEnrollDialogOpen}
          onOpenChange={setBulkEnrollDialogOpen}
        >
          <DialogContent className="max-w-3xl w-full mx-4">
            <DialogHeader>
              <DialogTitle>
                Enroll {usersToEnroll.length} Students in Batch
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enrolling <strong>{usersToEnroll.length}</strong> selected
                  students in a batch:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg max-h-40 overflow-y-auto">
                  <p className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
                    Students to be enrolled:
                  </p>
                  <ul className="text-sm space-y-2">
                    {usersToEnroll.map((userId) => {
                      const user = users.find((u: User) => u.id === userId);
                      return user ? (
                        <li
                          key={userId}
                          className="flex justify-between items-center py-1 px-2 bg-white dark:bg-gray-700 rounded border"
                        >
                          <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-xs ml-2 flex-shrink-0">
                            {user.username}
                          </span>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Select Batch
                </label>
                <Select
                  value={selectedBatchId}
                  onValueChange={setSelectedBatchId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a batch..." />
                  </SelectTrigger>
                  <SelectContent className="max-w-[600px]">
                    {batchesLoading ? (
                      <SelectItem value="" disabled>
                        Loading batches...
                      </SelectItem>
                    ) : (
                      batchesData?.batches?.data
                        ?.filter((batch: Batch | null) => batch !== null)
                        .map((batch: Batch) => (
                          <SelectItem
                            key={batch.id}
                            value={batch.id}
                            className="max-w-full"
                          >
                            <div className="flex flex-col items-start py-1 w-full">
                              <span className="font-medium text-sm truncate w-full">
                                {batch.name}
                              </span>
                              <span className="text-xs text-gray-500 truncate w-full">
                                {batch.course?.title}
                              </span>
                            </div>
                          </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setBulkEnrollDialogOpen(false);
                    setUsersToEnroll([]);
                    setSelectedBatchId("");
                  }}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    handleBulkEnrollStudents(selectedBatchId, usersToEnroll)
                  }
                  disabled={!selectedBatchId || bulkEnrollLoading}
                  className="w-full sm:w-auto"
                >
                  {bulkEnrollLoading
                    ? "Enrolling..."
                    : `Enroll ${usersToEnroll.length} Students`}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Excel Bulk Upload Dialog */}
      <ExcelBulkUploadDialog
        open={bulkUploadDialogOpen}
        setOpen={setBulkUploadDialogOpen}
        title="Bulk Upload Students"
        description="Upload an Excel file to create multiple student accounts at once"
        fields={expectedColumns}
        templateData={templateData}
        onSubmit={handleBulkUploadUsers}
        isSubmitting={bulkUploadLoading}
        templateFileName="students_template.xlsx"
      />
    </div>
  );
};

export default Students;
