import { useMutation, useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import {
  Edit,
  Trash2,
  BookOpen,
  Move,
  Save,
  X,
  FileText,
  Video,
  File,
  Upload,
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
import ModuleFileUploadDialog from "../components/shared/ModuleFileUploadDialog";
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
  CreateModuleInput,
  UpdateModuleInput,
  Module,
  ModuleFilterInput,
} from "../generated/graphql";
import { MODULES_PAGINATED } from "../graphql/query/module";
import { CHAPTER } from "../graphql/query/chapter";
import { REORDER_MODULES } from "../graphql/mutation/module";
import {
  CREATE_MODULE,
  UPDATE_MODULE,
  HARD_DELETE_MODULE,
  BULK_HARD_DELETE_MODULES,
} from "../graphql/mutation/module";
import toast from "react-hot-toast";

const Modules: React.FC = () => {
  const { courseId, chapterId } = useParams<{
    courseId: string;
    chapterId: string;
  }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [tempModules, setTempModules] = useState<Module[]>([]);
  const [reorderLoading, setReorderLoading] = useState(false);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
  const [fileUploadData, setFileUploadData] = useState<{
    moduleId: string;
    moduleName: string;
    moduleType?: any;
  } | null>(null);
  const [moduleToUpdate, setModuleToUpdate] = useState<Module | null>(null);
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);
  const [modulesToDelete, setModulesToDelete] = useState<string[]>([]);

  // Loading states for operations
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  // Redirect if no chapterId or courseId
  useEffect(() => {
    if (!chapterId || !courseId) {
      navigate("/courses");
    }
  }, [chapterId, courseId, navigate]);

  // Build filter based on search term and chapterId
  const filter: ModuleFilterInput = {
    ...(chapterId && { chapterId }),
    ...(searchTerm && { search: searchTerm }),
  };

  // Build sort input
  const sort = sortKey ? { field: sortKey, order: sortDirection } : undefined;

  const { data, loading, error, refetch } = useQuery(MODULES_PAGINATED, {
    variables: {
      filter,
      pagination: {
        page: currentPage,
        limit: pageSize,
      },
      sort,
    },
    skip: !chapterId,
  });

  // Fetch chapter details for title
  const { data: chapterData } = useQuery(CHAPTER, {
    variables: { id: chapterId! },
    skip: !chapterId,
  });

  // Mutation hooks
  const [createModule] = useMutation(CREATE_MODULE, {
    onCompleted: () => {
      toast.success("Module created successfully");
      refetch(); // Refresh the modules list
      setCreateDialogOpen(false); // Close create dialog
    },
    onError: (error) => {
      console.error("Error creating module:", error);
      toast.error(`Error creating module: ${error.message}`);
    },
  });

  const [updateModule] = useMutation(UPDATE_MODULE, {
    onCompleted: () => {
      toast.success("Module updated successfully");
      refetch(); // Refresh the modules list
      setUpdateDialogOpen(false); // Close update dialog
      setModuleToUpdate(null); // Clear selected module
    },
    onError: (error) => {
      console.error("Error updating module:", error);
      toast.error(`Error updating module: ${error.message}`);
    },
  });

  const [deleteModule] = useMutation(HARD_DELETE_MODULE, {
    onCompleted: () => {
      toast.success("Module deleted successfully");
      refetch(); // Refresh the modules list
      setDeleteDialogOpen(false);
      setModuleToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting module:", error);
      toast.error(`Error deleting module: ${error.message}`);
    },
  });

  const [bulkDeleteModules] = useMutation(BULK_HARD_DELETE_MODULES, {
    onCompleted: () => {
      if (modulesToDelete.length === 1) {
        toast.success("Module deleted successfully");
      } else {
        toast.success(`${modulesToDelete.length} modules deleted successfully`);
      }
      refetch(); // Refresh the modules list
      setBulkDeleteDialogOpen(false); // Close bulk delete dialog
      setSelectedModules([]); // Clear selection
      setModulesToDelete([]); // Clear modules to delete
    },
    onError: (error) => {
      console.error("Error bulk deleting modules:", error);
      toast.error(`Error bulk deleting modules: ${error.message}`);
    },
  });

  const [reorderModules] = useMutation(REORDER_MODULES, {
    onCompleted: () => {
      toast.success("Modules reordered successfully");
      refetch(); // Refresh the modules list
      setIsReorderMode(false);
      setTempModules([]);
    },
    onError: (error: any) => {
      console.error("Error reordering modules:", error);
      toast.error(`Error reordering modules: ${error.message}`);
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
      setTempModules((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Handle reorder save
  const handleSaveReorder = async () => {
    if (!chapterId || tempModules.length === 0) return;

    setReorderLoading(true);
    try {
      const moduleIds = tempModules.map((module) => module.id);
      await reorderModules({
        variables: {
          chapterId,
          moduleIds,
        },
      });
    } catch (error) {
      console.error("Failed to reorder modules:", error);
    } finally {
      setReorderLoading(false);
    }
  };

  // Handle cancel reorder
  const handleCancelReorder = () => {
    setIsReorderMode(false);
    setTempModules([]);
  };

  // Handle enter reorder mode
  const handleEnterReorderMode = () => {
    setIsReorderMode(true);
    // Initialize temp modules with sorted modules
    const sortedModules = [...modules].sort(
      (a, b) => a.orderIndex - b.orderIndex
    );
    setTempModules(sortedModules);
  };

  // CRUD Functions - Ready for integration with forms/modals
  const handleCreateModule = async (formData: Record<string, any>) => {
    setCreateLoading(true);
    try {
      const createModuleInput: CreateModuleInput = {
        title: formData.title,
        chapterId: chapterId!,
        type: formData.type,
        orderIndex: parseInt(formData.orderIndex, 10) || 0,
        ...(formData.content && { content: formData.content }),
        ...(formData.duration && { duration: parseFloat(formData.duration) }),
      };

      await createModule({
        variables: { createModuleInput },
      });
    } catch (error) {
      console.error("Failed to create module:", error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateModule = async (
    id: string,
    formData: Record<string, any>
  ) => {
    setUpdateLoading(true);
    try {
      const updateModuleInput: UpdateModuleInput = {
        ...(formData.title !== undefined && { title: formData.title }),
        ...(formData.type !== undefined && { type: formData.type }),
        ...(formData.orderIndex !== undefined && {
          orderIndex: parseInt(formData.orderIndex, 10) || 0,
        }),
        ...(formData.content !== undefined && { content: formData.content }),
        ...(formData.duration !== undefined && formData.duration !== "" && {
          duration: parseFloat(formData.duration),
        }),
      };

      await updateModule({
        variables: { id, updateModuleInput },
      });
    } catch (error) {
      console.error("Failed to update module:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteModule = async (id: string) => {
    setDeleteLoading(true);
    try {
      await deleteModule({
        variables: { id },
      });
      setDeleteDialogOpen(false);
      setModuleToDelete(null);
    } catch (error) {
      console.error("Failed to delete module:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBulkDeleteModules = async (moduleIds: string[]) => {
    setBulkDeleteLoading(true);
    try {
      await bulkDeleteModules({
        variables: { ids: moduleIds },
      });
      setBulkDeleteDialogOpen(false);
      setModulesToDelete([]);
    } catch (error) {
      console.error("Failed to bulk delete modules:", error);
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  // Helper function to get module type icon
  const getModuleTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return Video;
      case "document":
      case "pdf":
        return FileText;
      default:
        return File;
    }
  };

  // Form field configurations
  const createModuleFields: FormField[] = [
    {
      name: "title",
      type: "text",
      label: "Module Title",
      placeholder: "Enter module title",
      required: true,
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Module title must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "type",
      type: "select",
      label: "Module Type",
      placeholder: "Select module type",
      required: true,
      searchable: true,
      options: [
        { value: "VIDEO", label: "Video" },
        { value: "DOCUMENT", label: "Document" },
        { value: "PDF", label: "PDF" },
        { value: "IMAGE", label: "Image" },
      ],
      validation: (value) => {
        if (!value) {
          return {
            valid: false,
            message: "Module type is required",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "duration",
      type: "number",
      label: "Duration (minutes)",
      placeholder: "Enter module duration in minutes",
      required: false,
      validation: (value) => {
        if (value !== undefined && value !== null && value < 0) {
          return {
            valid: false,
            message: "Duration must be a positive number",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "orderIndex",
      type: "number",
      label: "Order Index",
      placeholder: "Enter module order (0, 1, 2...)",
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
    {
      name: "content",
      type: "textarea",
      label: "Module Content",
      placeholder: "Enter module text content, description, or notes",
      required: false,
    },
  ];

  const updateModuleFields: UpdateFormField[] = [
    {
      name: "title",
      type: "text",
      label: "Module Title",
      placeholder: "Enter module title",
      required: true,
      initialValue: moduleToUpdate?.title || "",
      validation: (value) => {
        if (!value || value.length < 3) {
          return {
            valid: false,
            message: "Module title must be at least 3 characters",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "type",
      type: "select",
      label: "Module Type",
      placeholder: "Select module type",
      required: true,
      searchable: true,
      initialValue: moduleToUpdate?.type || "",
      options: [
        { value: "VIDEO", label: "Video" },
        { value: "DOCUMENT", label: "Document" },
        { value: "PDF", label: "PDF" },
        { value: "IMAGE", label: "Image" },
      ],
      validation: (value) => {
        if (!value) {
          return {
            valid: false,
            message: "Module type is required",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "duration",
      type: "number",
      label: "Duration (minutes)",
      placeholder: "Enter module duration in minutes",
      required: false,
      initialValue: moduleToUpdate?.duration || "",
      validation: (value) => {
        if (value !== undefined && value !== null && value < 0) {
          return {
            valid: false,
            message: "Duration must be a positive number",
          };
        }
        return { valid: true, message: "" };
      },
    },
    {
      name: "orderIndex",
      type: "number",
      label: "Order Index",
      placeholder: "Enter module order (0, 1, 2...)",
      required: true,
      initialValue: moduleToUpdate?.orderIndex || 0,
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
    {
      name: "content",
      type: "textarea",
      label: "Module Content",
      placeholder: "Enter module text content, description, or notes",
      required: false,
      initialValue: moduleToUpdate?.content || "",
    },
  ];

  // Table columns configuration
  const columns: TableColumn<Module>[] = [
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
      title: "Module Title",
      sortable: true,
      render: (value: string, module: Module) => {
        const IconComponent = getModuleTypeIcon(module.type);
        return (
          <div className="flex items-center space-x-2">
            <IconComponent className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {value}
              </p>
              {module.content && (
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-48">
                  {module.content}
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      key: "type",
      title: "Type",
      sortable: true,
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
          {value}
        </span>
      ),

      align: "center",
    },
    {
      key: "duration",
      title: "Duration",
      render: (value: number | null) => (
        <div className="text-sm text-center">
          {value ? (
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {value} min
            </span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">-</span>
          )}
        </div>
      ),
      align: "center",
    },
    {
      key: "chapter",
      title: "Chapter",
      render: (value: any) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {value ? value.title : "-"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Order #{value?.orderIndex || 0}
          </p>
        </div>
      ),
    },
    {
      key: "fileName",
      title: "File Info",
      render: (value: string | null, module: Module) => (
        <div className="text-sm">
          {value || module.fileUrl ? (
            <div className="space-y-1">
              {value && (
                <p className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-32">
                  {value}
                </p>
              )}
              {module.fileSize && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(module.fileSize / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
              {module.mimeType && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {module.mimeType}
                </p>
              )}
              {module.fileUrl && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 dark:text-green-400">
                    Available
                  </span>
                  {module.isDownloadable && (
                    <span className="text-xs text-primary">
                      • Downloadable
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                No file
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "studentProgress",
      title: "Progress",
      render: (value: any[] | null) => (
        <div className="text-sm text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {value ? value.filter((p) => p.isCompleted).length : 0} completed
          </span>
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
  const actions: TableAction<Module>[] = [
    {
      label: "Upload File",
      onClick: (module: Module) => {
        setFileUploadData({
          moduleId: module.id,
          moduleName: module.title,
          moduleType: module.type,
        });
        setFileUploadDialogOpen(true);
      },
      icon: Upload,
    },
    {
      label: "Edit Module",
      onClick: (module: Module) => {
        setModuleToUpdate(module);
        setUpdateDialogOpen(true);
      },
      icon: Edit,
    },
    {
      label: "Delete Module",
      onClick: (module: Module) => {
        setModuleToDelete(module);
        setDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
  ];

  // Bulk actions for selected modules
  const bulkActions: BulkAction[] = [
    {
      label: "Delete Selected",
      onClick: (selectedIds: string[]) => {
        setModulesToDelete(selectedIds);
        setBulkDeleteDialogOpen(true);
      },
      variant: "destructive",
      icon: Trash2,
    },
  ];

  // Sortable Row Component for Reorder Mode
  const SortableRow: React.FC<{ module: Module; index: number }> = ({
    module,
    index,
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: module.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    const IconComponent = getModuleTypeIcon(module.type);

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
          <div className="flex items-center space-x-2">
            <IconComponent className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {module.title}
              </p>
              {module.content && (
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-48">
                  {module.content}
                </p>
              )}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
            {module.type}
          </span>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="text-sm">
            {module.duration ? (
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {module.duration} min
              </span>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">-</span>
            )}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm">
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {module.chapter ? module.chapter.title : "-"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Order #{module.chapter?.orderIndex || 0}
            </p>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm">
            {module.fileName || module.fileUrl ? (
              <div className="space-y-1">
                {module.fileName && (
                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-32">
                    {module.fileName}
                  </p>
                )}
                {module.fileSize && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(module.fileSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
                {module.fileUrl && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Available
                    </span>
                    {module.isDownloadable && (
                      <span className="text-xs text-primary">
                        • Downloadable
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  No file
                </span>
              </div>
            )}
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {module.studentProgress
              ? module.studentProgress.filter((p) => p.isCompleted).length
              : 0}{" "}
            completed
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900 dark:text-gray-100">
            <p className="truncate">
              {new Date(module.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {formatDistanceToNow(new Date(module.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </td>
      </tr>
    );
  };

  // Handle add new module
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
    setSelectedModules(selectedIds);
  }, []);

  // Prepare data for the table
  const modules = (data?.modulesPaginated?.data || []).filter(
    (module: Module | null): module is Module => module !== null
  );

  // Custom buttons for the table header
  const customButtons: CustomButton[] = [
    ...(modules.length > 1 && !isReorderMode ? [{
      label: "Reorder Modules",
      onClick: handleEnterReorderMode,
      variant: "outline" as const,
      icon: Move,
    }] : []),
  ];

  // Initialize temp modules when entering reorder mode
  useEffect(() => {
    if (isReorderMode && modules.length > 0) {
      const sortedModules = [...modules].sort(
        (a, b) => a.orderIndex - b.orderIndex
      );
      setTempModules(sortedModules);
    }
  }, [isReorderMode]); // Remove modules from dependency array to prevent infinite loop

  const meta: PaginationMeta = {
    page: data?.modulesPaginated?.meta?.page || 1,
    limit: data?.modulesPaginated?.meta?.limit || 10,
    total: data?.modulesPaginated?.meta?.total || 0,
    totalPages: data?.modulesPaginated?.meta?.totalPages || 1,
    hasNext: data?.modulesPaginated?.meta?.hasNext || false,
    hasPrev: data?.modulesPaginated?.meta?.hasPrev || false,
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
            Error Loading Modules
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
      {/* Modules Table or Reorder Interface */}
      <div className="w-full">
        {isReorderMode ? (
          /* Reorder Interface */
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Reorder Modules
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Drag and drop modules to reorder them
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
                  items={tempModules.map((m) => m.id)}
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
                            Module Title
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Chapter
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            File
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Progress
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Created
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tempModules.map((module, index) => (
                          <SortableRow
                            key={module.id}
                            module={module}
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
            data={modules}
            columns={columns}
            meta={meta}
            loading={loading}
            title={
              chapterData?.chapter?.title
                ? `${chapterData.chapter.title} - Modules`
                : "Modules Management"
            }
            selectable={true}
            actions={actions}
            bulkActions={bulkActions}
            customButtons={customButtons}
            selectedRows={selectedModules}
            onSelectionChange={handleSelectionChange}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
            onAddNew={handleAddNew}
            addNewLabel="Add Module"
            rowKey="id"
            emptyMessage="No modules found"
            className="bg-white dark:bg-gray-900"
          />
        )}
      </div>

      {/* Create Module Dialog */}
      <DynamicCreateDialog
        title="Create New Module"
        fields={createModuleFields}
        onSubmit={handleCreateModule}
        submitLabel="Create Module"
        isLoading={createLoading}
        open={createDialogOpen}
        setOpen={setCreateDialogOpen}
      />

      {/* Update Module Dialog */}
      {moduleToUpdate && (
        <DynamicUpdateDialog
          id={moduleToUpdate.id}
          title="Update Module"
          fields={updateModuleFields}
          onSubmit={handleUpdateModule}
          submitLabel="Update Module"
          isLoading={updateLoading}
          open={updateDialogOpen}
          setOpen={setUpdateDialogOpen}
        />
      )}

      {/* Single Module Delete Confirmation Dialog */}
      {moduleToDelete && (
        <ConfirmDeleteDialog
          title="Delete Module"
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete the module{" "}
                <strong>{moduleToDelete.title}</strong>?
              </p>
            </div>
          }
          description="This action will permanently delete the module and cannot be undone"
          onConfirm={() => handleDeleteModule(moduleToDelete.id)}
          isLoading={deleteLoading}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          confirmLabel="Delete"
        />
      )}

      {/* Bulk Delete Confirmation Dialog */}
      {modulesToDelete.length > 0 && (
        <ConfirmDeleteDialog
          title={`Delete ${modulesToDelete.length} Modules`}
          message={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete{" "}
                <strong>{modulesToDelete.length}</strong> selected modules?
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm font-medium mb-2">
                  Modules to be deleted:
                </p>
                <ul className="text-sm space-y-1">
                  {modulesToDelete.map((moduleId) => {
                    const module = modules.find(
                      (m: Module) => m.id === moduleId
                    );
                    return module ? (
                      <li key={moduleId} className="flex justify-between">
                        <span>{module.title}</span>
                        <span className="text-gray-500">{module.type}</span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          }
          description="This action will permanently delete the modules and cannot be undone"
          onConfirm={() => handleBulkDeleteModules(modulesToDelete)}
          isLoading={bulkDeleteLoading}
          open={bulkDeleteDialogOpen}
          setOpen={setBulkDeleteDialogOpen}
          confirmLabel={`Delete ${modulesToDelete.length} Modules`}
        />
      )}

      {/* Module File Upload Dialog */}
      {fileUploadData && (
        <ModuleFileUploadDialog
          open={fileUploadDialogOpen}
          setOpen={setFileUploadDialogOpen}
          title="Upload File for Module"
          moduleId={fileUploadData.moduleId}
          moduleName={fileUploadData.moduleName}
          currentModuleType={fileUploadData.moduleType}
          onUploadSuccess={() => {
            refetch(); // Refresh the modules list
            setFileUploadData(null);
          }}
        />
      )}
    </div>
  );
};

export default Modules;
