import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit, Calendar, Clock, Eye, EyeOff, Search, X } from "lucide-react";

// Types for the dynamic form configuration
export interface FieldOption {
  value: string;
  label: string;
}

interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface UpdateFormField {
  name: string;
  type:
    | "text"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "password"
    | "textarea"
    | "select"
    | "checkbox"
    | "switch"
    | "date"
    | "time"
    | "datetime-local";
  label: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  description?: string;
  disabled?: boolean;
  options?: FieldOption[];
  multiple?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number;
  rows?: number;
  initialValue?: any; // Added for initial values
  searchable?: boolean;
  validation?: (value: any, formData: Record<string, any>) => ValidationResult;
}

interface DynamicUpdateDialogProps {
  id: string; // Unique identifier for the record being updated
  title?: string;
  fields: UpdateFormField[];
  onSubmit?: (id: string, changedData: Record<string, any>) => Promise<void>;
  trigger?: React.ReactNode;
  submitLabel?: string;
  isLoading: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DynamicUpdateDialog({
  id,
  title = "Update Record",
  fields = [],
  onSubmit,
  trigger,
  submitLabel = "Update",
  isLoading,
  open,
  setOpen,
}: DynamicUpdateDialogProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {}
  );
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const [selectOpen, setSelectOpen] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [initialData, setInitialData] = useState<Record<string, any>>({});

  // Initialize form data with initial values when dialog opens or fields change
  useEffect(() => {
    // Only initialize when dialog opens with fields, not during loading
    if (open && fields.length > 0 && !loading && !isLoading) {
      const initialFormData: Record<string, any> = {};
      fields.forEach((field) => {
        initialFormData[field.name] =
          field.initialValue !== undefined
            ? field.initialValue
            : getDefaultValueForFieldType(field.type, field.multiple);
      });
      setFormData(initialFormData);
      setInitialData({ ...initialFormData }); // Store initial values for comparison
    }
  }, [open, fields.length, loading, isLoading]); // Changed fields to fields.length to avoid reset on field prop changes

  // Helper function to get default values based on field type
  const getDefaultValueForFieldType = (type: string, multiple?: boolean) => {
    switch (type) {
      case "checkbox":
      case "switch":
        return false;
      case "select":
        return multiple ? [] : "";
      case "number":
        return "";
      default:
        return "";
    }
  };

  // Function to get only changed values
  const getChangedValues = (): Record<string, any> => {
    const changedValues: Record<string, any> = {};

    Object.keys(formData).forEach((key) => {
      const currentValue = formData[key];
      const initialValue = initialData[key];

      // Deep comparison for arrays (for multiple select fields)
      if (Array.isArray(currentValue) && Array.isArray(initialValue)) {
        if (
          JSON.stringify(currentValue.sort()) !==
          JSON.stringify(initialValue.sort())
        ) {
          changedValues[key] = currentValue;
        }
      } else if (currentValue !== initialValue) {
        changedValues[key] = currentValue;
      }
    });

    return changedValues;
  };

  const handleInputChange = (
    fieldName: string,
    value: any,
    fieldType: string
  ) => {
    setFormData((prev) => {
      if (
        fieldType === "select" &&
        fields.find((f) => f.name === fieldName)?.multiple
      ) {
        // Handle multiple select
        const currentValues = prev[fieldName] || [];
        if (currentValues.includes(value)) {
          return {
            ...prev,
            [fieldName]: currentValues.filter((v: any) => v !== value),
          };
        } else {
          return { ...prev, [fieldName]: [...currentValues, value] };
        }
      }
      return { ...prev, [fieldName]: value };
    });

    if (error) setError("");
  };

  const validateForm = (): boolean => {
    const requiredFields = fields.filter((field) => field.required);

    for (const field of requiredFields) {
      const value = formData[field.name];

      if (field.type === "checkbox" || field.type === "switch") {
        if (!value && field.required) {
          setError(`${field.label} is required`);
          return false;
        }
      } else if (field.type === "select" && field.multiple) {
        if (!value || value.length === 0) {
          setError(`${field.label} is required`);
          return false;
        }
      } else if (!value || (typeof value === "string" && value.trim() === "")) {
        setError(`${field.label} is required`);
        return false;
      }
    }

    // Custom validation
    for (const field of fields) {
      if (field.validation) {
        const isValid = field.validation(formData[field.name], formData);
        if (!isValid.valid) {
          setError(isValid.message);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const changedValues = getChangedValues();

    // Check if there are any changes
    if (Object.keys(changedValues).length === 0) {
      setError("No changes detected");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (onSubmit) {
        await onSubmit(id, changedValues);
      }
    } catch (err) {
      setError("An error occurred while updating");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setShowPasswords({});
    setSearchTerms({});
    setSelectOpen({});
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const handleSearchChange = (fieldName: string, searchTerm: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [fieldName]: searchTerm,
    }));
  };

  const clearSearch = (fieldName: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
  };

  const getFilteredOptions = (field: UpdateFormField): FieldOption[] => {
    if (!field.options) return [];

    const searchTerm = searchTerms[field.name];
    if (!searchTerm || !field.searchable) return field.options;

    return field.options.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Check if field value has changed from initial value
  const isFieldChanged = (fieldName: string): boolean => {
    const currentValue = formData[fieldName];
    const initialValue = initialData[fieldName];

    if (Array.isArray(currentValue) && Array.isArray(initialValue)) {
      return (
        JSON.stringify(currentValue.sort()) !==
        JSON.stringify(initialValue.sort())
      );
    }
    return currentValue !== initialValue;
  };

  const renderSearchableSelect = (field: UpdateFormField) => {
    const value = formData[field.name];
    const searchTerm = searchTerms[field.name] || "";
    const filteredOptions = getFilteredOptions(field);
    const isOpen = selectOpen[field.name] || false;
    const hasChanged = isFieldChanged(field.name);

    return (
      <div
        key={field.name}
        className={`space-y-2 ${field.className || ""} ${
          hasChanged ? "ring-2 ring-blue-200 rounded-md p-2" : ""
        }`}
      >
        <Label className="flex items-center gap-2">
          {field.icon && <field.icon className="h-4 w-4" />}
          {field.label}{" "}
          {field.required && <span className="text-red-500">*</span>}
          {hasChanged && (
            <span className="text-blue-500 text-xs">(modified)</span>
          )}
        </Label>

        <div className="relative">
          <Select
            value={value || ""}
            onValueChange={(val) =>
              handleInputChange(field.name, val, field.type)
            }
            disabled={field.disabled || loading || isLoading}
            open={isOpen}
            onOpenChange={(open) =>
              setSelectOpen((prev) => ({ ...prev, [field.name]: open }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.searchable && (
                <div className="flex items-center px-3 py-2 border-b">
                  <Search className="h-4 w-4 mr-2 text-gray-500" />
                  <Input
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) =>
                      handleSearchChange(field.name, e.target.value)
                    }
                    className="h-8 border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearSearch(field.name);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              ) : field.searchable && searchTerm ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No options found for "{searchTerm}"
                </div>
              ) : (
                field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {field.description && (
          <p className="text-sm text-muted-foreground">{field.description}</p>
        )}
      </div>
    );
  };

  const renderMultipleSearchableSelect = (field: UpdateFormField) => {
    const value = formData[field.name] || [];
    const fieldId = `field-${field.name}`;
    const searchTerm = searchTerms[field.name] || "";
    const filteredOptions = getFilteredOptions(field);
    const hasChanged = isFieldChanged(field.name);

    return (
      <div
        key={field.name}
        className={`space-y-2 ${field.className || ""} ${
          hasChanged ? "ring-2 ring-blue-200 rounded-md p-2" : ""
        }`}
      >
        <Label className="flex items-center gap-2">
          {field.icon && <field.icon className="h-4 w-4" />}
          {field.label}{" "}
          {field.required && <span className="text-red-500">*</span>}
          {hasChanged && (
            <span className="text-blue-500 text-xs">(modified)</span>
          )}
        </Label>

        {field.searchable && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(field.name, e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => clearSearch(field.name)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-2">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${fieldId}-${option.value}`}
                  checked={value.includes(option.value)}
                  onCheckedChange={() =>
                    handleInputChange(field.name, option.value, field.type)
                  }
                  disabled={field.disabled || loading || isLoading}
                />
                <Label
                  htmlFor={`${fieldId}-${option.value}`}
                  className="text-sm font-normal"
                >
                  {option.label}
                </Label>
              </div>
            ))
          ) : field.searchable && searchTerm ? (
            <div className="px-2 py-1 text-sm text-gray-500">
              No options found for "{searchTerm}"
            </div>
          ) : (
            field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${fieldId}-${option.value}`}
                  checked={value.includes(option.value)}
                  onCheckedChange={() =>
                    handleInputChange(field.name, option.value, field.type)
                  }
                  disabled={field.disabled || loading || isLoading}
                />
                <Label
                  htmlFor={`${fieldId}-${option.value}`}
                  className="text-sm font-normal"
                >
                  {option.label}
                </Label>
              </div>
            ))
          )}
        </div>

        {field.description && (
          <p className="text-sm text-muted-foreground">{field.description}</p>
        )}
      </div>
    );
  };

  const renderField = (field: UpdateFormField) => {
    const value = formData[field.name];
    const fieldId = `field-${field.name}`;
    const hasChanged = isFieldChanged(field.name);

    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "tel":
      case "url":
        return (
          <div
            key={field.name}
            className={`space-y-2 ${field.className || ""} ${
              hasChanged ? "ring-2 ring-blue-200 rounded-md p-2" : ""
            }`}
          >
            <Label htmlFor={fieldId} className="flex items-center gap-2">
              {field.icon && <field.icon className="h-4 w-4" />}
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
              {hasChanged && (
                <span className="text-blue-500 text-xs">(modified)</span>
              )}
            </Label>
            <Input
              id={fieldId}
              type={field.type}
              placeholder={field.placeholder}
              value={value || ""}
              onChange={(e) =>
                handleInputChange(field.name, e.target.value, field.type)
              }
              required={field.required}
              disabled={field.disabled || loading || isLoading}
              min={field.min}
              max={field.max}
              step={field.step}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      case "password":
        return (
          <div
            key={field.name}
            className={`space-y-2 ${field.className || ""} ${
              hasChanged ? "ring-2 ring-blue-200 rounded-md p-2" : ""
            }`}
          >
            <Label htmlFor={fieldId} className="flex items-center gap-2">
              {field.icon && <field.icon className="h-4 w-4" />}
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
              {hasChanged && (
                <span className="text-blue-500 text-xs">(modified)</span>
              )}
            </Label>
            <div className="relative">
              <Input
                id={fieldId}
                type={showPasswords[field.name] ? "text" : "password"}
                placeholder={field.placeholder}
                value={value || ""}
                onChange={(e) =>
                  handleInputChange(field.name, e.target.value, field.type)
                }
                required={field.required}
                disabled={field.disabled || loading || isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility(field.name)}
              >
                {showPasswords[field.name] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div
            key={field.name}
            className={`space-y-2 ${field.className || ""} ${
              hasChanged ? "ring-2 ring-blue-200 rounded-md p-2" : ""
            }`}
          >
            <Label htmlFor={fieldId} className="flex items-center gap-2">
              {field.icon && <field.icon className="h-4 w-4" />}
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
              {hasChanged && (
                <span className="text-blue-500 text-xs">(modified)</span>
              )}
            </Label>
            <Textarea
              id={fieldId}
              placeholder={field.placeholder}
              value={value || ""}
              onChange={(e) =>
                handleInputChange(field.name, e.target.value, field.type)
              }
              required={field.required}
              disabled={field.disabled || loading || isLoading}
              rows={field.rows || 3}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      case "select":
        if (field.multiple) {
          return renderMultipleSearchableSelect(field);
        }
        return renderSearchableSelect(field);

      case "checkbox":
        return (
          <div
            key={field.name}
            className={`space-y-2 ${field.className || ""} ${
              hasChanged ? "ring-2 ring-blue-200 rounded-md p-2" : ""
            }`}
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id={fieldId}
                checked={value || false}
                onCheckedChange={(checked) =>
                  handleInputChange(field.name, checked, field.type)
                }
                disabled={field.disabled || loading || isLoading}
              />
              <Label htmlFor={fieldId} className="flex items-center gap-2">
                {field.icon && <field.icon className="h-4 w-4" />}
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
                {hasChanged && (
                  <span className="text-blue-500 text-xs">(modified)</span>
                )}
              </Label>
            </div>
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      case "switch":
        return (
          <div
            key={field.name}
            className={`space-y-3 ${field.className || ""} ${
              hasChanged ? "ring-2 ring-blue-200 rounded-md p-2" : ""
            }`}
          >
            <div
              className={`flex items-center justify-between p-4 border rounded-lg`}
            >
              <div className="flex items-center gap-3">
                {field.icon && (
                  <div className="flex-shrink-0">
                    <field.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                )}
                <div className="flex flex-col">
                  <Label
                    htmlFor={fieldId}
                    className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer flex items-center gap-2"
                  >
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                    {hasChanged && (
                      <span className="text-blue-500 text-xs font-normal">
                        (modified)
                      </span>
                    )}
                  </Label>
                  {field.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {field.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                <Switch
                  id={fieldId}
                  checked={value || false}
                  onCheckedChange={(checked) =>
                    handleInputChange(field.name, checked, field.type)
                  }
                  disabled={field.disabled}
                />
              </div>
            </div>
          </div>
        );

      case "date":
        return (
          <div
            key={field.name}
            className={`space-y-2 ${field.className || ""} ${
              hasChanged ? "ring-2 ring-blue-200 rounded-md p-2" : ""
            }`}
          >
            <Label htmlFor={fieldId} className="flex items-center gap-2">
              {field.icon ? (
                <field.icon className="h-4 w-4" />
              ) : (
                <Calendar className="h-4 w-4" />
              )}
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
              {hasChanged && (
                <span className="text-blue-500 text-xs">(modified)</span>
              )}
            </Label>
            <Input
              id={fieldId}
              type="date"
              value={value || ""}
              onChange={(e) =>
                handleInputChange(field.name, e.target.value, field.type)
              }
              required={field.required}
              disabled={field.disabled || loading || isLoading}
              min={field.min}
              max={field.max}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      case "time":
        return (
          <div
            key={field.name}
            className={`space-y-2 ${field.className || ""} ${
              hasChanged ? "ring-2 ring-blue-200 rounded-md p-2" : ""
            }`}
          >
            <Label htmlFor={fieldId} className="flex items-center gap-2">
              {field.icon ? (
                <field.icon className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
              {hasChanged && (
                <span className="text-blue-500 text-xs">(modified)</span>
              )}
            </Label>
            <Input
              id={fieldId}
              type="time"
              value={value || ""}
              onChange={(e) =>
                handleInputChange(field.name, e.target.value, field.type)
              }
              required={field.required}
              disabled={field.disabled || loading || isLoading}
              min={field.min}
              max={field.max}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      case "datetime-local":
        return (
          <div
            key={field.name}
            className={`space-y-2 ${field.className || ""} ${
              hasChanged ? "ring-2 ring-blue-200 rounded-md p-2" : ""
            }`}
          >
            <Label htmlFor={fieldId} className="flex items-center gap-2">
              {field.icon ? (
                <field.icon className="h-4 w-4" />
              ) : (
                <Calendar className="h-4 w-4" />
              )}
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
              {hasChanged && (
                <span className="text-blue-500 text-xs">(modified)</span>
              )}
            </Label>
            <Input
              id={fieldId}
              type="datetime-local"
              value={value ? value.slice(0, 16) : ""}
              onChange={(e) => {
                // Convert datetime-local value to ISO-8601 format
                const datetimeValue = e.target.value;
                if (datetimeValue) {
                  // Create ISO string without timezone conversion
                  // datetime-local gives us "YYYY-MM-DDTHH:mm" format
                  // We need to append seconds and timezone to make it ISO-8601
                  const isoString = datetimeValue + ":00.000Z";
                  handleInputChange(field.name, isoString, field.type);
                } else {
                  handleInputChange(field.name, "", field.type);
                }
              }}
              required={field.required}
              disabled={field.disabled || loading || isLoading}
              min={field.min}
              max={field.max}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getGridColumns = (): string => {
    return "grid-cols-1 md:grid-cols-2";
  };

  // Check if there are any changes to enable/disable submit button
  const hasAnyChanges = Object.keys(getChangedValues()).length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex text-2xl items-center gap-2">
            <Edit className="h-6 w-6" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className={`grid gap-4 ${getGridColumns()}`}>
            {fields.map((field) => renderField(field))}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading || isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || isLoading || !hasAnyChanges}
            >
              {loading || isLoading ? "Processing..." : submitLabel}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
