import { useMutation, useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import { Edit, Trash2, FileText, Users, Eye, Upload } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type {
  FormField,
  UpdateFormField,
} from "../components/shared/DynamicDialogs";
import {
  ConfirmDeleteDialog,
  DynamicCreateDialog,
  DynamicUpdateDialog,
} from "../components/shared/DynamicDialogs";
import AssignmentFileUploadDialog from "../components/shared/AssignmentFileUploadDialog";
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
import type {
  CreateAssignmentInput,
  UpdateAssignmentInput,
  Assignment,
  AssignmentFilterInput,
} from "../generated/graphql";
import { ASSIGNMENTS } from "../graphql/query/assignment";
import { BATCH } from "../graphql/query/batch";
import {
  TOGGLE_ASSIGNMENT_ACTIVE,
  CREATE_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  HARD_DELETE_ASSIGNMENT,
  BULK_HARD_DELETE_ASSIGNMENTS,
} from "../graphql/mutation/assignment";
import toast from "react-hot-toast";

const Assignments: React.FC = () => {
  const navigate = useNavigate();
  const { batchId } = useParams<{ batchId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([]);
  const [isActiveFilter, setIsActiveFilter] = useState<string>("");

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [descriptionDialogOpen, setDescriptionDialogOpen] = useState(false);
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [fileUploadData, setFileUploadData] = useState<{
    assignmentId: string;
    assignmentTitle: string;
  } | null>(null);
  const [assignmentToUpdate, setAssignmentToUpdate] =
    useState<Assignment | null>(null);
  const [assignmentToToggle, setAssignmentToToggle] =
    useState<Assignment | null>(null);
  const [assignmentToDelete, setAssignmentToDelete] =
    useState<Assignment | null>(null);
  const [assignmentsToDelete, setAssignmentsToDelete] = useState<string[]>([]);

  // Loading states for operations
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  // Fetch specific batch if batchId is provided
  const { data: batchData } = useQuery(BATCH, {
    variables: { id: batchId! },
    skip: !batchId,
  });

  // Build filter based on search term
  const filter: AssignmentFilterInput = {
    batchId,
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

  const { data, loading, error, refetch } = useQuery(ASSIGNMENTS, {
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
  const [createAssignment] = useMutation(CREATE_ASSIGNMENT, {
    onCompleted: () => {
      toast.success("Assignment created successfully");
      refetch(); // Refresh the assignments list
      setCreateDialogOpen(false); // Close create dialog
    },
    onError: (error) => {
      console.error("Error creating assignment:", error);
      toast.error(`Error creating assignment: ${error.message}`);
    },
  });

  const [updateAssignment] = useMutation(UPDATE_ASSIGNMENT, {
    onCompleted: () => {
      toast.success("Assignment updated successfully");
      refetch(); // Refresh the assignments list
      setUpdateDialogOpen(false); // Close update dialog
      setAssignmentToUpdate(null); // Clear selected assignment
    },
    onError: (error) => {
      console.error("Error updating assignment:", error);
      toast.error(`Error updating assignment: ${error.message}`);
    },
  });

  const [toggleAssignmentActive] = useMutation(TOGGLE_ASSIGNMENT_ACTIVE, {
    onCompleted: () => {
      toast.success("Assignment status updated successfully");
      refetch(); // Refresh the assignments list
      setToggleDialogOpen(false);
      setAssignmentToToggle(null);
    },
    onError: (error) => {
      console.error("Error toggling assignment status:", error);
      toast.error(`Error toggling assignment status: ${error.message}`);
    },
  });

  const [deleteAssignment] = useMutation(HARD_DELETE_ASSIGNMENT, {
    onCompleted: () => {
      toast.success("Assignment deleted successfully");
      refetch(); // Refresh the assignments list
      setDeleteDialogOpen(false);
      setAssignmentToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting assignment:", error);
      toast.error(`Error deleting assignment: ${error.message}`);
    },
  });

  const [bulkDeleteAssignments] = useMutation(BULK_HARD_DELETE_ASSIGNMENTS, {
    onCompleted: () => {
      if (assignmentsToDelete.length === 1) {
        toast.success("Assignment deleted successfully");
      } else {
        toast.success(
          `${assignmentsToDelete.length} assignments deleted successfully`
        );
      }
      refetch(); // Refresh the assignments list
      setBulkDeleteDialogOpen(false); // Close bulk delete dialog
      setSelectedAssignments([]); // Clear selection
      setAssignmentsToDelete([]); // Clear assignments to delete
    },
    onError: (error) => {
      console.error("Error bulk deleting assignments:", error);
      toast.error(`Error bulk deleting assignments: ${error.message}`);
    },
  });

  // CRUD Functions - Ready for integration with forms/modals
  const handleCreateAssignment = async (formData: Record<string, any>) => {
    setCreateLoading(true);
    try {
      const createAssignmentInput: CreateAssignmentInput = {
        title: formData.title,
        description: formData.description,
        batchId: batchId!, // Use batchId from URL if not provided in form
        dueDate: formData.dueDate || null,
        allowTextSubmission: formData.allowTextSubmission !== undefined ? formData.allowTextSubmission : true,
        allowFileSubmission: formData.allowFileSubmission !== undefined ? formData.allowFileSubmission : true,
        allowVoiceSubmission: formData.allowVoiceSubmission !== undefined ? formData.allowVoiceSubmission : true,
        allowResubmission: formData.allowResubmission !== undefined ? formData.allowResubmission : true,
        maxResubmissions: formData.maxResubmissions !== undefined ? formData.maxResubmissions : 2,
        isActive: formData.isActive !== undefined ? formData.isActive : true,
      };

      await createAssignment({
        variables: { createAssignmentInput },
      });
    } catch (error) {
      console.error("Failed to create assignment:", error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateAssignment = async (
    id: string,
    formData: Record<string, any>
  ) => {
    setUpdateLoading(true);
    try {
      const updateAssignmentInput: UpdateAssignmentInput = {
        ...(formData.title && { title: formData.title }),
        ...(formData.description !== undefined && {
          description: formData.description,
        }),
        batchId,
        ...(formData.dueDate !== undefined && { dueDate: formData.dueDate }),
        ...(formData.isActive !== undefined && { isActive: formData.isActive }),
      };

      await updateAssignment({
        variables: { id, updateAssignmentInput },
      });
    } catch (error) {
      console.error("Failed to update assignment:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Toggle operation handler
  const handleToggleAssignment = async (id: string) => {
    setToggleLoading(true);
    try {
      await toggleAssignmentActive({
        variables: { id },
      });
      setToggleDialogOpen(false);
      setAssignmentToToggle(null);
    } catch (error) {
      console.error("Failed to toggle assignment status:", error);
    } finally {
      setToggleLoading(false);
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    setDeleteLoading(true);
    try {
      await deleteAssignment({
        variables: { id },
      });
      setDeleteDialogOpen(false);
      setAssignmentToDelete(null);
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBulkDeleteAssignments = async (assignmentIds: string[]) => {
    setBulkDeleteLoading(true);
    try {
      await bulkDeleteAssignments({
        variables: { ids: assignmentIds },
      });
      setBulkDeleteDialogOpen(false);
      setAssignmentsToDelete([]);
    } catch (error) {
      console.error("Failed to bulk delete assignments:", error);
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  // Form field configurations
  const createAssignmentFields: FormField[] = [
    {
      name: "title",
      type: "text",
      label: "Assignment Title",
      placeholder: "Enter assignment title",
      required: true,
      className: "col-span-full",
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Assignment title must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "description",
      type: "richtext",
      label: "Description",
      placeholder: "Enter assignment description",
      required: true,
      minHeight: 200,
      className: "col-span-full",
    },
    {
      name: "dueDate",
      type: "datetime-local",
      label: "Due Date",
      placeholder: "Select due date",
      required: false,
    },
    {
      name: "allowTextSubmission",
      type: "switch",
      label: "Allow Text Submission",
      description: "Allow students to submit text responses",
      defaultValue: true,
    },
    {
      name: "allowFileSubmission",
      type: "switch",
      label: "Allow File Submission",
      description: "Allow students to upload files (documents, images, videos)",
      defaultValue: true,
    },
    {
      name: "allowVoiceSubmission",
      type: "switch",
      label: "Allow Voice Submission",
      description: "Allow students to submit voice recordings",
      defaultValue: true,
    },
    {
      name: "allowResubmission",
      type: "switch",
      label: "Allow Resubmission",
      description: "Allow students to resubmit their assignments",
      defaultValue: true,
    },
    {
      name: "maxResubmissions",
      type: "number",
      label: "Max Resubmissions",
      placeholder: "Enter maximum resubmissions (optional)",
      required: false,
      min: 1,
      description: "Maximum number of times a student can resubmit",
      defaultValue: 2,
    },
    {
      name: "isActive",
      type: "switch",
      label: "Active Status",
      defaultValue: true,
    },
  ];

  const updateAssignmentFields: UpdateFormField[] = [
    {
      name: "title",
      type: "text",
      label: "Assignment Title",
      placeholder: "Enter assignment title",
      required: true,
      initialValue: assignmentToUpdate?.title || "",
      className: "col-span-full",
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Assignment title must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "description",
      type: "richtext",
      label: "Description",
      placeholder: "Enter assignment description",
      required: true,
      initialValue: assignmentToUpdate?.description || "",
      minHeight: 200,
      className: "col-span-full",
    },
    {
      name: "dueDate",
      type: "datetime-local",
      label: "Due Date",
      placeholder: "Select due date",
      required: false,
      initialValue: assignmentToUpdate?.dueDate
        ? new Date(assignmentToUpdate.dueDate).toISOString().slice(0, 16)
        : "",
    },
    {
      name: "isActive",
      type: "switch",
      label: "Active Status",
      initialValue: assignmentToUpdate?.isActive || false,
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
  const columns: TableColumn<Assignment>[] = [
    {
      key: "title",
      title: "Assignment Title",
      sortable: true,
      render: (value: string) => (
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {value}
        </p>
      ),
    },
    {
      key: "description",
      title: "Description",
      render: (value: string, row: Assignment) => (
        <div className="flex justify-center">
          <button
            onClick={() => {
              setSelectedDescription({
                title: row.title,
                description: value || "",
              });
              setDescriptionDialogOpen(true);
            }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            title="View Description"
          >
            <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      ),
      align: "center",
    },
    {
      key: "batch",
      title: "Batch",
      render: (value: any) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {value ? value.name : "-"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {value?.course?.title || "-"}
          </p>
        </div>
      ),
    },
    {
      key: "dueDate",
      title: "Due Date",
      sortable: true,
      render: (value: string | null) => (
        <div className="text-sm">
          {value ? (
            <>
              <p className="text-gray-900 dark:text-gray-100">
                {new Date(value).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(value).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No due date</p>
          )}
        </div>
      ),
    },
    {
      key: "submissions",
      title: "Submissions",
      render: (value: any[] | null, row: Assignment) => (
        <div className="text-sm text-center">
          <button
            onClick={() =>
              navigate(`/assignments/${row.id}/assignment-submissions`)
            }
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 transition-colors cursor-pointer"
          >
            {value ? value.length : 0} submissions
          </button>
        </div>
      ),

      align: "center",
    },
    {
      key: "assignmentFiles",
      title: "File Info",
      render: (value: any[] | null) => (
        <div className="text-sm">
          {value && value.length > 0 ? (
            <div className="space-y-1">
              <p className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-32">
                {value.length} file{value.length > 1 ? 's' : ''}
              </p>
              {value[0].fileSize && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(value.reduce((acc: number, file: any) => acc + (file.fileSize || 0), 0) / 1024 / 1024).toFixed(2)} MB total
                </p>
              )}
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 dark:text-green-400">
                  Available
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                No files
              </span>
            </div>
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
  const actions: TableAction<Assignment>[] = [
    {
      label: "View Submissions",
      onClick: (assignment: Assignment) => {
        navigate(`/assignments/${assignment.id}/assignment-submissions`);
      },
      icon: Users,
    },
    {
      label: "Upload Files",
      onClick: (assignment: Assignment) => {
        setFileUploadData({
          assignmentId: assignment.id,
          assignmentTitle: assignment.title,
        });
        setFileUploadDialogOpen(true);
      },
      icon: Upload,
    },
    {
      label: "Edit Assignment",
      onClick: (assignment: Assignment) => {
        setAssignmentToUpdate(assignment);
        setUpdateDialogOpen(true);
      },
      icon: Edit,
    },
    {
      label: "Toggle Status",
      onClick: (assignment: Assignment) => {
        setAssignmentToToggle(assignment);
        setToggleDialogOpen(true);
      },
      icon: Trash2,
    },
    {
      label: "Delete Assignment",
      onClick: (assignment: Assignment) => {
        setAssignmentToDelete(assignment);
        setDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
  ];

  // Bulk actions for selected assignments
  const bulkActions: BulkAction[] = [
    {
      label: "Delete Selected",
      onClick: (selectedIds: string[]) => {
        setAssignmentsToDelete(selectedIds);
        setBulkDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
    {
      label: "Activate Selected",
      onClick: (_selectedIds: string[]) => {
        setSelectedAssignments([]);
      },
      icon: FileText,
    },
  ];

  // Handle add new assignment
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
    setSelectedAssignments(selectedIds);
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((filterKey: string, value: string) => {
    if (filterKey === "isActive") {
      setIsActiveFilter(value);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Prepare data for the table
  const assignments = (data?.assignments?.data || []).filter(
    (assignment: Assignment | null): assignment is Assignment =>
      assignment !== null
  );
  const meta: PaginationMeta = {
    page: data?.assignments?.meta?.page || 1,
    limit: data?.assignments?.meta?.limit || 10,
    total: data?.assignments?.meta?.total || 0,
    totalPages: data?.assignments?.meta?.totalPages || 1,
    hasNext: data?.assignments?.meta?.hasNext || false,
    hasPrev: data?.assignments?.meta?.hasPrev || false,
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <FileText className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Error Loading Assignments
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
      {/* Assignments Table */}
      <div className="w-full">
        <DynamicTable
          data={assignments}
          columns={columns}
          meta={meta}
          loading={loading}
          title={
            batchData?.batch
              ? `${batchData.batch.name} - Assignments`
              : "Assignments Management"
          }
          selectable={true}
          actions={actions}
          bulkActions={bulkActions}
          filters={tableFilters}
          selectedRows={selectedAssignments}
          onSelectionChange={handleSelectionChange}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onAddNew={handleAddNew}
          addNewLabel="Add Assignment"
          rowKey="id"
          emptyMessage="No assignments found"
          className="bg-white dark:bg-gray-900"
        />
      </div>

      {/* Create Assignment Dialog */}
      <DynamicCreateDialog
        title="Create New Assignment"
        fields={createAssignmentFields}
        onSubmit={handleCreateAssignment}
        submitLabel="Create Assignment"
        isLoading={createLoading}
        open={createDialogOpen}
        setOpen={setCreateDialogOpen}
      />

      {/* Update Assignment Dialog */}
      {assignmentToUpdate && (
        <DynamicUpdateDialog
          id={assignmentToUpdate.id}
          title="Update Assignment"
          fields={updateAssignmentFields}
          onSubmit={handleUpdateAssignment}
          submitLabel="Update Assignment"
          isLoading={updateLoading}
          open={updateDialogOpen}
          setOpen={setUpdateDialogOpen}
        />
      )}

      {/* Single Assignment Toggle Status Confirmation Dialog */}
      {assignmentToToggle && (
        <ConfirmDeleteDialog
          title="Toggle Assignment Status"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to {assignmentToToggle.isActive ? 'deactivate' : 'activate'} the assignment{" "}
                <strong>{assignmentToToggle.title}</strong>?
              </p>
            </div>
          }
          description={`This action will ${assignmentToToggle.isActive ? 'deactivate' : 'activate'} the assignment`}
          onConfirm={() => handleToggleAssignment(assignmentToToggle.id)}
          isLoading={toggleLoading}
          open={toggleDialogOpen}
          setOpen={setToggleDialogOpen}
          confirmLabel="Toggle Status"
        />
      )}

      {/* Single Assignment Delete Confirmation Dialog */}
      {assignmentToDelete && (
        <ConfirmDeleteDialog
          title="Delete Assignment"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete the assignment{" "}
                <strong>{assignmentToDelete.title}</strong>?
              </p>
            </div>
          }
          description="This action will permanently delete the assignment and cannot be undone"
          onConfirm={() => handleDeleteAssignment(assignmentToDelete.id)}
          isLoading={deleteLoading}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          confirmLabel="Delete"
        />
      )}

      {/* Bulk Delete Confirmation Dialog */}
      {assignmentsToDelete.length > 0 && (
        <ConfirmDeleteDialog
          title={`Delete ${assignmentsToDelete.length} Assignments`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete{" "}
                <strong>{assignmentsToDelete.length}</strong> selected
                assignments?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">
                  Assignments to be deleted:
                </p>
                <ul className="text-sm space-y-1">
                  {assignmentsToDelete.map((assignmentId) => {
                    const assignment = assignments.find(
                      (a: Assignment) => a.id === assignmentId
                    );
                    return assignment ? (
                      <li key={assignmentId} className="flex justify-between">
                        <span>{assignment.title}</span>
                        <span className="text-gray-500">
                          {assignment.batch?.name || "No Batch"}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          }
          description="This action will permanently delete the assignments and cannot be undone"
          onConfirm={() => handleBulkDeleteAssignments(assignmentsToDelete)}
          isLoading={bulkDeleteLoading}
          open={bulkDeleteDialogOpen}
          setOpen={setBulkDeleteDialogOpen}
          confirmLabel={`Delete ${assignmentsToDelete.length} Assignments`}
        />
      )}

      {/* Description View Dialog */}
      {selectedDescription && (
        <Dialog open={descriptionDialogOpen} onOpenChange={setDescriptionDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedDescription.title} - Description</DialogTitle>
            </DialogHeader>
            <div 
              className="prose prose-sm max-w-none dark:prose-invert overflow-y-auto border rounded-md p-4 bg-gray-50 dark:bg-gray-900"
              style={{ maxHeight: "400px" }}
              dangerouslySetInnerHTML={{ __html: selectedDescription.description || "<p class='text-gray-500'>No description available</p>" }}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Assignment File Upload Dialog */}
      {fileUploadData && (
        <AssignmentFileUploadDialog
          title="Upload Assignment Files"
          assignmentId={fileUploadData.assignmentId}
          assignmentTitle={fileUploadData.assignmentTitle}
          open={fileUploadDialogOpen}
          setOpen={(open) => {
            setFileUploadDialogOpen(open);
            if (!open) setFileUploadData(null);
          }}
          onUploadSuccess={() => {
            refetch();
            setFileUploadData(null);
          }}
        />
      )}
    </div>
  );
};

export default Assignments;
