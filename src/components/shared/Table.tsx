import React, { useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Plus,
  Loader2,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Types
export interface TableColumn<T = any> {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface TableAction<T = any> {
  label: string;
  onClick: (row: T) => void;
  variant?: "default" | "destructive";
  icon?: React.ComponentType<{ className?: string }>;
}

export interface BulkAction {
  label: string;
  onClick: (selectedIds: string[]) => void;
  variant?: "default" | "destructive";
  icon?: React.ComponentType<{ className?: string }>;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface TableFilter {
  key: string;
  label: string;
  options: FilterOption[];
  defaultValue?: string;
  loading?: boolean;
  placeholder?: string;
}

export interface CustomButton {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

export interface DynamicTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  meta: PaginationMeta;
  loading?: boolean;
  title?: string;
  selectable?: boolean;
  actions?: TableAction<T>[];
  bulkActions?: BulkAction[];
  filters?: TableFilter[];
  selectedRows?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onSortChange?: (key: string, direction: "asc" | "desc") => void;
  onSearchChange?: (search: string) => void;
  onFilterChange?: (filterKey: string, value: string) => void;
  onAddNew?: () => void;
  addNewLabel?: string;
  customButtons?: CustomButton[]; // New prop for custom buttons
  rowKey?: string; // Key to use as unique identifier for rows
  emptyMessage?: string;
  className?: string;
}

export interface SortState {
  key: string;
  direction: "asc" | "desc";
}

const DynamicTable = <T extends Record<string, any>>({
  data,
  columns,
  meta,
  loading = false,
  title,
  selectable = false,
  actions = [],
  bulkActions = [],
  filters = [],
  selectedRows = [],
  onSelectionChange,
  onPageChange,
  onLimitChange,
  onSortChange,
  onSearchChange,
  onFilterChange,
  onAddNew,
  addNewLabel = "Add New",
  customButtons = [], // New prop with default empty array
  rowKey = "id",
  emptyMessage = "No data available",
  className,
}: DynamicTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortState, setSortState] = useState<SortState | null>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>(() => {
    const initialFilters: Record<string, string> = {};
    filters.forEach(filter => {
      initialFilters[filter.key] = filter.defaultValue || "";
    });
    return initialFilters;
  });

  // Handle search
  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onSearchChange?.(value);
    },
    [onSearchChange]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (filterKey: string, value: string) => {
      setFilterValues(prev => ({
        ...prev,
        [filterKey]: value
      }));
      onFilterChange?.(filterKey, value);
    },
    [onFilterChange]
  );

  // Handle sorting with three states: none -> asc -> desc -> none
  const handleSort = useCallback(
    (key: string) => {
      let newSortState: SortState | null = null;

      if (!sortState || sortState.key !== key) {
        // First click: set to ascending
        newSortState = { key, direction: "asc" };
      } else if (sortState.direction === "asc") {
        // Second click: set to descending
        newSortState = { key, direction: "desc" };
      } else {
        // Third click: remove sorting (back to default)
        newSortState = null;
      }

      setSortState(newSortState);

      if (newSortState) {
        onSortChange?.(newSortState.key, newSortState.direction);
      } else {
        // Call with empty key to indicate no sorting
        onSortChange?.("", "asc");
      }
    },
    [sortState, onSortChange]
  );

  // Handle selection
  const handleSelectAll = useCallback(() => {
    if (!selectable || !onSelectionChange) return;

    const allSelected = selectedRows.length === data.length;
    if (allSelected) {
      onSelectionChange([]);
    } else {
      const allIds = data.map((row) => row[rowKey]);
      onSelectionChange(allIds);
    }
  }, [data, selectedRows, selectable, onSelectionChange, rowKey]);

  const handleSelectRow = useCallback(
    (rowId: string) => {
      if (!selectable || !onSelectionChange) return;

      const isSelected = selectedRows.includes(rowId);
      if (isSelected) {
        onSelectionChange(selectedRows.filter((id) => id !== rowId));
      } else {
        onSelectionChange([...selectedRows, rowId]);
      }
    },
    [selectedRows, selectable, onSelectionChange]
  );

  // Pagination helpers
  const isAllSelected =
    selectable &&
    selectedRows.length > 0 &&
    selectedRows.length === data.length;
  const isIndeterminate =
    selectable && selectedRows.length > 0 && selectedRows.length < data.length;

  const getSortIcon = (columnKey: string) => {
    if (!sortState || sortState.key !== columnKey) {
      // Default state: show double arrows
      return <ArrowUpDown className="h-4 w-4" />;
    }
    // Active sorting: show specific direction
    return sortState.direction === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const renderCell = (column: TableColumn<T>, row: T, index: number) => {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row, index);
    }

    // Default rendering
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground">-</span>;
    }

    if (typeof value === "boolean") {
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
            value
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          )}
        >
          {value ? "Yes" : "No"}
        </span>
      );
    }

    return String(value);
  };

  return (
    <div className={cn("w-full", className)}>
      <Card className="shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 gap-0 py-0 rounded-lg">
        <CardHeader className="py-6 border-b-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 rounded-t-lg">
          <div className="flex flex-col space-y-4">
            {/* Title, Bulk Actions and Add New Button Row */}
            {(title ||
              onAddNew ||
              (selectable &&
                selectedRows.length > 0 &&
                bulkActions.length > 0)) && (
              <div className="flex md:flex-row flex-col items-center justify-between gap-4">
                {title && (
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                  </CardTitle>
                )}
                <div className="flex items-center space-x-4">
                  {/* Bulk Actions Dropdown */}
                  {selectable &&
                    selectedRows.length > 0 &&
                    bulkActions.length > 0 && (
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {selectedRows.length} selected
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 px-3 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <span>Bulk actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            className="w-48 shadow-lg border border-gray-200 dark:border-gray-700"
                          >
                            {bulkActions.map((action, index) => (
                              <DropdownMenuItem
                                key={index}
                                onClick={() => action.onClick(selectedRows)}
                                className={cn(
                                  "flex items-center px-3 py-2 text-sm cursor-pointer transition-colors",
                                  action.variant === "destructive"
                                    ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800"
                                )}
                              >
                                {action.icon && (
                                  <action.icon className="mr-3 h-4 w-4" />
                                )}
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  
                  {/* Custom Buttons */}
                  {customButtons.map((button, index) => (
                    <Button
                      key={index}
                      onClick={button.onClick}
                      variant={button.variant || "outline"}
                      size="sm"
                      disabled={button.disabled}
                      className="h-9 px-4 font-medium flex items-center space-x-2"
                    >
                      {button.icon && <button.icon className="h-4 w-4" />}
                      <span>{button.label}</span>
                    </Button>
                  ))}
                  
                  {/* Add New Button */}
                  {onAddNew && (
                    <Button
                      onClick={onAddNew}
                      className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 font-medium"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {addNewLabel}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Search and Filters Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-full h-9 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                />
              </div>
              
              {/* Filters */}
              {filters.length > 0 && (
                <div className="flex flex-wrap items-center gap-3">
                  {filters.map((filter) => (
                    <div key={filter.key} className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {filter.label}:
                      </label>
                      <Select
                        value={filterValues[filter.key] || ""}
                        onValueChange={(value) => handleFilterChange(filter.key, value)}
                        disabled={filter.loading}
                      >
                        <SelectTrigger className="h-9 w-32 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm relative">
                          {filter.loading ? (
                            <div className="flex items-center space-x-2">
                              <Loader2 className="h-3 w-3 animate-spin text-gray-400" />
                              <span className="text-gray-400">Loading...</span>
                            </div>
                          ) : (
                            <SelectValue placeholder={filter.placeholder || "All"} />
                          )}
                        </SelectTrigger>
                        <SelectContent>
                          {filter.loading ? (
                            <div className="flex items-center justify-center py-2">
                              <Loader2 className="h-4 w-4 animate-spin text-gray-400 mr-2" />
                              <span className="text-sm text-gray-500">Loading options...</span>
                            </div>
                          ) : (
                            <>
                              <SelectItem value="all">All</SelectItem>
                              {filter.options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 border-t border-gray-200 dark:border-gray-700">
          <div className="relative overflow-auto max-h-[60vh]">
            {/* Table */}
            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80">
                  {selectable && (
                    <TableHead className="h-14 px-6 text-left align-middle font-medium w-12">
                      <div className="flex items-center">
                        <Checkbox
                          checked={isAllSelected}
                          onCheckedChange={handleSelectAll}
                          ref={(el) => {
                            if (el && "indeterminate" in el) {
                              (el as HTMLInputElement).indeterminate =
                                isIndeterminate as boolean;
                            }
                          }}
                        />
                      </div>
                    </TableHead>
                  )}
                  {columns.map((column) => (
                    <TableHead
                      key={column.key}
                      className={cn(
                        "h-14 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        column.align !== "center" &&
                          column.align !== "right" &&
                          "text-left"
                      )}
                      style={{ width: column.width }}
                    >
                      {column.sortable ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-8 px-2 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                            sortState?.key === column.key
                              ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                              : "text-gray-700 dark:text-gray-300"
                          )}
                          onClick={() => handleSort(column.key)}
                        >
                          <span>{column.title}</span>
                          <div
                            className={cn(
                              "ml-2 transition-opacity",
                              sortState?.key === column.key
                                ? "opacity-100"
                                : "opacity-50"
                            )}
                          >
                            {getSortIcon(column.key)}
                          </div>
                        </Button>
                      ) : (
                        column.title
                      )}
                    </TableHead>
                  ))}
                  {actions.length > 0 && (
                    <TableHead className="h-14 px-6 text-right align-middle font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide w-20">
                      Actions
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                {loading ? (
                  // Skeleton Loading Rows
                  Array.from({ length: 5 }).map((_, skeletonIndex) => (
                    <TableRow
                      key={`skeleton-${skeletonIndex}`}
                      className="animate-pulse"
                    >
                      {selectable && (
                        <TableCell className="h-16 px-6">
                          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </TableCell>
                      )}
                      {columns.map((_, columnIndex) => (
                        <TableCell
                          key={`skeleton-cell-${columnIndex}`}
                          className="px-6 py-4"
                        >
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                          </div>
                        </TableCell>
                      ))}
                      {actions.length > 0 && (
                        <TableCell className="px-6 py-4 text-right">
                          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded ml-auto"></div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={
                        columns.length +
                        (selectable ? 1 : 0) +
                        (actions.length > 0 ? 1 : 0)
                      }
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center space-y-3 text-gray-500 dark:text-gray-400">
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Search className="h-6 w-6" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {emptyMessage}
                          </p>
                          <p className="text-sm mt-1">
                            Try adjusting your search or filter criteria.
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((row, index) => {
                    const rowId = row[rowKey];
                    const isSelected = selectedRows.includes(rowId);

                    return (
                      <TableRow
                        key={rowId}
                        className={cn(
                          "group transition-all duration-150 hover:bg-gray-50 dark:hover:bg-gray-800/50",
                          isSelected &&
                            "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500"
                        )}
                      >
                        {selectable && (
                          <TableCell className="h-16 px-6">
                            <div className="flex items-center">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => handleSelectRow(rowId)}
                              />
                            </div>
                          </TableCell>
                        )}
                        {columns.map((column) => (
                          <TableCell
                            key={column.key}
                            className={cn(
                              "px-6 py-4 text-sm text-gray-900 dark:text-gray-100",
                              column.align === "center" && "text-center",
                              column.align === "right" && "text-right"
                            )}
                          >
                            <div className="truncate">
                              {renderCell(column, row, index)}
                            </div>
                          </TableCell>
                        ))}
                        {actions.length > 0 && (
                          <TableCell className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-48 shadow-lg border border-gray-200 dark:border-gray-700"
                              >
                                {actions.map((action, actionIndex) => (
                                  <DropdownMenuItem
                                    key={actionIndex}
                                    onClick={() => action.onClick(row)}
                                    className={cn(
                                      "flex items-center px-3 py-2 text-sm cursor-pointer transition-colors",
                                      action.variant === "destructive"
                                        ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800"
                                    )}
                                  >
                                    {action.icon && (
                                      <action.icon className="mr-3 h-4 w-4" />
                                    )}
                                    {action.label}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Pagination */}
        <CardFooter className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4 rounded-b-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium">
                Showing{" "}
                {Math.min((meta.page - 1) * meta.limit + 1, meta.total)} to{" "}
                {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}{" "}
                entries
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {onLimitChange && (
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show:
                  </label>
                  <Select
                    value={meta.limit.toString()}
                    onValueChange={(value: string) =>
                      onLimitChange(Number(value))
                    }
                  >
                    <SelectTrigger className="h-9 w-20 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="10000">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(1)}
                  disabled={!meta.hasPrev}
                  className="h-9 px-3 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(meta.page - 1)}
                  disabled={!meta.hasPrev}
                  className="h-9 px-3 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-2 px-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Page {meta.page} of {meta.totalPages}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(meta.page + 1)}
                  disabled={!meta.hasNext}
                  className="h-9 px-3 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(meta.totalPages)}
                  disabled={!meta.hasNext}
                  className="h-9 px-3 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DynamicTable;
