import { useMutation, useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import { Trash2, UserPlus } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import type { FormField } from "../components/shared/DynamicDialogs";
import {
  ConfirmDeleteDialog,
  DynamicCreateDialog,
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
import {
  EnrollmentStatus,
  type Enrollment,
  type EnrollmentFilterInput,
  UserRole,
  type User,
} from "../generated/graphql";
import { ENROLLMENTS } from "../graphql/query/enrollment";
import { BATCH } from "../graphql/query/batch";
import { USERS } from "../graphql/query/user";
import {
  BULK_REMOVE_ENROLLMENTS,
  ENROLL_STUDENT,
  UNENROLL_STUDENT,
  DELETE_ENROLLMENT,
  BULK_DELETE_ENROLLMENTS,
} from "../graphql/mutation/enrollment";
import toast from "react-hot-toast";

const Enrollments: React.FC = () => {
  const { batchId } = useParams<{ batchId?: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedEnrollments, setSelectedEnrollments] = useState<string[]>([]);
  const [studentIdFilter, setStudentIdFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [bulkDeactivateDialogOpen, setBulkDeactivateDialogOpen] =
    useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [enrollmentToDeactivate, setEnrollmentToDeactivate] =
    useState<Enrollment | null>(null);
  const [enrollmentToDelete, setEnrollmentToDelete] =
    useState<Enrollment | null>(null);
  const [enrollmentsToDeactivate, setEnrollmentsToDeactivate] = useState<
    string[]
  >([]);
  const [enrollmentsToDelete, setEnrollmentsToDelete] = useState<string[]>([]);

  // Loading states for operations
  const [createLoading, setCreateLoading] = useState(false);
  const [deactivateLoading, setDeactivateLoading] = useState(false);
  const [bulkDeactivateLoading, setBulkDeactivateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  // Build filter based on search term and other filters
  const filter: EnrollmentFilterInput = {
    batchId,
    ...(searchTerm && {
      search: searchTerm,
    }),
    ...(studentIdFilter &&
      studentIdFilter !== "all" && {
        studentId: studentIdFilter,
      }),
    ...(statusFilter &&
      statusFilter !== "all" && {
        status:
          statusFilter === "COMPLETED"
            ? EnrollmentStatus.Completed
            : EnrollmentStatus.Active,
      }),
  };

  // Build sort input
  const sort = sortKey ? { field: sortKey, order: sortDirection } : undefined;

  const { data, loading, error, refetch } = useQuery(ENROLLMENTS, {
    variables: {
      filter,
      pagination: {
        page: currentPage,
        limit: pageSize,
      },
      sort,
    },
  });

  // Fetch specific batch information when viewing batch enrollments
  const { data: currentBatchData } = useQuery(BATCH, {
    variables: { id: batchId! },
    skip: !batchId, // Only run the query if batchId is provided
  });

  // Fetch students for filter dropdown
  const { data: studentsData, loading: studentsLoading } = useQuery(USERS, {
    variables: {
      filter: { role: UserRole.Student },
      pagination: { page: 1, limit: 100 },
    },
  });

  // Mutation hooks
  const [enrollStudent] = useMutation(ENROLL_STUDENT, {
    onCompleted: () => {
      toast.success("Student enrolled successfully");
      refetch();
      setCreateDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error enrolling student:", error);
      toast.error(`Error enrolling student: ${error.message}`);
    },
  });

  const [unenrollStudent] = useMutation(UNENROLL_STUDENT, {
    onCompleted: () => {
      toast.success("Student unenrolled successfully");
      refetch();
      setDeactivateDialogOpen(false);
      setEnrollmentToDeactivate(null);
    },
    onError: (error) => {
      console.error("Error unenrolling student:", error);
      toast.error(`Error unenrolling student: ${error.message}`);
    },
  });

  const [bulkRemoveEnrollments] = useMutation(BULK_REMOVE_ENROLLMENTS, {
    onCompleted: () => {
      if (enrollmentsToDeactivate.length === 1) {
        toast.success("Enrollment removed successfully");
      } else {
        toast.success(
          `${enrollmentsToDeactivate.length} enrollments removed successfully`
        );
      }
      refetch();
      setBulkDeactivateDialogOpen(false);
      setSelectedEnrollments([]);
      setEnrollmentsToDeactivate([]);
    },
    onError: (error) => {
      console.error("Error bulk removing enrollments:", error);
      toast.error(`Error bulk removing enrollments: ${error.message}`);
    },
  });

  const [deleteEnrollment] = useMutation(DELETE_ENROLLMENT, {
    onCompleted: () => {
      toast.success("Enrollment deleted successfully");
      refetch();
      setDeleteDialogOpen(false);
      setEnrollmentToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting enrollment:", error);
      toast.error(`Error deleting enrollment: ${error.message}`);
    },
  });

  const [bulkDeleteEnrollments] = useMutation(BULK_DELETE_ENROLLMENTS, {
    onCompleted: () => {
      if (enrollmentsToDelete.length === 1) {
        toast.success("Enrollment deleted successfully");
      } else {
        toast.success(
          `${enrollmentsToDelete.length} enrollments deleted successfully`
        );
      }
      refetch();
      setBulkDeleteDialogOpen(false);
      setSelectedEnrollments([]);
      setEnrollmentsToDelete([]);
    },
    onError: (error) => {
      console.error("Error bulk deleting enrollments:", error);
      toast.error(`Error bulk deleting enrollments: ${error.message}`);
    },
  });

  // CRUD Functions
  const handleEnrollStudent = async (formData: Record<string, any>) => {
    setCreateLoading(true);
    try {
      await enrollStudent({
        variables: {
          batchId: batchId || formData.batchId, // Use URL batchId if available
          studentId: formData.studentId,
        },
      });
    } catch (error) {
      console.error("Failed to enroll student:", error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUnenrollStudent = async (enrollment: Enrollment) => {
    setDeactivateLoading(true);
    try {
      await unenrollStudent({
        variables: {
          batchId: enrollment.batchId,
          studentId: enrollment.studentId,
        },
      });
    } catch (error) {
      console.error("Failed to unenroll student:", error);
    } finally {
      setDeactivateLoading(false);
    }
  };

  const handleBulkRemoveEnrollments = async (enrollmentIds: string[]) => {
    setBulkDeactivateLoading(true);
    try {
      await bulkRemoveEnrollments({
        variables: {
          bulkRemoveEnrollmentsInput: {
            enrollmentIds,
          },
        },
      });
    } catch (error) {
      console.error("Failed to bulk remove enrollments:", error);
    } finally {
      setBulkDeactivateLoading(false);
    }
  };

  const handleDeleteEnrollment = async (enrollment: Enrollment) => {
    setDeleteLoading(true);
    try {
      await deleteEnrollment({
        variables: {
          batchId: enrollment.batchId,
          studentId: enrollment.studentId,
        },
      });
    } catch (error) {
      console.error("Failed to delete enrollment:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBulkDeleteEnrollments = async (enrollmentIds: string[]) => {
    setBulkDeleteLoading(true);
    try {
      // Group enrollments by batchId for the bulk delete operation
      const enrollmentsByBatch = new Map<string, string[]>();

      enrollmentIds.forEach((enrollmentId) => {
        const enrollment = enrollments.find(
          (e: Enrollment) => e.id === enrollmentId
        );
        if (enrollment) {
          const batchId = enrollment.batchId;
          const studentId = enrollment.studentId;

          if (!enrollmentsByBatch.has(batchId)) {
            enrollmentsByBatch.set(batchId, []);
          }
          enrollmentsByBatch.get(batchId)!.push(studentId);
        }
      });

      // Execute bulk delete for each batch
      for (const [batchId, studentIds] of enrollmentsByBatch) {
        await bulkDeleteEnrollments({
          variables: {
            bulkDeleteEnrollmentsInput: {
              batchId,
              studentIds,
            },
          },
        });
      }
    } catch (error) {
      console.error("Failed to bulk delete enrollments:", error);
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  // Form field configurations
  const createEnrollmentFields: FormField[] = [
    {
      name: "studentId",
      type: "select",
      label: "Student",
      placeholder: "Select a student",
      required: true,
      loading: studentsLoading,
      options: (studentsData?.users?.data || [])
        .filter((user: User | null): user is User => user !== null)
        .map((user: User) => ({
          label: `${user.firstName} ${user.lastName} (${user.username})`,
          value: user.id,
        })),
      validation: (value) => {
        if (!value) {
          return {
            valid: false,
            message: "Please select a student",
          };
        }
        return { valid: true, message: "" };
      },
    },
  ];

  // Define table filters
  const tableFilters: TableFilter[] = [
    {
      key: "studentId",
      loading: studentsLoading,
      label: "Student",
      options: [
        ...(studentsData?.users?.data || [])
          .filter((user: User | null): user is User => user !== null)
          .map((user: User) => ({
            label: `${user.firstName} ${user.lastName}`,
            value: user.id,
          })),
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "COMPLETED", value: "COMPLETED" },
        { label: "ACTIVE", value: "ACTIVE" },
      ],
    },
  ];

  // Table columns configuration
  const columns: TableColumn<Enrollment>[] = [
    {
      key: "student",
      title: "Student",
      sortable: false,
      render: (value: any) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {value ? `${value.firstName} ${value.lastName}` : "-"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {value ? value.username : "-"}
          </p>
        </div>
      ),
    },
    {
      key: "batch",
      title: "Batch",
      sortable: false,
      render: (value: any) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {value ? value.name : "-"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {value?.course ? value.course.title : "-"}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === "ACTIVE" ? "default" : "secondary"}>
          {value}
        </Badge>
      ),

      align: "center",
    },
    {
      key: "enrollmentDate",
      title: "Enrollment Date",
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
  const actions: TableAction<Enrollment>[] = [
    {
      label: "Unenroll Student",
      onClick: (enrollment: Enrollment) => {
        setEnrollmentToDeactivate(enrollment);
        setDeactivateDialogOpen(true);
      },
      icon: Trash2,
    },
    {
      label: "Delete Enrollment",
      onClick: (enrollment: Enrollment) => {
        setEnrollmentToDelete(enrollment);
        setDeleteDialogOpen(true);
      },
      icon: Trash2,
      variant: "destructive",
    },
  ];

  // Bulk actions for selected enrollments
  const bulkActions: BulkAction[] = [
    {
      label: "Remove Selected",
      onClick: (selectedIds: string[]) => {
        setEnrollmentsToDeactivate(selectedIds);
        setBulkDeactivateDialogOpen(true);
      },
      icon: Trash2,
    },
    {
      label: "Delete Selected",
      onClick: (selectedIds: string[]) => {
        setEnrollmentsToDelete(selectedIds);
        setBulkDeleteDialogOpen(true);
      },
      icon: Trash2,
      variant: "destructive",
    },
  ];

  // Handle add new enrollment
  const handleAddNew = () => {
    setCreateDialogOpen(true);
  };

  // Event handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    setPageSize(limit);
    setCurrentPage(1);
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
    setCurrentPage(1);
  }, []);

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedEnrollments(selectedIds);
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((filterKey: string, value: string) => {
    if (filterKey === "studentId") {
      setStudentIdFilter(value);
    } else if (filterKey === "status") {
      setStatusFilter(value);
    }
    setCurrentPage(1);
  }, []);

  // Prepare data for the table
  const enrollments = (data?.enrollments?.data || []).filter(
    (enrollment: Enrollment | null): enrollment is Enrollment =>
      enrollment !== null
  );
  const meta: PaginationMeta = {
    page: data?.enrollments?.meta?.page || 1,
    limit: data?.enrollments?.meta?.limit || 10,
    total: data?.enrollments?.meta?.total || 0,
    totalPages: data?.enrollments?.meta?.totalPages || 1,
    hasNext: data?.enrollments?.meta?.hasNext || false,
    hasPrev: data?.enrollments?.meta?.hasPrev || false,
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <UserPlus className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Error Loading Enrollments
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
      {/* Enrollments Table */}
      <div className="w-full">
        <DynamicTable
          data={enrollments}
          columns={columns}
          meta={meta}
          loading={loading}
          title={
            batchId && currentBatchData?.batch
              ? `${currentBatchData.batch.name} - Enrollments`
              : "Enrollments Management"
          }
          selectable={true}
          actions={actions}
          bulkActions={bulkActions}
          filters={tableFilters}
          selectedRows={selectedEnrollments}
          onSelectionChange={handleSelectionChange}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onAddNew={handleAddNew}
          addNewLabel="Enroll Student"
          rowKey="id"
          emptyMessage="No enrollments found"
          className="bg-white dark:bg-gray-900"
        />
      </div>

      {/* Create Enrollment Dialog */}
      <DynamicCreateDialog
        title="Enroll Student"
        fields={createEnrollmentFields}
        onSubmit={handleEnrollStudent}
        submitLabel="Enroll Student"
        isLoading={createLoading}
        open={createDialogOpen}
        setOpen={setCreateDialogOpen}
        gridClassName="grid-cols-1"
      />

      {/* Single Enrollment Unenroll Confirmation Dialog */}
      {enrollmentToDeactivate && (
        <ConfirmDeleteDialog
          title="Unenroll Student"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to unenroll{" "}
                <strong>
                  {enrollmentToDeactivate.student
                    ? `${enrollmentToDeactivate.student.firstName} ${enrollmentToDeactivate.student.lastName}`
                    : "this student"}
                </strong>{" "}
                from{" "}
                <strong>
                  {enrollmentToDeactivate.batch
                    ? enrollmentToDeactivate.batch.name
                    : "this batch"}
                </strong>
                ?
              </p>
            </div>
          }
          description="This action will remove the student from the batch and they will lose access to the course content"
          onConfirm={() => handleUnenrollStudent(enrollmentToDeactivate)}
          isLoading={deactivateLoading}
          open={deactivateDialogOpen}
          setOpen={setDeactivateDialogOpen}
          confirmLabel="Unenroll"
        />
      )}

      {/* Bulk Remove Enrollments Confirmation Dialog */}
      {enrollmentsToDeactivate.length > 0 && (
        <ConfirmDeleteDialog
          title={`Remove ${enrollmentsToDeactivate.length} Enrollments`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to remove{" "}
                <strong>{enrollmentsToDeactivate.length}</strong> selected
                enrollments?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">
                  Enrollments to be removed:
                </p>
                <ul className="text-sm space-y-1">
                  {enrollmentsToDeactivate.map((enrollmentId) => {
                    const enrollment = enrollments.find(
                      (e: Enrollment) => e.id === enrollmentId
                    );
                    return enrollment ? (
                      <li key={enrollmentId} className="flex justify-between">
                        <span>
                          {enrollment.student
                            ? `${enrollment.student.firstName} ${enrollment.student.lastName}`
                            : "Unknown Student"}
                        </span>
                        <span className="text-gray-500">
                          {enrollment.batch
                            ? enrollment.batch.name
                            : "Unknown Batch"}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          }
          description="This action will remove the students from their respective batches and they will lose access to the course content"
          onConfirm={() => handleBulkRemoveEnrollments(enrollmentsToDeactivate)}
          isLoading={bulkDeactivateLoading}
          open={bulkDeactivateDialogOpen}
          setOpen={setBulkDeactivateDialogOpen}
          confirmLabel={`Remove ${enrollmentsToDeactivate.length} Enrollments`}
        />
      )}

      {/* Single Enrollment Delete Confirmation Dialog */}
      {enrollmentToDelete && (
        <ConfirmDeleteDialog
          title="Delete Enrollment"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to permanently delete the enrollment of{" "}
                <strong>
                  {enrollmentToDelete.student
                    ? `${enrollmentToDelete.student.firstName} ${enrollmentToDelete.student.lastName}`
                    : "this student"}
                </strong>{" "}
                from{" "}
                <strong>
                  {enrollmentToDelete.batch
                    ? enrollmentToDelete.batch.name
                    : "this batch"}
                </strong>
                ?
              </p>
            </div>
          }
          description="This action will permanently delete the enrollment record and cannot be undone"
          onConfirm={() => handleDeleteEnrollment(enrollmentToDelete)}
          isLoading={deleteLoading}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          confirmLabel="Delete"
        />
      )}

      {/* Bulk Delete Enrollments Confirmation Dialog */}
      {enrollmentsToDelete.length > 0 && (
        <ConfirmDeleteDialog
          title={`Delete ${enrollmentsToDelete.length} Enrollments`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to permanently delete{" "}
                <strong>{enrollmentsToDelete.length}</strong> selected
                enrollments?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">
                  Enrollments to be deleted:
                </p>
                <ul className="text-sm space-y-1">
                  {enrollmentsToDelete.map((enrollmentId) => {
                    const enrollment = enrollments.find(
                      (e: Enrollment) => e.id === enrollmentId
                    );
                    return enrollment ? (
                      <li key={enrollmentId} className="flex justify-between">
                        <span>
                          {enrollment.student
                            ? `${enrollment.student.firstName} ${enrollment.student.lastName}`
                            : "Unknown Student"}
                        </span>
                        <span className="text-gray-500">
                          {enrollment.batch
                            ? enrollment.batch.name
                            : "Unknown Batch"}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          }
          description="This action will permanently delete the enrollment records and cannot be undone"
          onConfirm={() => handleBulkDeleteEnrollments(enrollmentsToDelete)}
          isLoading={bulkDeleteLoading}
          open={bulkDeleteDialogOpen}
          setOpen={setBulkDeleteDialogOpen}
          confirmLabel={`Delete ${enrollmentsToDelete.length} Enrollments`}
        />
      )}
    </div>
  );
};

export default Enrollments;
