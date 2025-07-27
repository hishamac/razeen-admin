import { useMutation, useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import {
  Edit,
  Eye,
  Trash2,
  Calendar,
  Users,
  FileText,
  ClipboardCheck,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  FormField,
  UpdateFormField,
} from "../components/shared/DynamicDialogs";
import {
  ConfirmDeleteDialog,
  DynamicCreateDialog,
  DynamicUpdateDialog,
} from "../components/shared/DynamicDialogs";
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
import type {
  CreateBatchInput,
  UpdateBatchInput,
  Batch,
  BatchFilterInput,
  Course,
} from "../generated/graphql";
import { BATCHES } from "../graphql/query/batch";
import { COURSES } from "../graphql/query/course";
import {
  BULK_REMOVE_BATCHES,
  CREATE_BATCH,
  REMOVE_BATCH,
  UPDATE_BATCH,
  HARD_DELETE_BATCH,
  BULK_HARD_DELETE_BATCHES,
} from "../graphql/mutation/batch";
import toast from "react-hot-toast";

const Batches: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [isActiveFilter, setIsActiveFilter] = useState<string>("");
  const [courseIdFilter, setCourseIdFilter] = useState<string>("");

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [bulkDeactivateDialogOpen, setBulkDeactivateDialogOpen] =
    useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [batchToUpdate, setBatchToUpdate] = useState<Batch | null>(null);
  const [batchToDeactivate, setBatchToDeactivate] = useState<Batch | null>(
    null
  );
  const [batchToDelete, setBatchToDelete] = useState<Batch | null>(null);
  const [batchesToDeactivate, setBatchesToDeactivate] = useState<string[]>([]);
  const [batchesToDelete, setBatchesToDelete] = useState<string[]>([]);

  // Loading states for operations
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deactivateLoading, setDeactivateLoading] = useState(false);
  const [bulkDeactivateLoading, setBulkDeactivateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  // Build filter based on search term and filters
  const filter: BatchFilterInput = {
    ...(searchTerm && {
      search: searchTerm,
    }),
    ...(isActiveFilter &&
      isActiveFilter !== "all" && {
        isActive: isActiveFilter === "true",
      }),
    ...(courseIdFilter &&
      courseIdFilter !== "all" && {
        courseId: courseIdFilter,
      }),
  };

  // Build sort input
  const sort = sortKey ? { field: sortKey, order: sortDirection } : undefined;

  const { data, loading, error, refetch } = useQuery(BATCHES, {
    variables: {
      filter,
      pagination: {
        page: currentPage,
        limit: pageSize,
      },
      sort,
    },
  });

  // Get courses for the course filter dropdown
  const { data: coursesData } = useQuery(COURSES, {
    variables: {
      filter: { isActive: true },
      pagination: { page: 1, limit: 100 },
    },
  });

  // Mutation hooks
  const [createBatch] = useMutation(CREATE_BATCH, {
    onCompleted: () => {
      toast.success("Batch created successfully");
      refetch(); // Refresh the batches list
      setCreateDialogOpen(false); // Close create dialog
    },
    onError: (error) => {
      console.error("Error creating batch:", error);
      toast.error(`Error creating batch: ${error.message}`);
    },
  });

  const [updateBatch] = useMutation(UPDATE_BATCH, {
    onCompleted: () => {
      toast.success("Batch updated successfully");
      refetch(); // Refresh the batches list
      setUpdateDialogOpen(false); // Close update dialog
      setBatchToUpdate(null); // Clear selected batch
    },
    onError: (error) => {
      console.error("Error updating batch:", error);
      toast.error(`Error updating batch: ${error.message}`);
    },
  });

  const [removeBatch] = useMutation(REMOVE_BATCH, {
    onCompleted: () => {
      toast.success("Batch deactivated successfully");
      refetch(); // Refresh the batches list
      setDeactivateDialogOpen(false);
      setBatchToDeactivate(null);
    },
    onError: (error) => {
      console.error("Error deactivating batch:", error);
      toast.error(`Error deactivating batch: ${error.message}`);
    },
  });

  const [bulkRemoveBatches] = useMutation(BULK_REMOVE_BATCHES, {
    onCompleted: () => {
      if (batchesToDeactivate.length === 1) {
        toast.success("Batch deactivated successfully");
      } else {
        toast.success(
          `${batchesToDeactivate.length} batches deactivated successfully`
        );
      }
      refetch(); // Refresh the batches list
      setBulkDeactivateDialogOpen(false); // Close bulk deactivate dialog
      setSelectedBatches([]); // Clear selection
      setBatchesToDeactivate([]); // Clear batches to deactivate
    },
    onError: (error) => {
      console.error("Error bulk deactivating batches:", error);
      toast.error(`Error bulk deactivating batches: ${error.message}`);
    },
  });

  const [deleteBatch] = useMutation(HARD_DELETE_BATCH, {
    onCompleted: () => {
      toast.success("Batch deleted successfully");
      refetch(); // Refresh the batches list
      setDeleteDialogOpen(false);
      setBatchToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting batch:", error);
      toast.error(`Error deleting batch: ${error.message}`);
    },
  });

  const [bulkDeleteBatches] = useMutation(BULK_HARD_DELETE_BATCHES, {
    onCompleted: () => {
      if (batchesToDelete.length === 1) {
        toast.success("Batch deleted successfully");
      } else {
        toast.success(`${batchesToDelete.length} batches deleted successfully`);
      }
      refetch(); // Refresh the batches list
      setBulkDeleteDialogOpen(false); // Close bulk delete dialog
      setSelectedBatches([]); // Clear selection
      setBatchesToDelete([]); // Clear batches to delete
    },
    onError: (error) => {
      console.error("Error bulk deleting batches:", error);
      toast.error(`Error bulk deleting batches: ${error.message}`);
    },
  });

  // CRUD Functions
  const handleCreateBatch = async (formData: Record<string, any>) => {
    setCreateLoading(true);
    try {
      const createBatchInput: CreateBatchInput = {
        name: formData.name,
        courseId: formData.courseId,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
        isActive: formData.isActive !== undefined ? formData.isActive : true,
      };

      await createBatch({
        variables: { createBatchInput },
      });
    } catch (error) {
      console.error("Failed to create batch:", error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateBatch = async (
    id: string,
    formData: Record<string, any>
  ) => {
    setUpdateLoading(true);
    try {
      const updateBatchInput: UpdateBatchInput = {
        ...(formData.name && { name: formData.name }),
        ...(formData.courseId && { courseId: formData.courseId }),
        ...(formData.startDate && { startDate: formData.startDate }),
        ...(formData.endDate !== undefined && { endDate: formData.endDate }),
        ...(formData.isActive !== undefined && { isActive: formData.isActive }),
      };

      await updateBatch({
        variables: { id, updateBatchInput },
      });
    } catch (error) {
      console.error("Failed to update batch:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Delete operation handlers
  const handleRemoveBatch = async (id: string) => {
    setDeactivateLoading(true);
    try {
      await removeBatch({
        variables: { id },
      });
      setDeactivateDialogOpen(false);
      setBatchToDeactivate(null);
    } catch (error) {
      console.error("Failed to deactivate batch:", error);
    } finally {
      setDeactivateLoading(false);
    }
  };

  const handleBulkRemoveBatches = async (batchIds: string[]) => {
    setBulkDeactivateLoading(true);
    try {
      await bulkRemoveBatches({
        variables: {
          bulkRemoveBatchesInput: {
            batchIds,
          },
        },
      });
      setBulkDeactivateDialogOpen(false);
      setBatchesToDeactivate([]);
    } catch (error) {
      console.error("Failed to bulk deactivate batches:", error);
    } finally {
      setBulkDeactivateLoading(false);
    }
  };

  const handleDeleteBatch = async (id: string) => {
    setDeleteLoading(true);
    try {
      await deleteBatch({
        variables: { id },
      });
      setDeleteDialogOpen(false);
      setBatchToDelete(null);
    } catch (error) {
      console.error("Failed to delete batch:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBulkDeleteBatches = async (batchIds: string[]) => {
    setBulkDeleteLoading(true);
    try {
      await bulkDeleteBatches({
        variables: { ids: batchIds },
      });
      setBulkDeleteDialogOpen(false);
      setBatchesToDelete([]);
    } catch (error) {
      console.error("Failed to bulk delete batches:", error);
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  // Get course options for dropdown
  const courseOptions = (coursesData?.courses?.data || [])
    .filter((course: Course | null): course is Course => course !== null)
    .map((course: Course) => ({
      label: course.title,
      value: course.id,
    }));

  // Form field configurations
  const createBatchFields: FormField[] = [
    {
      name: "name",
      type: "text",
      label: "Batch Name",
      placeholder: "Enter batch name",
      required: true,
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Batch name must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "courseId",
      type: "select",
      label: "Course",
      placeholder: "Select a course",
      required: true,
      options: courseOptions,
      validation: (value) => {
        if (!value) {
          return {
            valid: false,
            message: "Please select a course",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "startDate",
      type: "date",
      label: "Start Date",
      placeholder: "Select start date",
      required: true,
      validation: (value) => {
        if (!value) {
          return {
            valid: false,
            message: "Start date is required",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "endDate",
      type: "date",
      label: "End Date",
      placeholder: "Select end date (optional)",
      required: false,
    },
    {
      name: "isActive",
      type: "switch",
      label: "Active Status",
    },
  ];

  const updateBatchFields: UpdateFormField[] = [
    {
      name: "name",
      type: "text",
      label: "Batch Name",
      placeholder: "Enter batch name",
      required: true,
      initialValue: batchToUpdate?.name || "",
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Batch name must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "courseId",
      type: "select",
      label: "Course",
      placeholder: "Select a course",
      required: true,
      options: courseOptions,
      initialValue: batchToUpdate?.courseId || "",
      validation: (value) => {
        if (!value) {
          return {
            valid: false,
            message: "Please select a course",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "startDate",
      type: "date",
      label: "Start Date",
      placeholder: "Select start date",
      required: true,
      initialValue: batchToUpdate?.startDate
        ? new Date(batchToUpdate.startDate).toISOString().split("T")[0]
        : "",
      validation: (value) => {
        if (!value) {
          return {
            valid: false,
            message: "Start date is required",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "endDate",
      type: "date",
      label: "End Date",
      placeholder: "Select end date (optional)",
      required: false,
      initialValue: batchToUpdate?.endDate
        ? new Date(batchToUpdate.endDate).toISOString().split("T")[0]
        : "",
    },
    {
      name: "isActive",
      type: "switch",
      label: "Active Status",
      initialValue: batchToUpdate?.isActive || false,
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
    {
      key: "courseId",
      label: "Course",
      options: [...courseOptions],
    },
  ];

  // Table columns configuration
  const columns: TableColumn<Batch>[] = [
    {
      key: "name",
      title: "Batch Name",
      sortable: true,
      render: (value: string) => (
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {value}
        </p>
      ),
    },
    {
      key: "course",
      title: "Course",
      render: (value: any) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {value ? value.title : "-"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {value?.creator
              ? `By ${value.creator.firstName} ${value.creator.lastName}`
              : "-"}
          </p>
        </div>
      ),
    },
    {
      key: "startDate",
      title: "Start Date",
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
    {
      key: "endDate",
      title: "End Date",
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
            <p className="text-gray-500 dark:text-gray-400">No end date</p>
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
  ];

  // Table actions
  const actions: TableAction<Batch>[] = [
    {
      label: "View Details",
      onClick: (batch: Batch) => {
        console.log("View batch:", batch.id);
        // TODO: Add navigation logic here - could open a modal or navigate to details page
      },
      icon: Eye,
    },
    {
      label: "View Enrollments",
      onClick: (batch: Batch) => {
        navigate(`/batches/${batch.id}/enrollments`);
      },
      icon: Users,
    },
    {
      label: "View Assignments",
      onClick: (batch: Batch) => {
        navigate(`/batches/${batch.id}/assignments`);
      },
      icon: FileText,
    },
    {
      label: "View Attendance Sessions",
      onClick: (batch: Batch) => {
        navigate(`/batches/${batch.id}/attendance-sessions`);
      },
      icon: ClipboardCheck,
    },
    {
      label: "Edit Batch",
      onClick: (batch: Batch) => {
        setBatchToUpdate(batch);
        setUpdateDialogOpen(true);
      },
      icon: Edit,
    },
    {
      label: "Deactivate Batch",
      onClick: (batch: Batch) => {
        setBatchToDeactivate(batch);
        setDeactivateDialogOpen(true);
      },
      icon: Trash2,
    },
    {
      label: "Delete Batch",
      onClick: (batch: Batch) => {
        setBatchToDelete(batch);
        setDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
  ];

  // Bulk actions for selected batches
  const bulkActions: BulkAction[] = [
    {
      label: "Deactivate Selected",
      onClick: (selectedIds: string[]) => {
        setBatchesToDeactivate(selectedIds);
        setBulkDeactivateDialogOpen(true);
      },
      icon: Trash2,
    },
    {
      label: "Delete Selected",
      onClick: (selectedIds: string[]) => {
        setBatchesToDelete(selectedIds);
        setBulkDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
    {
      label: "Activate Selected",
      onClick: (_selectedIds: string[]) => {
        setSelectedBatches([]);
      },
      icon: Calendar,
    },
  ];

  // Handle add new batch
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
    setSelectedBatches(selectedIds);
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((filterKey: string, value: string) => {
    if (filterKey === "isActive") {
      setIsActiveFilter(value);
    } else if (filterKey === "courseId") {
      setCourseIdFilter(value);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Prepare data for the table
  const batches = (data?.batches?.data || []).filter(
    (batch: Batch | null): batch is Batch => batch !== null
  );
  const meta: PaginationMeta = {
    page: data?.batches?.meta?.page || 1,
    limit: data?.batches?.meta?.limit || 10,
    total: data?.batches?.meta?.total || 0,
    totalPages: data?.batches?.meta?.totalPages || 1,
    hasNext: data?.batches?.meta?.hasNext || false,
    hasPrev: data?.batches?.meta?.hasPrev || false,
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <Calendar className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Error Loading Batches
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
      {/* Batches Table */}
      <div className="w-full">
        <DynamicTable
          data={batches}
          columns={columns}
          meta={meta}
          loading={loading}
          title="Batches Management"
          selectable={true}
          actions={actions}
          bulkActions={bulkActions}
          filters={tableFilters}
          selectedRows={selectedBatches}
          onSelectionChange={handleSelectionChange}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onAddNew={handleAddNew}
          addNewLabel="Add Batch"
          rowKey="id"
          emptyMessage="No batches found"
          className="bg-white dark:bg-gray-900"
        />
      </div>

      {/* Create Batch Dialog */}
      <DynamicCreateDialog
        title="Create New Batch"
        fields={createBatchFields}
        onSubmit={handleCreateBatch}
        submitLabel="Create Batch"
        isLoading={createLoading}
        open={createDialogOpen}
        setOpen={setCreateDialogOpen}
      />

      {/* Update Batch Dialog */}
      {batchToUpdate && (
        <DynamicUpdateDialog
          id={batchToUpdate.id}
          title="Update Batch"
          fields={updateBatchFields}
          onSubmit={handleUpdateBatch}
          submitLabel="Update Batch"
          isLoading={updateLoading}
          open={updateDialogOpen}
          setOpen={setUpdateDialogOpen}
        />
      )}

      {/* Single Batch Deactivate Confirmation Dialog */}
      {batchToDeactivate && (
        <ConfirmDeleteDialog
          title="Deactivate Batch"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to deactivate the batch{" "}
                <strong>{batchToDeactivate.name}</strong>?
              </p>
            </div>
          }
          description="This action will set the batch's isActive status to false, and you can reactivate it later"
          onConfirm={() => handleRemoveBatch(batchToDeactivate.id)}
          isLoading={deactivateLoading}
          open={deactivateDialogOpen}
          setOpen={setDeactivateDialogOpen}
          confirmLabel="Deactivate"
        />
      )}

      {/* Single Batch Delete Confirmation Dialog */}
      {batchToDelete && (
        <ConfirmDeleteDialog
          title="Delete Batch"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete the batch{" "}
                <strong>{batchToDelete.name}</strong>?
              </p>
            </div>
          }
          description="This action will permanently delete the batch and cannot be undone"
          onConfirm={() => handleDeleteBatch(batchToDelete.id)}
          isLoading={deleteLoading}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          confirmLabel="Delete"
        />
      )}

      {/* Bulk Deactivate Confirmation Dialog */}
      {batchesToDeactivate.length > 0 && (
        <ConfirmDeleteDialog
          title={`Deactivate ${batchesToDeactivate.length} Batches`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to deactivate{" "}
                <strong>{batchesToDeactivate.length}</strong> selected batches?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">
                  Batches to be deactivated:
                </p>
                <ul className="text-sm space-y-1">
                  {batchesToDeactivate.map((batchId) => {
                    const batch = batches.find((b: Batch) => b.id === batchId);
                    return batch ? (
                      <li key={batchId} className="flex justify-between">
                        <span>{batch.name}</span>
                        <span className="text-gray-500">
                          {batch.course?.title || "No course"}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          }
          description="This action will set the batches' isActive status to false, and you can reactivate them later"
          onConfirm={() => handleBulkRemoveBatches(batchesToDeactivate)}
          isLoading={bulkDeactivateLoading}
          open={bulkDeactivateDialogOpen}
          setOpen={setBulkDeactivateDialogOpen}
          confirmLabel={`Deactivate ${batchesToDeactivate.length} Batches`}
        />
      )}

      {/* Bulk Delete Confirmation Dialog */}
      {batchesToDelete.length > 0 && (
        <ConfirmDeleteDialog
          title={`Delete ${batchesToDelete.length} Batches`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete{" "}
                <strong>{batchesToDelete.length}</strong> selected batches?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">
                  Batches to be deleted:
                </p>
                <ul className="text-sm space-y-1">
                  {batchesToDelete.map((batchId) => {
                    const batch = batches.find((b: Batch) => b.id === batchId);
                    return batch ? (
                      <li key={batchId} className="flex justify-between">
                        <span>{batch.name}</span>
                        <span className="text-gray-500">
                          {batch.course?.title || "No course"}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          }
          description="This action will permanently delete the batches and cannot be undone"
          onConfirm={() => handleBulkDeleteBatches(batchesToDelete)}
          isLoading={bulkDeleteLoading}
          open={bulkDeleteDialogOpen}
          setOpen={setBulkDeleteDialogOpen}
          confirmLabel={`Delete ${batchesToDelete.length} Batches`}
        />
      )}
    </div>
  );
};

export default Batches;
