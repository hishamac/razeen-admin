import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
} from "lucide-react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

// Field configuration interface
export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "email" | "phone" | "number" | "select" | "password";
  required?: boolean;
  options?: string[] | { value: string; label: string }[]; // For select fields
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | null; // Return error message or null
  };
  aliases?: string[]; // Alternative column names in Excel
  defaultValue?: any;
  width?: number; // Column width for display
}

// Generic data interface
export interface ImportData {
  [key: string]: any;
  isValid: boolean;
  errors: string[];
}

// Component props interface
interface ExcelBulkUploadDialogProps {
  title: string;
  fields: FieldConfig[];
  templateData: Record<string, any>[];
  onSubmit?: (items: Record<string, any>[]) => Promise<void>;
  isSubmitting: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileAccept?: string;
  templateFileName?: string;
  description?: string;
}

export function ExcelBulkUploadDialog({
  title,
  fields,
  templateData,
  onSubmit,
  isSubmitting,
  open,
  setOpen,
  fileAccept = ".xlsx,.xls",
  templateFileName = "template.xlsx",
  description,
}: ExcelBulkUploadDialogProps) {
  const [items, setItems] = useState<ImportData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateItem = (item: any): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    fields.forEach((field) => {
      const value = item[field.key];

      // Required field validation
      if (field.required && (!value || value.toString().trim() === "")) {
        errors.push(`${field.label} is required`);
        return;
      }

      // Skip validation if field is empty and not required
      if (!value || value.toString().trim() === "") return;

      // Type-specific validation
      switch (field.type) {
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors.push(`Invalid ${field.label} format`);
          }
          break;

        case "phone":
          const phoneDigits = value.replace(/\D/g, "");
          if (!/^\d{10,15}$/.test(phoneDigits)) {
            errors.push(`${field.label} must be 10-15 digits`);
          }
          break;

        case "number":
          if (isNaN(Number(value))) {
            errors.push(`${field.label} must be a valid number`);
          }
          break;

        case "select":
          if (field.options) {
            const validOptions = field.options.map((opt) =>
              typeof opt === "string" ? opt : opt.value
            );
            if (!validOptions.includes(value)) {
              errors.push(
                `Invalid ${field.label}. Must be one of: ${validOptions.join(
                  ", "
                )}`
              );
            }
          }
          break;
      }

      // Custom validation
      if (field.validation) {
        const { minLength, maxLength, pattern, custom } = field.validation;

        if (minLength && value.length < minLength) {
          errors.push(
            `${field.label} must be at least ${minLength} characters`
          );
        }

        if (maxLength && value.length > maxLength) {
          errors.push(
            `${field.label} must be no more than ${maxLength} characters`
          );
        }

        if (pattern && !pattern.test(value)) {
          errors.push(`Invalid ${field.label} format`);
        }

        if (custom) {
          const customError = custom(value);
          if (customError) {
            errors.push(customError);
          }
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
      toast.error("Please upload a valid Excel file (.xlsx, .xls) or CSV file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File size should be less than 10MB");
      return;
    }

    setLoading(true);
    setError("");
    setUploadProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert to JSON with header row
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
      }) as any[][];

      if (jsonData.length < 2) {
        throw new Error(
          "Excel file must contain header row and at least one data row"
        );
      }

      // Get headers and normalize them
      const headers = jsonData[0].map((h: string) =>
        h.toString().toLowerCase().trim()
      );
      const dataRows = jsonData.slice(1);

      // Create field mapping with aliases
      const fieldMapping: Record<string, string> = {};
      fields.forEach((field) => {
        // Add the main field key
        fieldMapping[field.key.toLowerCase()] = field.key;
        fieldMapping[field.label.toLowerCase()] = field.key;

        // Add aliases
        if (field.aliases) {
          field.aliases.forEach((alias) => {
            fieldMapping[alias.toLowerCase()] = field.key;
          });
        }
      });

      const processedItems: ImportData[] = [];

      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        const item: any = {};

        // Initialize with default values
        fields.forEach((field) => {
          if (field.defaultValue !== undefined) {
            item[field.key] = field.defaultValue;
          }
        });

        // Map row data to item object
        headers.forEach((header, index) => {
          const fieldKey = fieldMapping[header];
          if (fieldKey) {
            item[fieldKey] = row[index]?.toString().trim() || "";
          }
        });

        // Validate and process item
        const validation = validateItem(item);

        processedItems.push({
          ...item,
          isValid: validation.isValid,
          errors: validation.errors,
        });

        // Update progress
        setUploadProgress(((i + 1) / dataRows.length) * 100);
      }

      setItems(processedItems);

      if (processedItems.length === 0) {
        setError("No valid data found in the Excel file");
      } else {
        toast.success(`Successfully loaded ${processedItems.length} rows`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process Excel file";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const downloadTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

    // Set column widths based on field configuration
    const colWidths = fields.map((field) => ({
      wch: field.width || 15,
    }));
    worksheet["!cols"] = colWidths;

    XLSX.writeFile(workbook, templateFileName);
    toast.success("Template downloaded successfully");
  };

  const handleSubmit = async () => {
    const validItems = items.filter((item) => item.isValid);

    if (validItems.length === 0) {
      setError("No valid items to import");
      toast.error("No valid items to import");
      return;
    }

    try {
      if (onSubmit) {
        const cleanItems = validItems.map(
          ({ isValid, errors, ...item }) => item
        );
        await onSubmit(cleanItems);
        handleClose();
      }
    } catch (err) {
      const errorMessage = "Failed to import items";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setOpen(false);
    setItems([]);
    setError("");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validItemsCount = items.filter((item) => item.isValid).length;
  const invalidItemsCount = items.length - validItemsCount;

  const renderCellValue = (field: FieldConfig, value: any) => {
    if (field.type === "select" && field.options) {
      const option = field.options.find((opt) =>
        typeof opt === "string" ? opt === value : opt.value === value
      );
      return typeof option === "string" ? option : option?.label || value;
    }
    return value;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="min-w-[90vw] max-w-6xl max-h-[90vh] overflow-auto flex flex-col"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            {title}
          </DialogTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </DialogHeader>

        <div className="space-y-6 flex-1">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={downloadTemplate}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Template
              </Button>
            </div>

            {/* Expected Fields Info - Compact Design */}
            <div className="bg-muted/50 border rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Expected Fields</h4>
                <Badge variant="outline" className="text-xs">{fields.length} fields</Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {fields.map(field => (
                  <Badge 
                    key={field.key} 
                    variant={field.required ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {field.label}
                    {field.required && <span className="ml-1">*</span>}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
              <Input
                ref={fileInputRef}
                type="file"
                accept={fileAccept}
                onChange={handleFileUpload}
                disabled={loading}
                className="hidden"
                id="excel-upload"
              />
              <Label
                htmlFor="excel-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-10 w-10 text-muted-foreground" />
                <div>
                  <span className="font-medium">
                    {loading ? "Processing..." : "Click to upload Excel file"}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports Excel (.xlsx, .xls) and CSV files
                  </p>
                </div>
              </Label>
            </div>

            {loading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing file...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
          </div>

          {/* Statistics */}
          {items.length > 0 && (
            <div className="flex gap-4">
              <Badge
                variant="outline"
                className="text-green-600 border-green-600"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                {validItemsCount} Valid
              </Badge>
              {invalidItemsCount > 0 && (
                <Badge
                  variant="outline"
                  className="text-red-600 border-red-600"
                >
                  <XCircle className="h-3 w-3 mr-1" />
                  {invalidItemsCount} Invalid
                </Badge>
              )}
              <Badge variant="outline">
                Total: {items.length}
              </Badge>
            </div>
          )}

          {/* Items Table */}
          {items.length > 0 && (
            <div className="border rounded-lg max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Status</TableHead>
                    {fields.map((field) => (
                      <TableHead key={field.key} style={{ width: field.width ? `${field.width}px` : 'auto' }}>
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </TableHead>
                    ))}
                    <TableHead>Errors</TableHead>
                    <TableHead className="w-12">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index} className={!item.isValid ? "bg-red-50 dark:bg-red-900/10" : ""}>
                      <TableCell>
                        {item.isValid ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </TableCell>
                      {fields.map((field) => (
                        <TableCell key={field.key}>
                          {field.type === "select" ? (
                            <Badge
                              variant={item.isValid ? "default" : "destructive"}
                            >
                              {renderCellValue(field, item[field.key]) || "—"}
                            </Badge>
                          ) : (
                            <span className="truncate max-w-40 block">
                              {renderCellValue(field, item[field.key]) || "—"}
                            </span>
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        {item.errors.length > 0 && (
                          <div className="space-y-1 max-w-60">
                            {item.errors.map((error, errorIndex) => (
                              <div
                                key={errorIndex}
                                className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded"
                              >
                                {error}
                              </div>
                            ))}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="h-6 w-6 p-0"
                          title="Remove item"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading || isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || isSubmitting || validItemsCount === 0}
          >
            {loading || isSubmitting
              ? "Processing..."
              : `Import ${validItemsCount} Items`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ExcelBulkUploadDialog;
