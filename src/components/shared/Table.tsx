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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export interface DynamicTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  meta: PaginationMeta;
  loading?: boolean;
  title?: string;
  searchable?: boolean;
  selectable?: boolean;
  actions?: TableAction<T>[];
  selectedRows?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onSortChange?: (key: string, direction: "asc" | "desc") => void;
  onSearchChange?: (search: string) => void;
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
  searchable = true,
  selectable = false,
  actions = [],
  selectedRows = [],
  onSelectionChange,
  onPageChange,
  onLimitChange,
  onSortChange,
  onSearchChange,
  rowKey = "id",
  emptyMessage = "No data available",
  className,
}: DynamicTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortState, setSortState] = useState<SortState | null>(null);

  // Handle search
  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onSearchChange?.(value);
    },
    [onSearchChange]
  );

  // Handle sorting
  const handleSort = useCallback(
    (key: string) => {
      const newDirection: "asc" | "desc" =
        sortState?.key === key && sortState.direction === "asc" ? "desc" : "asc";
      
      const newSortState = { key, direction: newDirection };
      setSortState(newSortState);
      onSortChange?.(key, newDirection);
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
  const isAllSelected = selectable && selectedRows.length > 0 && selectedRows.length === data.length;
  const isIndeterminate = selectable && selectedRows.length > 0 && selectedRows.length < data.length;

  const getSortIcon = (columnKey: string) => {
    if (sortState?.key !== columnKey) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
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
    <Card className={cn("shadow-sm border-0 bg-white dark:bg-gray-900", className)}>
      {(title || searchable) && (
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {title && (
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Manage and organize your data
                </p>
              </div>
            )}
            {searchable && (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 w-64 h-9 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </CardHeader>
      )}
      
      <CardContent className="p-0">
        {/* Table */}
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80">
                  {selectable && (
                    <th className="h-14 px-6 text-left align-middle font-medium w-12">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          ref={(el) => {
                            if (el) el.indeterminate = isIndeterminate;
                          }}
                          onChange={handleSelectAll}
                          className="h-4 w-4 rounded border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-0"
                        />
                      </div>
                    </th>
                  )}
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        "h-14 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        column.align !== "center" && column.align !== "right" && "text-left"
                      )}
                      style={{ width: column.width }}
                    >
                      {column.sortable ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => handleSort(column.key)}
                        >
                          <span>{column.title}</span>
                          <div className="ml-2 opacity-50">
                            {getSortIcon(column.key)}
                          </div>
                        </Button>
                      ) : (
                        column.title
                      )}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th className="h-14 px-6 text-right align-middle font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide w-20">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                {loading ? (
                  <tr>
                    <td
                      colSpan={
                        columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)
                      }
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-200 border-t-blue-600" />
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Loading data...</span>
                      </div>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={
                        columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)
                      }
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center space-y-3 text-gray-500 dark:text-gray-400">
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Search className="h-6 w-6" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900 dark:text-gray-100">{emptyMessage}</p>
                          <p className="text-sm mt-1">Try adjusting your search or filter criteria.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => {
                    const rowId = row[rowKey];
                    const isSelected = selectedRows.includes(rowId);
                    
                    return (
                      <tr
                        key={rowId}
                        className={cn(
                          "group transition-all duration-150 hover:bg-gray-50 dark:hover:bg-gray-800/50",
                          isSelected && "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500"
                        )}
                      >
                        {selectable && (
                          <td className="h-16 px-6">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleSelectRow(rowId)}
                                className="h-4 w-4 rounded border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-0"
                              />
                            </div>
                          </td>
                        )}
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className={cn(
                              "px-6 py-4 text-sm text-gray-900 dark:text-gray-100",
                              column.align === "center" && "text-center",
                              column.align === "right" && "text-right"
                            )}
                          >
                            <div className="max-w-xs truncate">
                              {renderCell(column, row, index)}
                            </div>
                          </td>
                        ))}
                        {actions.length > 0 && (
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 shadow-lg border border-gray-200 dark:border-gray-700">
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
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium">
                Showing {Math.min((meta.page - 1) * meta.limit + 1, meta.total)} to{" "}
                {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} entries
              </p>
              {selectable && selectedRows.length > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <p className="font-medium text-blue-600 dark:text-blue-400">
                    {selectedRows.length} selected
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              {onLimitChange && (
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show:
                  </label>
                  <select
                    value={meta.limit}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    className="h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1 text-sm font-medium text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-2"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicTable;
