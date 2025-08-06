import { useMutation, useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import { Edit, Eye, Trash2, BookOpen, List, Upload, RefreshCw } from "lucide-react";
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
import ImageUploadDialog from "../components/shared/ImageUploadDialog";
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
  DialogFooter,
} from "../components/ui/dialog";
import type {
  CreateCourseInput,
  UpdateCourseInput,
  Course,
  CourseFilterInput,
} from "../generated/graphql";
import { COURSES } from "../graphql/query/course";
import {
  BULK_REMOVE_COURSES,
  CREATE_COURSE,
  REMOVE_COURSE,
  UPDATE_COURSE,
  HARD_DELETE_COURSE,
  BULK_HARD_DELETE_COURSES,
} from "../graphql/mutation/course";
import toast from "react-hot-toast";

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isActiveFilter, setIsActiveFilter] = useState<string>("");

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [bulkDeactivateDialogOpen, setBulkDeactivateDialogOpen] =
    useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [imageViewerData, setImageViewerData] = useState<{
    url: string;
    title: string;
    type: "thumbnail" | "cover";
    courseId: string;
  } | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadDialogData, setUploadDialogData] = useState<{
    courseId: string;
    courseTitle: string;
    imageType: "thumbnail" | "cover";
  } | null>(null);
  const [courseToUpdate, setCourseToUpdate] = useState<Course | null>(null);
  const [courseToDeactivate, setCourseToDeactivate] = useState<Course | null>(
    null
  );
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [coursesToDeactivate, setCoursesToDeactivate] = useState<string[]>([]);
  const [coursesToDelete, setCoursesToDelete] = useState<string[]>([]);

  // Loading states for operations
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deactivateLoading, setDeactivateLoading] = useState(false);
  const [bulkDeactivateLoading, setBulkDeactivateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  // Build filter based on search term
  const filter: CourseFilterInput = {
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

  const { data, loading, error, refetch } = useQuery(COURSES, {
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
  const [createCourse] = useMutation(CREATE_COURSE, {
    onCompleted: () => {
      toast.success("Course created successfully");
      refetch(); // Refresh the courses list
      setCreateDialogOpen(false); // Close create dialog
    },
    onError: (error) => {
      console.error("Error creating course:", error);
      toast.error(`Error creating course: ${error.message}`);
    },
  });

  const [updateCourse] = useMutation(UPDATE_COURSE, {
    onCompleted: () => {
      toast.success("Course updated successfully");
      refetch(); // Refresh the courses list
      setUpdateDialogOpen(false); // Close update dialog
      setCourseToUpdate(null); // Clear selected course
    },
    onError: (error) => {
      console.error("Error updating course:", error);
      toast.error(`Error updating course: ${error.message}`);
    },
  });

  const [removeCourse] = useMutation(REMOVE_COURSE, {
    onCompleted: () => {
      toast.success("Course deactivated successfully");
      refetch(); // Refresh the courses list
      setDeactivateDialogOpen(false);
      setCourseToDeactivate(null);
    },
    onError: (error) => {
      console.error("Error deactivating course:", error);
      toast.error(`Error deactivating course: ${error.message}`);
    },
  });

  const [bulkRemoveCourses] = useMutation(BULK_REMOVE_COURSES, {
    onCompleted: () => {
      if (coursesToDeactivate.length === 1) {
        toast.success("Course deactivated successfully");
      } else {
        toast.success(
          `${coursesToDeactivate.length} courses deactivated successfully`
        );
      }
      refetch(); // Refresh the courses list
      setBulkDeactivateDialogOpen(false); // Close bulk deactivate dialog
      setSelectedCourses([]); // Clear selection
      setCoursesToDeactivate([]); // Clear courses to deactivate
    },
    onError: (error) => {
      console.error("Error bulk deactivating courses:", error);
      toast.error(`Error bulk deactivating courses: ${error.message}`);
    },
  });

  const [deleteCourse] = useMutation(HARD_DELETE_COURSE, {
    onCompleted: () => {
      toast.success("Course deleted successfully");
      refetch(); // Refresh the courses list
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting course:", error);
      toast.error(`Error deleting course: ${error.message}`);
    },
  });

  const [bulkDeleteCourses] = useMutation(BULK_HARD_DELETE_COURSES, {
    onCompleted: () => {
      if (coursesToDelete.length === 1) {
        toast.success("Course deleted successfully");
      } else {
        toast.success(`${coursesToDelete.length} courses deleted successfully`);
      }
      refetch(); // Refresh the courses list
      setBulkDeleteDialogOpen(false); // Close bulk delete dialog
      setSelectedCourses([]); // Clear selection
      setCoursesToDelete([]); // Clear courses to delete
    },
    onError: (error) => {
      console.error("Error bulk deleting courses:", error);
      toast.error(`Error bulk deleting courses: ${error.message}`);
    },
  });

  // CRUD Functions - Ready for integration with forms/modals
  const handleCreateCourse = async (formData: Record<string, any>) => {
    setCreateLoading(true);
    try {
      const createCourseInput: CreateCourseInput = {
        title: formData.title,
        description: formData.description || null,
        coverImage: formData.coverImage || null,
        thumbnail: formData.thumbnail || null,
        isActive: formData.isActive !== undefined ? formData.isActive : true,
      };

      await createCourse({
        variables: { createCourseInput },
      });
    } catch (error) {
      console.error("Failed to create course:", error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateCourse = async (
    id: string,
    formData: Record<string, any>
  ) => {
    setUpdateLoading(true);
    try {
      const updateCourseInput: UpdateCourseInput = {
        ...(formData.title && { title: formData.title }),
        ...(formData.description !== undefined && {
          description: formData.description,
        }),
        ...(formData.coverImage !== undefined && {
          coverImage: formData.coverImage,
        }),
        ...(formData.thumbnail !== undefined && {
          thumbnail: formData.thumbnail,
        }),
        ...(formData.isActive !== undefined && { isActive: formData.isActive }),
      };

      await updateCourse({
        variables: { id, updateCourseInput },
      });
    } catch (error) {
      console.error("Failed to update course:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Delete operation handlers
  const handleRemoveCourse = async (id: string) => {
    setDeactivateLoading(true);
    try {
      await removeCourse({
        variables: { id },
      });
      setDeactivateDialogOpen(false);
      setCourseToDeactivate(null);
    } catch (error) {
      console.error("Failed to deactivate course:", error);
    } finally {
      setDeactivateLoading(false);
    }
  };

  const handleBulkRemoveCourses = async (courseIds: string[]) => {
    setBulkDeactivateLoading(true);
    try {
      await bulkRemoveCourses({
        variables: {
          bulkRemoveCoursesInput: {
            courseIds,
          },
        },
      });
      setBulkDeactivateDialogOpen(false);
      setCoursesToDeactivate([]);
    } catch (error) {
      console.error("Failed to bulk deactivate courses:", error);
    } finally {
      setBulkDeactivateLoading(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    setDeleteLoading(true);
    try {
      await deleteCourse({
        variables: { id },
      });
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    } catch (error) {
      console.error("Failed to delete course:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBulkDeleteCourses = async (courseIds: string[]) => {
    setBulkDeleteLoading(true);
    try {
      await bulkDeleteCourses({
        variables: { ids: courseIds },
      });
      setBulkDeleteDialogOpen(false);
      setCoursesToDelete([]);
    } catch (error) {
      console.error("Failed to bulk delete courses:", error);
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  // Form field configurations
  const createCourseFields: FormField[] = [
    {
      name: "title",
      type: "text",
      label: "Course Title",
      placeholder: "Enter course title",
      required: true,
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Course title must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      placeholder: "Enter course description",
      required: false,
    },
    {
      name: "coverImage",
      type: "text",
      label: "Cover Image URL",
      placeholder: "Enter cover image URL",
      required: false,
    },
    {
      name: "thumbnail",
      type: "text",
      label: "Thumbnail URL",
      placeholder: "Enter thumbnail URL",
      required: false,
    },
    {
      name: "isActive",
      type: "switch",
      label: "Active Status",
    },
  ];

  const updateCourseFields: UpdateFormField[] = [
    {
      name: "title",
      type: "text",
      label: "Course Title",
      placeholder: "Enter course title",
      required: true,
      initialValue: courseToUpdate?.title || "",
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Course title must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      placeholder: "Enter course description",
      required: false,
      initialValue: courseToUpdate?.description || "",
    },
    {
      name: "coverImage",
      type: "text",
      label: "Cover Image URL",
      placeholder: "Enter cover image URL",
      required: false,
      initialValue: courseToUpdate?.coverImage || "",
    },
    {
      name: "thumbnail",
      type: "text",
      label: "Thumbnail URL",
      placeholder: "Enter thumbnail URL",
      required: false,
      initialValue: courseToUpdate?.thumbnail || "",
    },
    {
      name: "isActive",
      type: "switch",
      label: "Active Status",
      initialValue: courseToUpdate?.isActive || false,
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
  const columns: TableColumn<Course>[] = [
    {
      key: "title",
      title: "Course Title",
      sortable: true,
      render: (value: string) => (
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {value}
        </p>
      ),
    },
    {
      key: "coverImage",
      title: "Cover Image",
      render: (value: string | null, row: Course) => (
        <div className="flex justify-center">
          {value ? (
            <div className="relative group">
              <div 
                className="cursor-pointer"
                onClick={() => handleImageClick(value, row.title, "cover", row.id)}
              >
                <img
                  src={
                    value.startsWith('http') 
                      ? value 
                      : `https://api.learnwithrazeen.in${value}`
                  }
                  alt={`${row.title} cover`}
                  className="w-16 h-12 object-cover rounded-lg"
                  onError={(e) => {
                    console.error('Failed to load cover image:', value);
                    // Hide the image if it fails to load
                    e.currentTarget.style.display = 'none';
                    // Show upload button instead
                    const parent = e.currentTarget.parentElement?.parentElement?.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <button class="w-16 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors">
                          <div class="text-center">
                            <svg class="w-4 h-4 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <span class="text-xs">Upload</span>
                          </div>
                        </button>
                      `;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <Eye className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ) : (
            <button
              className="w-16 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors"
              onClick={() => handleUploadClick(row.id, row.title, "cover")}
            >
              <div className="text-center">
                <Upload className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">Upload</span>
              </div>
            </button>
          )}
        </div>
      ),
      align: "center",
    },
    {
      key: "thumbnail",
      title: "Thumbnail",
      render: (value: string | null, row: Course) => (
        <div className="flex justify-center">
          {value ? (
            <div className="relative group">
              <div 
                className="cursor-pointer"
                onClick={() => handleImageClick(value, row.title, "thumbnail", row.id)}
              >
                <img
                  src={
                    value.startsWith('http') 
                      ? value 
                      : `https://api.learnwithrazeen.in${value}`
                  }
                  alt={`${row.title} thumbnail`}
                  className="w-16 h-12 object-cover rounded-lg"
                  onError={(e) => {
                    console.error('Failed to load thumbnail:', value);
                    // Hide the image if it fails to load
                    e.currentTarget.style.display = 'none';
                    // Show upload button instead
                    const parent = e.currentTarget.parentElement?.parentElement?.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <button class="w-16 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors">
                          <div class="text-center">
                            <svg class="w-4 h-4 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <span class="text-xs">Upload</span>
                          </div>
                        </button>
                      `;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <Eye className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ) : (
            <button
              className="w-16 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors"
              onClick={() => handleUploadClick(row.id, row.title, "thumbnail")}
            >
              <div className="text-center">
                <Upload className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">Upload</span>
              </div>
            </button>
          )}
        </div>
      ),
      align: "center",
    },
    {
      key: "chapters",
      title: "Chapters",
      render: (value: any[] | null, row: Course) => (
        <div className="text-sm text-center">
          <button
            onClick={() => navigate(`/courses/${row.id}/chapters`)}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors cursor-pointer"
          >
            {value ? value.length : 0} chapters
          </button>
        </div>
      ),
      align: "center",
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
  const actions: TableAction<Course>[] = [
    {
      label: "View Chapters",
      onClick: (course: Course) => {
        navigate(`/courses/${course.id}/chapters`);
      },
      icon: List,
    },
    {
      label: "Edit Course",
      onClick: (course: Course) => {
        setCourseToUpdate(course);
        setUpdateDialogOpen(true);
      },
      icon: Edit,
    },
    {
      label: "Deactivate Course",
      onClick: (course: Course) => {
        setCourseToDeactivate(course);
        setDeactivateDialogOpen(true);
      },
      icon: Trash2,
    },
    {
      label: "Delete Course",
      onClick: (course: Course) => {
        setCourseToDelete(course);
        setDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
  ];

  // Bulk actions for selected courses
  const bulkActions: BulkAction[] = [
    {
      label: "Deactivate Selected",
      onClick: (selectedIds: string[]) => {
        setCoursesToDeactivate(selectedIds);
        setBulkDeactivateDialogOpen(true);
      },
      icon: Trash2,
    },
    {
      label: "Delete Selected",
      onClick: (selectedIds: string[]) => {
        setCoursesToDelete(selectedIds);
        setBulkDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
    {
      label: "Activate Selected",
      onClick: (_selectedIds: string[]) => {
        setSelectedCourses([]);
      },
      icon: BookOpen,
    },
  ];

  // Handle add new course
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
    setSelectedCourses(selectedIds);
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((filterKey: string, value: string) => {
    if (filterKey === "isActive") {
      setIsActiveFilter(value);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Handle image viewer
  const handleImageClick = useCallback(
    (url: string, title: string, type: "thumbnail" | "cover", courseId: string) => {
      console.log('Image clicked:', { url, title, type, courseId });
      setImageViewerData({ url, title, type, courseId });
      setImageViewerOpen(true);
    },
    []
  );

  // Handle image upload
  const handleUploadClick = useCallback(
    (
      courseId: string,
      courseTitle: string,
      imageType: "thumbnail" | "cover"
    ) => {
      setUploadDialogData({ courseId, courseTitle, imageType });
      setUploadDialogOpen(true);
    },
    []
  );

  // Handle upload success
  const handleUploadSuccess = useCallback(() => {
    refetch(); // Refresh the courses list to show updated images
  }, [refetch]);

  // Prepare data for the table
  const courses = (data?.courses?.data || []).filter(
    (course: Course | null): course is Course => course !== null
  );
  const meta: PaginationMeta = {
    page: data?.courses?.meta?.page || 1,
    limit: data?.courses?.meta?.limit || 10,
    total: data?.courses?.meta?.total || 0,
    totalPages: data?.courses?.meta?.totalPages || 1,
    hasNext: data?.courses?.meta?.hasNext || false,
    hasPrev: data?.courses?.meta?.hasPrev || false,
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <BookOpen className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Error Loading Courses
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
      {/* Courses Table */}
      <div className="w-full">
        <DynamicTable
          data={courses}
          columns={columns}
          meta={meta}
          loading={loading}
          title="Courses Management"
          selectable={true}
          actions={actions}
          bulkActions={bulkActions}
          filters={tableFilters}
          selectedRows={selectedCourses}
          onSelectionChange={handleSelectionChange}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onAddNew={handleAddNew}
          addNewLabel="Add Course"
          rowKey="id"
          emptyMessage="No courses found"
          className="bg-white dark:bg-gray-900"
        />
      </div>

      {/* Create Course Dialog */}
      <DynamicCreateDialog
        title="Create New Course"
        fields={createCourseFields}
        onSubmit={handleCreateCourse}
        submitLabel="Create Course"
        isLoading={createLoading}
        open={createDialogOpen}
        setOpen={setCreateDialogOpen}
      />

      {/* Update Course Dialog */}
      {courseToUpdate && (
        <DynamicUpdateDialog
          id={courseToUpdate.id}
          title="Update Course"
          fields={updateCourseFields}
          onSubmit={handleUpdateCourse}
          submitLabel="Update Course"
          isLoading={updateLoading}
          open={updateDialogOpen}
          setOpen={setUpdateDialogOpen}
        />
      )}

      {/* Single Course Deactivate Confirmation Dialog */}
      {courseToDeactivate && (
        <ConfirmDeleteDialog
          title="Deactivate Course"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to deactivate the course{" "}
                <strong>{courseToDeactivate.title}</strong>?
              </p>
            </div>
          }
          description="This action will set the course's isActive status to false, and you can reactivate it later"
          onConfirm={() => handleRemoveCourse(courseToDeactivate.id)}
          isLoading={deactivateLoading}
          open={deactivateDialogOpen}
          setOpen={setDeactivateDialogOpen}
          confirmLabel="Deactivate"
        />
      )}

      {/* Single Course Delete Confirmation Dialog */}
      {courseToDelete && (
        <ConfirmDeleteDialog
          title="Delete Course"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete the course{" "}
                <strong>{courseToDelete.title}</strong>?
              </p>
            </div>
          }
          description="This action will permanently delete the course and cannot be undone"
          onConfirm={() => handleDeleteCourse(courseToDelete.id)}
          isLoading={deleteLoading}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          confirmLabel="Delete"
        />
      )}

      {/* Bulk Deactivate Confirmation Dialog */}
      {coursesToDeactivate.length > 0 && (
        <ConfirmDeleteDialog
          title={`Deactivate ${coursesToDeactivate.length} Courses`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to deactivate{" "}
                <strong>{coursesToDeactivate.length}</strong> selected courses?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">
                  Courses to be deactivated:
                </p>
                <ul className="text-sm space-y-1">
                  {coursesToDeactivate.map((courseId) => {
                    const course = courses.find(
                      (c: Course) => c.id === courseId
                    );
                    return course ? (
                      <li key={courseId} className="flex justify-between">
                        <span>{course.title}</span>
                        <span className="text-gray-500">
                          {course.chapters?.length || 0} chapters
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          }
          description="This action will set the courses' isActive status to false, and you can reactivate them later"
          onConfirm={() => handleBulkRemoveCourses(coursesToDeactivate)}
          isLoading={bulkDeactivateLoading}
          open={bulkDeactivateDialogOpen}
          setOpen={setBulkDeactivateDialogOpen}
          confirmLabel={`Deactivate ${coursesToDeactivate.length} Courses`}
        />
      )}

      {/* Bulk Delete Confirmation Dialog */}
      {coursesToDelete.length > 0 && (
        <ConfirmDeleteDialog
          title={`Delete ${coursesToDelete.length} Courses`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete{" "}
                <strong>{coursesToDelete.length}</strong> selected courses?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">
                  Courses to be deleted:
                </p>
                <ul className="text-sm space-y-1">
                  {coursesToDelete.map((courseId) => {
                    const course = courses.find(
                      (c: Course) => c.id === courseId
                    );
                    return course ? (
                      <li key={courseId} className="flex justify-between">
                        <span>{course.title}</span>
                        <span className="text-gray-500">
                          {course.chapters?.length || 0} chapters
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          }
          description="This action will permanently delete the courses and cannot be undone"
          onConfirm={() => handleBulkDeleteCourses(coursesToDelete)}
          isLoading={bulkDeleteLoading}
          open={bulkDeleteDialogOpen}
          setOpen={setBulkDeleteDialogOpen}
          confirmLabel={`Delete ${coursesToDelete.length} Courses`}
        />
      )}

      {/* Image Viewer Dialog */}
      {imageViewerData && (
        <Dialog open={imageViewerOpen} onOpenChange={setImageViewerOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {imageViewerData.title} -{" "}
                {imageViewerData.type === "thumbnail"
                  ? "Thumbnail"
                  : "Cover Image"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <img
                src={
                  imageViewerData.url.startsWith('http') 
                    ? imageViewerData.url 
                    : `https://api.learnwithrazeen.in${imageViewerData.url}`
                }
                alt={`${imageViewerData.title} ${imageViewerData.type}`}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                onLoad={() => {
                  console.log('Image loaded successfully:', imageViewerData.url);
                }}
                onError={(e) => {
                  console.error('Failed to load image in viewer:', imageViewerData.url);
                  const currentSrc = e.currentTarget.src;
                  console.error('Attempted URL:', currentSrc);
                  
                  // Try different URL formats
                  if (currentSrc.includes('https://api.learnwithrazeen.in') && !imageViewerData.url.startsWith('http')) {
                    console.log('Trying original URL without base...');
                    e.currentTarget.src = imageViewerData.url;
                  } else if (!currentSrc.includes('https://api.learnwithrazeen.in') && !imageViewerData.url.startsWith('http')) {
                    console.log('Trying with base URL...');
                    e.currentTarget.src = `https://api.learnwithrazeen.in${imageViewerData.url}`;
                  }
                }}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setImageViewerOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setImageViewerOpen(false);
                  handleUploadClick(imageViewerData.courseId, imageViewerData.title, imageViewerData.type);
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Update {imageViewerData.type === "thumbnail" ? "Thumbnail" : "Cover Image"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Image Upload Dialog */}
      {uploadDialogData && (
        <ImageUploadDialog
          open={uploadDialogOpen}
          setOpen={setUploadDialogOpen}
          title={`${
            // Check if the course already has this image type
            (() => {
              const course = courses.find((c: Course) => c.id === uploadDialogData.courseId);
              const hasExistingImage = uploadDialogData.imageType === "thumbnail" 
                ? course?.thumbnail 
                : course?.coverImage;
              return hasExistingImage ? "Update" : "Upload";
            })()
          } ${
            uploadDialogData.imageType === "thumbnail"
              ? "Thumbnail"
              : "Cover Image"
          } for ${uploadDialogData.courseTitle}`}
          courseId={uploadDialogData.courseId}
          imageType={uploadDialogData.imageType}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default Courses;
