import { useMutation, useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import {
  Edit,
  Trash2,
  BookOpen,
  Move,
  Save,
  X,
} from "lucide-react";
import React, { useCallback, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  CustomButton,
} from "../components/shared/Table";
import DynamicTable from "../components/shared/Table";
import { Button } from "../components/ui/button";
import type {
  CreateChapterInput,
  UpdateChapterInput,
  Chapter,
  ChapterFilterInput,
} from "../generated/graphql";
import { CHAPTERS_PAGINATED } from "../graphql/query/chapter";
import { COURSE } from "../graphql/query/course";
import { REORDER_CHAPTERS } from "../graphql/mutation/chapter";
import {
  CREATE_CHAPTER,
  UPDATE_CHAPTER,
  HARD_DELETE_CHAPTER,
  BULK_HARD_DELETE_CHAPTERS,
} from "../graphql/mutation/chapter";
import toast from "react-hot-toast";

const Chapters: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [tempChapters, setTempChapters] = useState<Chapter[]>([]);
  const [reorderLoading, setReorderLoading] = useState(false);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [chapterToUpdate, setChapterToUpdate] = useState<Chapter | null>(null);
  const [chapterToDelete, setChapterToDelete] = useState<Chapter | null>(null);
  const [chaptersToDelete, setChaptersToDelete] = useState<string[]>([]);

  // Loading states for operations
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  // Redirect if no courseId
  useEffect(() => {
    if (!courseId) {
      navigate("/courses");
    }
  }, [courseId, navigate]);

  // Build filter based on search term and courseId
  const filter: ChapterFilterInput = {
    ...(courseId && { courseId }),
    ...(searchTerm && { search: searchTerm }),
  };

  // Build sort input
  const sort = sortKey ? { field: sortKey, order: sortDirection } : undefined;

  const { data, loading, error, refetch } = useQuery(CHAPTERS_PAGINATED, {
    variables: {
      filter,
      pagination: {
        page: currentPage,
        limit: pageSize,
      },
      sort,
    },
    skip: !courseId,
  });

  // Fetch course details for title
  const { data: courseData } = useQuery(COURSE, {
    variables: { id: courseId! },
    skip: !courseId,
  });

  // Mutation hooks
  const [createChapter] = useMutation(CREATE_CHAPTER, {
    onCompleted: () => {
      toast.success("Chapter created successfully");
      refetch(); // Refresh the chapters list
      setCreateDialogOpen(false); // Close create dialog
    },
    onError: (error) => {
      console.error("Error creating chapter:", error);
      toast.error(`Error creating chapter: ${error.message}`);
    },
  });

  const [updateChapter] = useMutation(UPDATE_CHAPTER, {
    onCompleted: () => {
      toast.success("Chapter updated successfully");
      refetch(); // Refresh the chapters list
      setUpdateDialogOpen(false); // Close update dialog
      setChapterToUpdate(null); // Clear selected chapter
    },
    onError: (error) => {
      console.error("Error updating chapter:", error);
      toast.error(`Error updating chapter: ${error.message}`);
    },
  });

  const [deleteChapter] = useMutation(HARD_DELETE_CHAPTER, {
    onCompleted: () => {
      toast.success("Chapter deleted successfully");
      refetch(); // Refresh the chapters list
      setDeleteDialogOpen(false);
      setChapterToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting chapter:", error);
      toast.error(`Error deleting chapter: ${error.message}`);
    },
  });

  const [bulkDeleteChapters] = useMutation(BULK_HARD_DELETE_CHAPTERS, {
    onCompleted: () => {
      if (chaptersToDelete.length === 1) {
        toast.success("Chapter deleted successfully");
      } else {
        toast.success(
          `${chaptersToDelete.length} chapters deleted successfully`
        );
      }
      refetch(); // Refresh the chapters list
      setBulkDeleteDialogOpen(false); // Close bulk delete dialog
      setSelectedChapters([]); // Clear selection
      setChaptersToDelete([]); // Clear chapters to delete
    },
    onError: (error) => {
      console.error("Error bulk deleting chapters:", error);
      toast.error(`Error bulk deleting chapters: ${error.message}`);
    },
  });

  const [reorderChapters] = useMutation(REORDER_CHAPTERS, {
    onCompleted: () => {
      toast.success("Chapters reordered successfully");
      refetch(); // Refresh the chapters list
      setIsReorderMode(false);
      setTempChapters([]);
    },
    onError: (error: any) => {
      console.error("Error reordering chapters:", error);
      toast.error(`Error reordering chapters: ${error.message}`);
    },
  });

  // Drag and Drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTempChapters((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Handle reorder save
  const handleSaveReorder = async () => {
    if (!courseId || tempChapters.length === 0) return;

    setReorderLoading(true);
    try {
      const chapterIds = tempChapters.map((chapter) => chapter.id);
      await reorderChapters({
        variables: {
          courseId,
          chapterIds,
        },
      });
    } catch (error) {
      console.error("Failed to reorder chapters:", error);
    } finally {
      setReorderLoading(false);
    }
  };

  // Handle cancel reorder
  const handleCancelReorder = () => {
    setIsReorderMode(false);
    setTempChapters([]);
  };

  // Handle enter reorder mode
  const handleEnterReorderMode = () => {
    setIsReorderMode(true);
    // Initialize temp chapters with sorted chapters
    const sortedChapters = [...chapters].sort(
      (a, b) => a.orderIndex - b.orderIndex
    );
    setTempChapters(sortedChapters);
  };

  // CRUD Functions - Ready for integration with forms/modals
  const handleCreateChapter = async (formData: Record<string, any>) => {
    setCreateLoading(true);
    try {
      const createChapterInput: CreateChapterInput = {
        title: formData.title,
        courseId: courseId!,
        orderIndex: parseInt(formData.orderIndex, 10) || 0,
      };

      await createChapter({
        variables: { createChapterInput },
      });
    } catch (error) {
      console.error("Failed to create chapter:", error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateChapter = async (
    id: string,
    formData: Record<string, any>
  ) => {
    setUpdateLoading(true);
    try {
      const updateChapterInput: UpdateChapterInput = {
        ...(formData.title && { title: formData.title }),
        ...(formData.orderIndex !== undefined && {
          orderIndex: parseInt(formData.orderIndex, 10) || 0,
        }),
        ...(formData.courseId && { courseId: formData.courseId }),
      };

      await updateChapter({
        variables: { id, updateChapterInput },
      });
    } catch (error) {
      console.error("Failed to update chapter:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteChapter = async (id: string) => {
    setDeleteLoading(true);
    try {
      await deleteChapter({
        variables: { id },
      });
      setDeleteDialogOpen(false);
      setChapterToDelete(null);
    } catch (error) {
      console.error("Failed to delete chapter:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBulkDeleteChapters = async (chapterIds: string[]) => {
    setBulkDeleteLoading(true);
    try {
      await bulkDeleteChapters({
        variables: { ids: chapterIds },
      });
      setBulkDeleteDialogOpen(false);
      setChaptersToDelete([]);
    } catch (error) {
      console.error("Failed to bulk delete chapters:", error);
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  // Form field configurations
  const createChapterFields: FormField[] = [
    {
      name: "title",
      type: "text",
      label: "Chapter Title",
      placeholder: "Enter chapter title",
      required: true,
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Chapter title must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "orderIndex",
      type: "number",
      label: "Order Index",
      placeholder: "Enter chapter order (0, 1, 2...)",
      required: true,
      validation: (value) => {
        if (value === undefined || value === null || value < 0) {
          return {
            valid: false,
            message: "Order index must be a non-negative number",
          };
        }
        return { valid: true, message: "" };
      },
    },
  ];

  const updateChapterFields: UpdateFormField[] = [
    {
      name: "title",
      type: "text",
      label: "Chapter Title",
      placeholder: "Enter chapter title",
      required: true,
      initialValue: chapterToUpdate?.title || "",
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Chapter title must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "orderIndex",
      type: "number",
      label: "Order Index",
      placeholder: "Enter chapter order (0, 1, 2...)",
      required: true,
      initialValue: chapterToUpdate?.orderIndex || 0,
      validation: (value) => {
        if (value === undefined || value === null || value < 0) {
          return {
            valid: false,
            message: "Order index must be a non-negative number",
          };
        }
        return { valid: true, message: "" };
      },
    },
  ];

  // Table columns configuration
  const columns: TableColumn<Chapter>[] = [
    {
      key: "orderIndex",
      title: "Order",
      sortable: true,
      render: (value: number) => (
        <div className="text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            #{value}
          </span>
        </div>
      ),

      align: "center",
    },
    {
      key: "title",
      title: "Chapter Title",
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
            {value && value.creator
              ? `${value.creator.firstName} ${value.creator.lastName}`
              : "-"}
          </p>
        </div>
      ),
    },
    {
      key: "modules",
      title: "Modules",
      render: (value: any[] | null, chapter: Chapter) => (
        <div className="text-sm text-center">
          <button
            onClick={() =>
              navigate(`/courses/${courseId}/chapters/${chapter.id}/modules`)
            }
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors cursor-pointer"
          >
            {value ? value.length : 0} modules
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
  const actions: TableAction<Chapter>[] = [
    {
      label: "View Modules",
      onClick: (chapter: Chapter) => {
        navigate(`/courses/${courseId}/chapters/${chapter.id}/modules`);
      },
      icon: BookOpen,
    },
    {
      label: "Edit Chapter",
      onClick: (chapter: Chapter) => {
        setChapterToUpdate(chapter);
        setUpdateDialogOpen(true);
      },
      icon: Edit,
    },
    {
      label: "Delete Chapter",
      onClick: (chapter: Chapter) => {
        setChapterToDelete(chapter);
        setDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
  ];

  // Bulk actions for selected chapters
  const bulkActions: BulkAction[] = [
    {
      label: "Delete Selected",
      onClick: (selectedIds: string[]) => {
        setChaptersToDelete(selectedIds);
        setBulkDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
  ];

  // Sortable Row Component for Reorder Mode
  const SortableRow: React.FC<{ chapter: Chapter; index: number }> = ({
    chapter,
    index,
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: chapter.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <tr
        ref={setNodeRef}
        style={style}
        className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50"
      >
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Move className="h-4 w-4" />
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              #{index + 1}
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {chapter.title}
          </p>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm">
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {chapter.course ? chapter.course.title : "-"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {chapter.course && chapter.course.creator
                ? `${chapter.course.creator.firstName} ${chapter.course.creator.lastName}`
                : "-"}
            </p>
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
            {chapter.modules?.length || 0} modules
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900 dark:text-gray-100">
            <p className="truncate">
              {new Date(chapter.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {formatDistanceToNow(new Date(chapter.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </td>
      </tr>
    );
  };

  // Handle add new chapter
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
    setSelectedChapters(selectedIds);
  }, []);

  // Prepare data for the table
  const chapters = (data?.chaptersPaginated?.data || []).filter(
    (chapter: Chapter | null): chapter is Chapter => chapter !== null
  );

  // Custom buttons for the table header
  const customButtons: CustomButton[] = [
    ...(chapters.length > 1 && !isReorderMode ? [{
      label: "Reorder Chapters",
      onClick: handleEnterReorderMode,
      variant: "outline" as const,
      icon: Move,
    }] : []),
  ];

  // Initialize temp chapters when entering reorder mode
  useEffect(() => {
    if (isReorderMode && chapters.length > 0) {
      const sortedChapters = [...chapters].sort(
        (a, b) => a.orderIndex - b.orderIndex
      );
      setTempChapters(sortedChapters);
    }
  }, [isReorderMode]); // Remove chapters from dependency array to prevent infinite loop

  const meta: PaginationMeta = {
    page: data?.chaptersPaginated?.meta?.page || 1,
    limit: data?.chaptersPaginated?.meta?.limit || 10,
    total: data?.chaptersPaginated?.meta?.total || 0,
    totalPages: data?.chaptersPaginated?.meta?.totalPages || 1,
    hasNext: data?.chaptersPaginated?.meta?.hasNext || false,
    hasPrev: data?.chaptersPaginated?.meta?.hasPrev || false,
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
            Error Loading Chapters
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
      {/* Chapters Table or Reorder Interface */}
      <div className="w-full">
        {isReorderMode ? (
          /* Reorder Interface */
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Reorder Chapters
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Drag and drop chapters to reorder them
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelReorder}
                    disabled={reorderLoading}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveReorder}
                    disabled={reorderLoading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {reorderLoading ? "Saving..." : "Save Order"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={tempChapters.map((ch) => ch.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Order
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Chapter Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Modules
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Created
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tempChapters.map((chapter, index) => (
                          <SortableRow
                            key={chapter.id}
                            chapter={chapter}
                            index={index}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>
        ) : (
          /* Normal Table */
          <DynamicTable
            data={chapters}
            columns={columns}
            meta={meta}
            loading={loading}
            title={
              courseData?.course?.title
                ? `${courseData.course.title} - Chapters`
                : "Chapters Management"
            }
            selectable={true}
            actions={actions}
            bulkActions={bulkActions}
            customButtons={customButtons}
            selectedRows={selectedChapters}
            onSelectionChange={handleSelectionChange}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
            onAddNew={handleAddNew}
            addNewLabel="Add Chapter"
            rowKey="id"
            emptyMessage="No chapters found"
            className="bg-white dark:bg-gray-900"
          />
        )}
      </div>

      {/* Create Chapter Dialog */}
      <DynamicCreateDialog
        title="Create New Chapter"
        fields={createChapterFields}
        onSubmit={handleCreateChapter}
        submitLabel="Create Chapter"
        isLoading={createLoading}
        open={createDialogOpen}
        setOpen={setCreateDialogOpen}
      />

      {/* Update Chapter Dialog */}
      {chapterToUpdate && (
        <DynamicUpdateDialog
          id={chapterToUpdate.id}
          title="Update Chapter"
          fields={updateChapterFields}
          onSubmit={handleUpdateChapter}
          submitLabel="Update Chapter"
          isLoading={updateLoading}
          open={updateDialogOpen}
          setOpen={setUpdateDialogOpen}
        />
      )}

      {/* Single Chapter Delete Confirmation Dialog */}
      {chapterToDelete && (
        <ConfirmDeleteDialog
          title="Delete Chapter"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete the chapter{" "}
                <strong>{chapterToDelete.title}</strong>?
              </p>
            </div>
          }
          description="This action will permanently delete the chapter and cannot be undone"
          onConfirm={() => handleDeleteChapter(chapterToDelete.id)}
          isLoading={deleteLoading}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          confirmLabel="Delete"
        />
      )}

      {/* Bulk Delete Confirmation Dialog */}
      {chaptersToDelete.length > 0 && (
        <ConfirmDeleteDialog
          title={`Delete ${chaptersToDelete.length} Chapters`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete{" "}
                <strong>{chaptersToDelete.length}</strong> selected chapters?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">
                  Chapters to be deleted:
                </p>
                <ul className="text-sm space-y-1">
                  {chaptersToDelete.map((chapterId) => {
                    const chapter = chapters.find(
                      (c: Chapter) => c.id === chapterId
                    );
                    return chapter ? (
                      <li key={chapterId} className="flex justify-between">
                        <span>{chapter.title}</span>
                        <span className="text-gray-500">
                          {chapter.modules?.length || 0} modules
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          }
          description="This action will permanently delete the chapters and cannot be undone"
          onConfirm={() => handleBulkDeleteChapters(chaptersToDelete)}
          isLoading={bulkDeleteLoading}
          open={bulkDeleteDialogOpen}
          setOpen={setBulkDeleteDialogOpen}
          confirmLabel={`Delete ${chaptersToDelete.length} Chapters`}
        />
      )}
    </div>
  );
};

export default Chapters;
