import { useMutation, useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import {
  FileText,
  Star,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  File,
  FileIcon,
  ImageIcon,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
  FileArchive,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import type {
  AssignmentSubmission,
  AssignmentFile,
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
  const [filesDialogOpen, setFilesDialogOpen] = useState(false);
  const [selectedSubmissionFiles, setSelectedSubmissionFiles] = useState<
    AssignmentFile[]
  >([]);
  const [selectedSubmissionText, setSelectedSubmissionText] = useState<
    string | null
  >(null);

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

  // Handle opening files dialog
  const handleViewFiles = (files: AssignmentFile[], submissionText?: string | null) => {
    setSelectedSubmissionFiles(files);
    setSelectedSubmissionText(submissionText || null);
    setFilesDialogOpen(true);
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
          color: "text-primary",
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
      title: "Submission",
      render: (value: AssignmentFile[] | null, record: AssignmentSubmission) => (
        <div className="text-center">
          {(value && value.length > 0) || record.submissionText ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewFiles(value || [], record.submissionText)}
              className="h-8 px-2"
            >
              <Eye className="h-3 w-3 mr-1" />
              View
              {value && value.length > 0 && ` (${value.length})`}
            </Button>
          ) : (
            <span className="text-gray-400">No submission</span>
          )}
        </div>
      ),
      align: "center",
    },
  ];

  // Table actions - static actions but logic handled in onClick
  const actions: TableAction<AssignmentSubmission>[] = [
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

      {/* Files View Dialog */}
      <Dialog open={filesDialogOpen} onOpenChange={setFilesDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Assignment Submission Content
            </DialogTitle>
            <DialogDescription>
              Files and text submitted by the student for this assignment
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {/* Files Section */}
            {selectedSubmissionFiles && selectedSubmissionFiles.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <FileIcon className="h-5 w-5" />
                  Attached Files ({selectedSubmissionFiles.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSubmissionFiles.map((file, index) => (
                    <div
                      key={index}
                      onClick={() => window.open(file.filePath || '#', '_blank')}
                      className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group hover:shadow-md"
                    >
                      <div className="flex items-center space-x-3">
                        {/* File Type Icon */}
                        <div className="flex-shrink-0 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          {file.mimeType?.includes('pdf') ? (
                            <FileText className="h-10 w-10 text-red-500" />
                          ) : file.mimeType?.includes('image') ? (
                            <ImageIcon className="h-10 w-10 text-blue-500" />
                          ) : file.mimeType?.includes('video') ? (
                            <FileVideo className="h-10 w-10 text-purple-500" />
                          ) : file.mimeType?.includes('audio') ? (
                            <FileAudio className="h-10 w-10 text-green-500" />
                          ) : file.mimeType?.includes('document') || file.mimeType?.includes('text') ? (
                            <FileText className="h-10 w-10 text-orange-500" />
                          ) : file.mimeType?.includes('spreadsheet') || file.fileName.includes('.xlsx') || file.fileName.includes('.xls') ? (
                            <FileSpreadsheet className="h-10 w-10 text-emerald-500" />
                          ) : file.mimeType?.includes('zip') || file.mimeType?.includes('archive') ? (
                            <FileArchive className="h-10 w-10 text-yellow-500" />
                          ) : (
                            <File className="h-10 w-10 text-gray-500" />
                          )}
                        </div>
                        
                        {/* File Details */}
                        <div className="flex-1 min-w-0">
                          <p 
                            className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words leading-tight" 
                            title={file.fileName}
                          >
                            {file.fileName}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            {file.fileSize && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                              </span>
                            )}
                            {/* File Type Badge */}
                            {file.mimeType && (
                              <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300 font-medium">
                                {file.mimeType.split('/')[1]?.toUpperCase() || 'FILE'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submission Text Section */}
            {selectedSubmissionText && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Text Submission
                </h4>
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {selectedSubmissionText}
                  </pre>
                </div>
              </div>
            )}

            {/* Empty State */}
            {(!selectedSubmissionFiles || selectedSubmissionFiles.length === 0) && !selectedSubmissionText && (
              <div className="text-center py-12">
                <File className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
                  No submission content found
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  The student hasn't submitted any files or text for this assignment
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignmentSubmissions;
