import { useMutation, useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import { Eye, Trash2, Users, Calendar, Edit, UserCheck } from "lucide-react";
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
import type {
  BulkAction,
  PaginationMeta,
  TableAction,
  TableColumn,
} from "../components/shared/Table";
import DynamicTable from "../components/shared/Table";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Checkbox } from "../components/ui/checkbox";
import type {
  CreateAttendanceSessionInput,
  AttendanceSession,
  AttendanceFilterInput,
  MarkAttendanceInput,
  Enrollment,
} from "../generated/graphql";
import { ATTENDANCE_SESSIONS } from "../graphql/query/attendance";
import { BATCH } from "../graphql/query/batch";
import { ENROLLMENTS } from "../graphql/query/enrollment";
import {
  BULK_REMOVE_ATTENDANCE_SESSIONS,
  CREATE_ATTENDANCE_SESSION,
  DELETE_ATTENDANCE_SESSION,
  UPDATE_ATTENDANCE_SESSION,
  MARK_ATTENDANCE,
} from "../graphql/mutation/attendance";
import toast from "react-hot-toast";

const AttendanceSessions: React.FC = () => {
  const navigate = useNavigate();
  const { batchId } = useParams<{ batchId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [markAttendanceDialogOpen, setMarkAttendanceDialogOpen] =
    useState(false);
  const [sessionToUpdate, setSessionToUpdate] =
    useState<AttendanceSession | null>(null);
  const [sessionToDelete, setSessionToDelete] =
    useState<AttendanceSession | null>(null);
  const [sessionsToDelete, setSessionsToDelete] = useState<string[]>([]);
  const [sessionForAttendance, setSessionForAttendance] =
    useState<AttendanceSession | null>(null);

  // Loading states for operations
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);
  const [markAttendanceLoading, setMarkAttendanceLoading] = useState(false);

  // Mark attendance state
  const [attendanceRecords, setAttendanceRecords] = useState<
    Record<string, boolean>
  >({});

  // Build filter based on search term
  const filter: AttendanceFilterInput = {
    batchId,
    ...(searchTerm && {
      search: searchTerm,
    }),
  };

  // Build sort input
  const sort = sortKey ? { field: sortKey, order: sortDirection } : undefined;

  const { data, loading, error, refetch } = useQuery(ATTENDANCE_SESSIONS, {
    variables: {
      filter,
      pagination: {
        page: currentPage,
        limit: pageSize,
      },
      sort,
    },
  });

  // Get batches for filter dropdown (commented out as not currently used)
  // const { data: batchesData } = useBatchesQuery({
  //   variables: {
  //     pagination: { page: 1, limit: 100 },
  //   },
  // });

  // Fetch specific batch if batchId is provided
  const { data: batchData } = useQuery(BATCH, {
    variables: { id: batchId! },
    skip: !batchId,
  });

  // Fetch enrollments for the batch to get students
  const { data: enrollmentsData } = useQuery(ENROLLMENTS, {
    variables: {
      filter: { batchId },
      pagination: { page: 1, limit: 100 },
    },
    skip: !batchId,
  });

  // Mutation hooks
  const [createAttendanceSession] = useMutation(CREATE_ATTENDANCE_SESSION, {
    onCompleted: () => {
      toast.success("Attendance session created successfully");
      refetch();
      setCreateDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error creating attendance session:", error);
      toast.error(`Error creating attendance session: ${error.message}`);
    },
  });

  const [updateAttendanceSession] = useMutation(UPDATE_ATTENDANCE_SESSION, {
    onCompleted: () => {
      toast.success("Attendance session updated successfully");
      refetch();
      setUpdateDialogOpen(false);
      setSessionToUpdate(null);
    },
    onError: (error) => {
      console.error("Error updating attendance session:", error);
      toast.error(`Error updating attendance session: ${error.message}`);
    },
  });

  const [deleteAttendanceSession] = useMutation(DELETE_ATTENDANCE_SESSION, {
    onCompleted: () => {
      toast.success("Attendance session deleted successfully");
      refetch();
      setDeleteDialogOpen(false);
      setSessionToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting attendance session:", error);
      toast.error(`Error deleting attendance session: ${error.message}`);
    },
  });

  const [bulkRemoveAttendanceSessions] = useMutation(
    BULK_REMOVE_ATTENDANCE_SESSIONS,
    {
      onCompleted: () => {
        if (sessionsToDelete.length === 1) {
          toast.success("Attendance session deleted successfully");
        } else {
          toast.success(
            `${sessionsToDelete.length} attendance sessions deleted successfully`
          );
        }
        refetch();
        setBulkDeleteDialogOpen(false);
        setSelectedSessions([]);
        setSessionsToDelete([]);
      },
      onError: (error) => {
        console.error("Error bulk deleting attendance sessions:", error);
        toast.error(
          `Error bulk deleting attendance sessions: ${error.message}`
        );
      },
    }
  );

  const [markAttendance] = useMutation(MARK_ATTENDANCE, {
    onCompleted: () => {
      toast.success("Attendance records saved successfully");
      setMarkAttendanceDialogOpen(false);
      setSessionForAttendance(null);
      setAttendanceRecords({});
      // Refetch the attendance sessions to get updated attendance records
      refetch();
    },
    onError: (error) => {
      console.error("Error marking attendance:", error);
      toast.error(`Error saving attendance: ${error.message}`);
    },
  });

  // CRUD Functions
  const handleCreateSession = async (formData: Record<string, any>) => {
    setCreateLoading(true);
    try {
      const createSessionInput: CreateAttendanceSessionInput = {
        batchId: batchId!, // Use batchId from URL if not provided in form
        sessionTitle: formData.sessionTitle,
        sessionDate: formData.sessionDate,
      };

      await createAttendanceSession({
        variables: { createSessionInput },
      });
    } catch (error) {
      console.error("Failed to create attendance session:", error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateSession = async (
    id: string,
    formData: Record<string, any>
  ) => {
    setUpdateLoading(true);
    try {
      const updateSessionInput = {
        id,
        ...(formData.sessionTitle && { sessionTitle: formData.sessionTitle }),
        ...(formData.sessionDate && { sessionDate: formData.sessionDate }),
      };

      await updateAttendanceSession({
        variables: { updateSessionInput },
      });
    } catch (error) {
      console.error("Failed to update attendance session:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteSession = async (id: string) => {
    setDeleteLoading(true);
    try {
      await deleteAttendanceSession({
        variables: { id },
      });
    } catch (error) {
      console.error("Failed to delete attendance session:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBulkDeleteSessions = async (sessionIds: string[]) => {
    setBulkDeleteLoading(true);
    try {
      await bulkRemoveAttendanceSessions({
        variables: {
          bulkRemoveAttendanceSessionsInput: {
            sessionIds,
          },
        },
      });
    } catch (error) {
      console.error("Failed to bulk delete attendance sessions:", error);
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  const handleMarkAttendance = async () => {
    if (!sessionForAttendance) return;

    setMarkAttendanceLoading(true);
    try {
      const enrollments =
        (enrollmentsData?.enrollments?.data?.filter(
          (enrollment: Enrollment | null) => enrollment !== null
        ) as Enrollment[]) || [];
      const markAttendanceInput: MarkAttendanceInput[] = enrollments.map(
        (enrollment: Enrollment) => ({
          sessionId: sessionForAttendance.id,
          studentId: enrollment.studentId,
          isPresent: attendanceRecords[enrollment.studentId] || false,
        })
      );

      await markAttendance({
        variables: { markAttendanceInput },
      });
    } catch (error) {
      console.error("Failed to mark attendance:", error);
    } finally {
      setMarkAttendanceLoading(false);
    }
  };

  const handleOpenMarkAttendance = (session: AttendanceSession) => {
    setSessionForAttendance(session);
    setMarkAttendanceDialogOpen(true);

    // Get existing attendance records for this session
    const existingRecords = session.attendanceRecords || [];
    const enrollments =
      (enrollmentsData?.enrollments?.data?.filter(
        (enrollment: Enrollment | null) => enrollment !== null
      ) as Enrollment[]) || [];

    // Debug logging
    console.log("📋 Opening Mark Attendance Dialog");
    console.log("Session:", session.sessionTitle);
    console.log("Existing attendance records:", existingRecords);
    console.log("Enrollments count:", enrollments.length);

    // Initialize attendance records - use existing records if available, otherwise default to false
    const initialRecords: Record<string, boolean> = {};
    enrollments.forEach((enrollment: Enrollment) => {
      // Find existing attendance record for this student in this session
      const existingRecord = existingRecords.find(
        (record) => record && record.studentId === enrollment.studentId
      );
      // If record exists, use its isPresent value, otherwise default to false (absent)
      initialRecords[enrollment.studentId] = existingRecord
        ? existingRecord.isPresent
        : false;

      // Debug log for each student
      if (existingRecord) {
        console.log(
          `✅ Student ${enrollment.student?.firstName} ${
            enrollment.student?.lastName
          } - Found existing record: ${
            existingRecord.isPresent ? "Present" : "Absent"
          }`
        );
      } else {
        console.log(
          `❌ Student ${enrollment.student?.firstName} ${enrollment.student?.lastName} - No existing record, defaulting to absent`
        );
      }
    });

    console.log("Final initial records:", initialRecords);
    setAttendanceRecords(initialRecords);
  };

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: isPresent,
    }));
  };

  const handleSelectAll = (isPresent: boolean) => {
    const enrollments =
      (enrollmentsData?.enrollments?.data?.filter(
        (enrollment: Enrollment | null) => enrollment !== null
      ) as Enrollment[]) || [];
    const newRecords: Record<string, boolean> = {};
    enrollments.forEach((enrollment: Enrollment) => {
      newRecords[enrollment.studentId] = isPresent;
    });
    setAttendanceRecords(newRecords);
  };

  // Form field configurations
  const createSessionFields: FormField[] = [
    {
      name: "sessionTitle",
      type: "text",
      label: "Session Title",
      placeholder: "Enter session title",
      required: true,
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Session title must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "sessionDate",
      type: "date",
      label: "Session Date",
      placeholder: "Select session date",
      required: true,
      validation: (value) => {
        if (!value) {
          return {
            valid: false,
            message: "Please select a session date",
          };
        }
        return { valid: true, message: "" };
      },
    },
  ];

  const updateSessionFields: UpdateFormField[] = [
    {
      name: "sessionTitle",
      type: "text",
      label: "Session Title",
      placeholder: "Enter session title",
      required: true,
      initialValue: sessionToUpdate?.sessionTitle || "",
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Session title must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "sessionDate",
      type: "date",
      label: "Session Date",
      placeholder: "Select session date",
      required: true,
      initialValue: sessionToUpdate?.sessionDate
        ? new Date(sessionToUpdate.sessionDate).toISOString().split("T")[0]
        : "",
      validation: (value) => {
        if (!value) {
          return {
            valid: false,
            message: "Please select a session date",
          };
        }
        return { valid: true, message: "" };
      },
    },
  ];

  // Table columns configuration
  const columns: TableColumn<AttendanceSession>[] = [
    {
      key: "sessionTitle",
      title: "Session Title",
      sortable: true,
      render: (value: string) => (
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {value}
        </p>
      ),
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
            {value?.course ? value.course.title : "-"}
          </p>
        </div>
      ),
    },
    {
      key: "sessionDate",
      title: "Session Date",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900 dark:text-gray-100">
          <p className="truncate">{new Date(value).toLocaleDateString()}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {new Date(value).toLocaleTimeString()}
          </p>
        </div>
      ),
    },
    {
      key: "attendanceRecords",
      title: "Attendance Records",
      render: (value: any[] | null, row: AttendanceSession) => (
        <div className="text-sm text-center">
          <button
            onClick={() => navigate(`/attendance-sessions/${row.id}/records`)}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 transition-colors cursor-pointer"
          >
            {value ? value.length : 0} records
          </button>
        </div>
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
  const actions: TableAction<AttendanceSession>[] = [
    {
      label: "View Details",
      onClick: (session: AttendanceSession) => {
        console.log("View session:", session.id);
        // TODO: Add navigation logic here
      },
      icon: Eye,
    },
    {
      label: "Mark/Update Attendance",
      onClick: handleOpenMarkAttendance,
      icon: UserCheck,
    },
    {
      label: "View Attendance Records",
      onClick: (session: AttendanceSession) => {
        navigate(`/attendance-sessions/${session.id}/records`);
      },
      icon: Users,
    },
    {
      label: "Edit Session",
      onClick: (session: AttendanceSession) => {
        setSessionToUpdate(session);
        setUpdateDialogOpen(true);
      },
      icon: Edit,
    },
    {
      label: "Delete Session",
      onClick: (session: AttendanceSession) => {
        setSessionToDelete(session);
        setDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
  ];

  // Bulk actions for selected sessions
  const bulkActions: BulkAction[] = [
    {
      label: "Delete Selected",
      onClick: (selectedIds: string[]) => {
        setSessionsToDelete(selectedIds);
        setBulkDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
  ];

  // Handle add new session
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
    setSelectedSessions(selectedIds);
  }, []);

  // Prepare data for the table
  const attendanceSessions = (data?.attendanceSessions?.data || []).filter(
    (session: AttendanceSession | null): session is AttendanceSession =>
      session !== null
  );
  const meta: PaginationMeta = {
    page: data?.attendanceSessions?.meta?.page || 1,
    limit: data?.attendanceSessions?.meta?.limit || 10,
    total: data?.attendanceSessions?.meta?.total || 0,
    totalPages: data?.attendanceSessions?.meta?.totalPages || 1,
    hasNext: data?.attendanceSessions?.meta?.hasNext || false,
    hasPrev: data?.attendanceSessions?.meta?.hasPrev || false,
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
            Error Loading Attendance Sessions
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
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      {/* Attendance Sessions Table */}
      <div className="w-full">
        <DynamicTable
          data={attendanceSessions}
          columns={columns}
          meta={meta}
          loading={loading}
          title={
            batchData?.batch
              ? `Attendance Sessions for ${batchData.batch.name}`
              : "Attendance Sessions Management"
          }
          selectable={true}
          actions={actions}
          bulkActions={bulkActions}
          filters={[]}
          selectedRows={selectedSessions}
          onSelectionChange={handleSelectionChange}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          onFilterChange={() => {}}
          onAddNew={handleAddNew}
          addNewLabel="Add Session"
          rowKey="id"
          emptyMessage="No attendance sessions found"
          className="bg-white dark:bg-gray-900"
        />
      </div>

      {/* Create Session Dialog */}
      <DynamicCreateDialog
        title="Create New Attendance Session"
        fields={createSessionFields}
        onSubmit={handleCreateSession}
        submitLabel="Create Session"
        isLoading={createLoading}
        open={createDialogOpen}
        setOpen={setCreateDialogOpen}
      />

      {/* Update Session Dialog */}
      {sessionToUpdate && (
        <DynamicUpdateDialog
          id={sessionToUpdate.id}
          title="Update Attendance Session"
          fields={updateSessionFields}
          onSubmit={handleUpdateSession}
          submitLabel="Update Session"
          isLoading={updateLoading}
          open={updateDialogOpen}
          setOpen={setUpdateDialogOpen}
        />
      )}

      {/* Single Session Delete Confirmation Dialog */}
      {sessionToDelete && (
        <ConfirmDeleteDialog
          title="Delete Attendance Session"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete the attendance session{" "}
                <strong>{sessionToDelete.sessionTitle}</strong>?
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Warning:</strong> This will also delete all associated
                  attendance records.
                </p>
              </div>
            </div>
          }
          description="This action will permanently delete the attendance session and all its records, and cannot be undone"
          onConfirm={() => handleDeleteSession(sessionToDelete.id)}
          isLoading={deleteLoading}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          confirmLabel="Delete"
        />
      )}

      {/* Bulk Delete Confirmation Dialog */}
      {sessionsToDelete.length > 0 && (
        <ConfirmDeleteDialog
          title={`Delete ${sessionsToDelete.length} Attendance Sessions`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete{" "}
                <strong>{sessionsToDelete.length}</strong> selected attendance
                sessions?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">
                  Sessions to be deleted:
                </p>
                <ul className="text-sm space-y-1">
                  {sessionsToDelete.map((sessionId) => {
                    const session = attendanceSessions.find(
                      (s: AttendanceSession) => s.id === sessionId
                    );
                    return session ? (
                      <li key={sessionId} className="flex justify-between">
                        <span>{session.sessionTitle}</span>
                        <span className="text-gray-500">
                          {new Date(session.sessionDate).toLocaleDateString()}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Warning:</strong> This will also delete all associated
                  attendance records.
                </p>
              </div>
            </div>
          }
          description="This action will permanently delete the attendance sessions and all their records, and cannot be undone"
          onConfirm={() => handleBulkDeleteSessions(sessionsToDelete)}
          isLoading={bulkDeleteLoading}
          open={bulkDeleteDialogOpen}
          setOpen={setBulkDeleteDialogOpen}
          confirmLabel={`Delete ${sessionsToDelete.length} Sessions`}
        />
      )}

      {/* Mark Attendance Dialog */}
      {sessionForAttendance && (
        <Dialog
          open={markAttendanceDialogOpen}
          onOpenChange={setMarkAttendanceDialogOpen}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {sessionForAttendance.attendanceRecords &&
                sessionForAttendance.attendanceRecords.length > 0
                  ? `Update Attendance - ${sessionForAttendance.sessionTitle}`
                  : `Mark Attendance - ${sessionForAttendance.sessionTitle}`}
              </DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Session Date:{" "}
                {new Date(
                  sessionForAttendance.sessionDate
                ).toLocaleDateString()}
              </p>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {sessionForAttendance.attendanceRecords &&
                  sessionForAttendance.attendanceRecords.length > 0
                    ? "Update attendance records for students in the batch"
                    : "Mark attendance for all students in the batch"}
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectAll(true)}
                    className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                  >
                    Mark All Present
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectAll(false)}
                    className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Mark All Absent
                  </Button>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {enrollmentsData?.enrollments?.data
                  ?.filter(
                    (enrollment: Enrollment | null) => enrollment !== null
                  )
                  .map((enrollment: Enrollment) => {
                    // Check if this student has an existing attendance record
                    const existingRecord =
                      sessionForAttendance.attendanceRecords?.find(
                        (record) =>
                          record && record.studentId === enrollment.studentId
                      );
                    const hasExistingRecord = !!existingRecord;

                    return (
                      <div
                        key={enrollment.id}
                        className={`flex items-center justify-between p-3 border rounded-lg dark:border-gray-700 ${
                          hasExistingRecord
                            ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                            : ""
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {enrollment.student?.firstName}{" "}
                              {enrollment.student?.lastName}
                            </p>
                            {hasExistingRecord && (
                              <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full">
                                Recorded
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {enrollment.student?.username} •{" "}
                            {enrollment.student?.email}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <label className="text-sm font-medium">Present</label>
                          <Checkbox
                            checked={
                              attendanceRecords[enrollment.studentId] || false
                            }
                            onCheckedChange={(checked) =>
                              handleAttendanceChange(
                                enrollment.studentId,
                                checked as boolean
                              )
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Attendance Summary */}
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attendance Summary:
                  </div>
                  {sessionForAttendance.attendanceRecords &&
                    sessionForAttendance.attendanceRecords.length > 0 && (
                      <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                        {sessionForAttendance.attendanceRecords.length} existing
                        record(s)
                      </div>
                    )}
                </div>
                <div className="flex space-x-4 text-sm">
                  <span className="text-green-600 dark:text-green-400">
                    Present:{" "}
                    {Object.values(attendanceRecords).filter(Boolean).length}
                  </span>
                  <span className="text-red-600 dark:text-red-400">
                    Absent:{" "}
                    {
                      Object.values(attendanceRecords).filter((val) => !val)
                        .length
                    }
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Total: {Object.keys(attendanceRecords).length}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => setMarkAttendanceDialogOpen(false)}
                  disabled={markAttendanceLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleMarkAttendance}
                  disabled={markAttendanceLoading}
                >
                  {markAttendanceLoading
                    ? "Processing..."
                    : sessionForAttendance.attendanceRecords &&
                      sessionForAttendance.attendanceRecords.length > 0
                    ? "Update Attendance"
                    : "Mark Attendance"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AttendanceSessions;
