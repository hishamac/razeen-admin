import { useMutation, useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import {
  Eye,
  FileText,
  Star,
  Download,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import type { UpdateFormField } from "../components/shared/DynamicDialogs";
import { DynamicUpdateDialog } from "../components/shared/DynamicDialogs";
import type {
  PaginationMeta,
  TableAction,
  TableColumn,
  TableFilter,
} from "../components/shared/Table";
import DynamicTable from "../components/shared/Table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import type {
  AssignmentSubmission,
  GradeAssignmentInput,
  AssignmentFilterInput,
  AssignmentStatus,
} from "../generated/graphql";
import {
  ASSIGNMENT_SUBMISSIONS,
  ASSIGNMENT,
} from "../graphql/query/assignment";
import { GRADE_ASSIGNMENT } from "../graphql/mutation/assignment";
import toast from "react-hot-toast";

const AssignmentSubmissions: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Dialog states
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [submissionToGrade, setSubmissionToGrade] =
    useState<AssignmentSubmission | null>(null);

  // Loading states for operations
  const [gradeLoading, setGradeLoading] = useState(false);

  // Build filter based on search term and status
  const filter: AssignmentFilterInput = {
    ...(searchTerm && {
      search: searchTerm,
    }),
    ...(statusFilter &&
      statusFilter !== "all" && {
        status: statusFilter as AssignmentStatus,
      }),
  };

  // Build sort input
  const sort = sortKey ? { field: sortKey, order: sortDirection } : undefined;

  // Get assignment submissions
  const { data, loading, error, refetch } = useQuery(ASSIGNMENT_SUBMISSIONS, {
    variables: {
      assignmentId: assignmentId!,
      filter,
      pagination: {
        page: currentPage,
        limit: pageSize,
      },
      sort,
    },
    skip: !assignmentId,
  });

  // Fetch assignment details for title
  const { data: assignmentData } = useQuery(ASSIGNMENT, {
    variables: { id: assignmentId! },
    skip: !assignmentId,
  });

  // Mutation hooks
  const [gradeAssignment] = useMutation(GRADE_ASSIGNMENT, {
    onCompleted: () => {
      toast.success("Assignment graded successfully");
      refetch(); // Refresh the submissions list
      setGradeDialogOpen(false); // Close grade dialog
      setSubmissionToGrade(null); // Clear selected submission
    },
    onError: (error) => {
      console.error("Error grading assignment:", error);
      toast.error(`Error grading assignment: ${error.message}`);
    },
  });

  // CRUD Functions
  const handleGradeAssignment = async (
    submissionId: string,
    formData: Record<string, any>
  ) => {
    setGradeLoading(true);
    try {
      const currentSubmission = submissionToGrade;
      const gradeAssignmentInput: GradeAssignmentInput = {
        submissionId,
      };

      // Only include score if it's provided and different from current value
      if (formData.score !== undefined && formData.score !== "") {
        const newScore = parseInt(formData.score, 10);
        if (currentSubmission?.score !== newScore) {
          gradeAssignmentInput.score = newScore;
        }
      }

      // Only include feedback if it's different from current value
      if (formData.feedback !== undefined) {
        const newFeedback = formData.feedback || null;
        if (currentSubmission?.feedback !== newFeedback) {
          gradeAssignmentInput.feedback = newFeedback;
        }
      }

      await gradeAssignment({
        variables: { gradeAssignmentInput },
      });
    } catch (error) {
      console.error("Failed to grade assignment:", error);
    } finally {
      setGradeLoading(false);
    }
  };

  // Form field configurations for grading
  const gradeSubmissionFields: UpdateFormField[] = [
    {
      name: "score",
      type: "number",
      label: "Score",
      placeholder: "Enter score (0-100)",
      required: submissionToGrade?.status !== "GRADED", // Not required if already graded
      initialValue: submissionToGrade?.score?.toString() || "",
      validation: (value) => {
        // Allow empty value if submission is already graded (for partial updates)
        if (!value && submissionToGrade?.status === "GRADED") {
          return { valid: true, message: "" };
        }

        const score = Number(value);
        if (isNaN(score) || score < 0 || score > 100) {
          return {
            valid: false,
            message: "Score must be a number between 0 and 100",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "feedback",
      type: "textarea",
      label: "Feedback",
      placeholder: "Enter feedback for the student",
      required: false,
      initialValue: submissionToGrade?.feedback || "",
    },
  ];

  // Define table filters
  const tableFilters: TableFilter[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Submitted", value: "SUBMITTED" },
        { label: "Graded", value: "GRADED" },
        { label: "Late", value: "LATE" },
      ],
    },
  ];

  // Get status badge variant and icon
  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return {
          variant: "default" as const,
          icon: Clock,
          color: "text-blue-600 dark:text-blue-400",
        };
      case "graded":
        return {
          variant: "default" as const,
          icon: CheckCircle,
          color: "text-green-600 dark:text-green-400",
        };
      case "late":
        return {
          variant: "destructive" as const,
          icon: XCircle,
          color: "text-red-600 dark:text-red-400",
        };
      default:
        return {
          variant: "secondary" as const,
          icon: Clock,
          color: "text-gray-600 dark:text-gray-400",
        };
    }
  };

  // Table columns configuration
  const columns: TableColumn<AssignmentSubmission>[] = [
    {
      key: "student",
      title: "Student",
      sortable: true,
      render: (value: any) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {value ? `${value.firstName} ${value.lastName}` : "-"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {value ? value.username : "-"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {value ? value.email : "-"}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (value: string) => {
        const { variant, icon: StatusIcon, color } = getStatusInfo(value);
        return (
          <div className="flex items-center space-x-2">
            <StatusIcon className={`h-4 w-4 ${color}`} />
            <Badge variant={variant}>{value}</Badge>
          </div>
        );
      },

      align: "center",
    },
    {
      key: "score",
      title: "Score",
      sortable: true,
      render: (value: number | null) => (
        <div className="text-center">
          {value !== null ? (
            <div className="flex items-center justify-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{value}/100</span>
            </div>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      ),

      align: "center",
    },
    {
      key: "submittedAt",
      title: "Submitted",
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
      key: "gradedAt",
      title: "Graded",
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
            <span className="text-gray-400">Not graded</span>
          )}
        </div>
      ),
    },
    {
      key: "submissionFiles",
      title: "Files",
      render: (value: string | null) => (
        <div className="text-center">
          {value ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Handle file download/view
                window.open(value, "_blank");
              }}
              className="h-8 px-2"
            >
              <Download className="h-3 w-3 mr-1" />
              View
            </Button>
          ) : (
            <span className="text-gray-400">No files</span>
          )}
        </div>
      ),

      align: "center",
    },
  ];

  // Table actions - static actions but logic handled in onClick
  const actions: TableAction<AssignmentSubmission>[] = [
    {
      label: "View Details",
      onClick: (submission: AssignmentSubmission) => {
        console.log("View submission:", submission.id);
        // TODO: Add navigation logic here - could open a modal or navigate to details page
      },
      icon: Eye,
    },
    {
      label: "Grade/Update",
      onClick: (submission: AssignmentSubmission) => {
        setSubmissionToGrade(submission);
        setGradeDialogOpen(true);
      },
      icon: Star,
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
      setCurrentPage(1); // Reset to first page when sorting
    },
    []
  );

  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedSubmissions(selectedIds);
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((filterKey: string, value: string) => {
    if (filterKey === "status") {
      setStatusFilter(value);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Handle back navigation
  // Use server-side filtered and paginated data
  const submissions = (data?.assignmentSubmissions?.data || []).filter(
    (
      submission: AssignmentSubmission | null
    ): submission is AssignmentSubmission => submission !== null
  );

  // Use server-side pagination meta
  const meta: PaginationMeta = data?.assignmentSubmissions?.meta || {
    page: currentPage,
    limit: pageSize,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
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
            Error Loading Assignment Submissions
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
      {/* Assignment Submissions Table */}
      <div className="w-full">
        <DynamicTable
          data={submissions}
          columns={columns}
          meta={meta}
          loading={loading}
          title={
            assignmentData?.assignment?.title
              ? `${assignmentData.assignment.title} - Submissions`
              : "Assignment Submissions"
          }
          selectable={false}
          actions={actions}
          filters={tableFilters}
          selectedRows={selectedSubmissions}
          onSelectionChange={handleSelectionChange}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          rowKey="id"
          emptyMessage="No submissions found for this assignment"
          className="bg-white dark:bg-gray-900"
        />
      </div>

      {/* Grade Submission Dialog */}
      {submissionToGrade && (
        <DynamicUpdateDialog
          id={submissionToGrade.id}
          title={`${
            submissionToGrade.status === "GRADED"
              ? "Update Grade"
              : "Grade Submission"
          } - ${submissionToGrade.student?.firstName} ${
            submissionToGrade.student?.lastName
          }`}
          fields={gradeSubmissionFields}
          onSubmit={handleGradeAssignment}
          submitLabel={
            submissionToGrade.status === "GRADED"
              ? "Update Grade"
              : "Save Grade"
          }
          isLoading={gradeLoading}
          open={gradeDialogOpen}
          setOpen={setGradeDialogOpen}
        />
      )}
    </div>
  );
};

export default AssignmentSubmissions;
