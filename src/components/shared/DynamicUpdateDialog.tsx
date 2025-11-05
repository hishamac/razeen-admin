import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { RichTextEditor } from "@/components/ui/rich-text-editor";
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
    | "richtext"
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
  initialOptions?: FieldOption[]; // Initial options to show before search for dynamic fields
  multiple?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number;
  rows?: number;
  minHeight?: number; // For richtext editor
  initialValue?: any; // Added for initial values
  searchable?: boolean;
  loading?: boolean; // Loading state for select fields
  onSearch?: (searchTerm: string) => Promise<FieldOption[]>; // Function to fetch options dynamically
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
  gridClassName?: string; // Optional custom grid className
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
  gridClassName,
}: DynamicUpdateDialogProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {}
  );
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const [selectOpen, setSelectOpen] = useState<Record<string, boolean>>({});
  const [searchLoading, setSearchLoading] = useState<Record<string, boolean>>({});
  const [searchResults, setSearchResults] = useState<Record<string, FieldOption[]>>({});
  const searchInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleClose = () => {
    handleOpenChange(false);
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  // Debounce search function
  const searchTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  const handleSearchChange = useCallback(async (fieldName: string, searchTerm: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [fieldName]: searchTerm,
    }));

    const field = fields.find(f => f.name === fieldName);
    if (!field || !field.searchable || !field.onSearch) {
      return;
    }

    // Clear previous timeout for this field
    if (searchTimeouts.current[fieldName]) {
      clearTimeout(searchTimeouts.current[fieldName]);
    }

    // If search term is empty, clear search results
    if (!searchTerm.trim()) {
      setSearchResults((prev) => ({
        ...prev,
        [fieldName]: [],
      }));
      setSearchLoading((prev) => ({
        ...prev,
        [fieldName]: false,
      }));
      return;
    }

    // Set loading state
    setSearchLoading((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    // Debounce the search
    searchTimeouts.current[fieldName] = setTimeout(async () => {
      try {
        const results = await field.onSearch!(searchTerm);
        setSearchResults((prev) => ({
          ...prev,
          [fieldName]: results,
        }));
      } catch (error) {
        console.error(`Search error for field ${fieldName}:`, error);
        setSearchResults((prev) => ({
          ...prev,
          [fieldName]: [],
        }));
      } finally {
        setSearchLoading((prev) => ({
          ...prev,
          [fieldName]: false,
        }));
      }
    }, 300); // 300ms debounce
  }, [fields]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(searchTimeouts.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  const clearSearch = (fieldName: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
    setSearchResults((prev) => ({
      ...prev,
      [fieldName]: [],
    }));
  };

  const getFilteredOptions = (field: UpdateFormField): FieldOption[] => {
    // If field has dynamic search function and search results are available
    if (field.searchable && field.onSearch) {
      const searchTerm = searchTerms[field.name];
      const results = searchResults[field.name];
      
      // If there's a search term, return search results
      if (searchTerm && searchTerm.trim()) {
        return results || [];
      }
      
      // If no search term, return initial options if available
      return field.initialOptions || [];
    }
    
    // For static options (hardcoded data), use the existing filtering logic
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
            <span className="text-primary text-xs">(modified)</span>
          )}
        </Label>

        <div className="relative">
          <Select
            value={value || ""}
            onValueChange={(val) =>
              handleInputChange(field.name, val, field.type)
            }
            disabled={field.disabled || loading || isLoading || field.loading}
            open={isOpen}
            onOpenChange={(open) => {
              setSelectOpen((prev) => ({ ...prev, [field.name]: open }));
              // Clear search when closing
              if (!open) {
                setSearchTerms(prev => ({ ...prev, [field.name]: "" }));
                setSearchResults(prev => ({ ...prev, [field.name]: [] }));
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.loading ? "Loading..." : field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.searchable && (
                <div className="flex items-center px-3 py-2 border-b sticky top-0 bg-background z-50">
                  <Search className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                  <Input
                    ref={(el) => {
                      searchInputRefs.current[field.name] = el;
                    }}
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) =>
                      handleSearchChange(field.name, e.target.value)
                    }
                    className="h-8 border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    onKeyDown={(e) => {
                      // Prevent Select component from handling these keys when input is focused
                      e.stopPropagation();
                      if (e.key === 'Escape') {
                        // Clear search on escape
                        setSearchTerms(prev => ({ ...prev, [field.name]: "" }));
                        setSearchResults(prev => ({ ...prev, [field.name]: [] }));
                        // Focus back to trigger
                        e.currentTarget.blur();
                      }
                    }}
                    onMouseDown={(e) => {
                      // Prevent Select from handling mouse events
                      e.stopPropagation();
                      // Keep focus on input after mouse down
                      setTimeout(() => {
                        const input = searchInputRefs.current[field.name];
                        if (input) {
                          input.focus();
                        }
                      }, 0);
                    }}
                    onFocus={(e) => {
                      // Prevent event from bubbling to Select
                      e.stopPropagation();
                    }}
                    onBlur={(e) => {
                      // Prevent event from bubbling to Select
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      // Prevent Select from closing when clicking on search input
                      e.stopPropagation();
                      e.preventDefault();
                      // Ensure focus stays on input
                      setTimeout(() => {
                        const input = searchInputRefs.current[field.name];
                        if (input && document.activeElement !== input) {
                          input.focus();
                        }
                      }, 0);
                    }}
                    onInput={(e) => {
                      // Prevent Select from handling input events
                      e.stopPropagation();
                      // Maintain focus after input
                      setTimeout(() => {
                        const input = searchInputRefs.current[field.name];
                        if (input && document.activeElement !== input) {
                          input.focus();
                        }
                      }, 0);
                    }}
                    autoComplete="off"
                    autoFocus={false}
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 ml-2 flex-shrink-0"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        clearSearch(field.name);
                      }}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
              <div className="max-h-[200px] overflow-y-auto">
                {field.loading ? (
                  <div className="px-3 py-2 text-sm text-gray-500 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-100 mr-2"></div>
                    Loading options...
                  </div>
                ) : searchLoading[field.name] ? (
                  <div className="px-3 py-2 text-sm text-gray-500 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-100 mr-2"></div>
                    Searching...
                  </div>
                ) : filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : field.searchable && field.onSearch && searchTerm ? (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No options found for "{searchTerm}"
                  </div>
                ) : field.searchable && field.onSearch && !searchTerm ? (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    {field.initialOptions && field.initialOptions.length > 0 
                      ? "Type to search for more options..." 
                      : "Start typing to search..."}
                  </div>
                ) : field.searchable && !field.onSearch && searchTerm ? (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No options found for "{searchTerm}"
                  </div>
                ) : !field.searchable && field.options ? (
                  field.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : null}
              </div>
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
            <span className="text-primary text-xs">(modified)</span>
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
          {field.loading ? (
            <div className="px-2 py-4 text-sm text-gray-500 flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-100 mr-2"></div>
              Loading options...
            </div>
          ) : searchLoading[field.name] ? (
            <div className="px-2 py-4 text-sm text-gray-500 flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-100 mr-2"></div>
              Searching...
            </div>
          ) : filteredOptions.length > 0 ? (
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
          ) : field.searchable && field.onSearch && searchTerm ? (
            <div className="px-2 py-1 text-sm text-gray-500">
              No options found for "{searchTerm}"
            </div>
          ) : field.searchable && field.onSearch && !searchTerm ? (
            <div className="px-2 py-1 text-sm text-gray-500">
              {field.initialOptions && field.initialOptions.length > 0 
                ? "Type to search for more options..." 
                : "Start typing to search..."}
            </div>
          ) : field.searchable && !field.onSearch && searchTerm ? (
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
                <span className="text-primary text-xs">(modified)</span>
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
                <span className="text-primary text-xs">(modified)</span>
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
                <span className="text-primary text-xs">(modified)</span>
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

      case "richtext":
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
                <span className="text-primary text-xs">(modified)</span>
              )}
            </Label>
            <RichTextEditor
              value={value || ""}
              onChange={(content) =>
                handleInputChange(field.name, content, field.type)
              }
              placeholder={field.placeholder}
              disabled={field.disabled || loading || isLoading}
              minHeight={field.minHeight || 120}
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
                  <span className="text-primary text-xs">(modified)</span>
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
                      <span className="text-primary text-xs font-normal">
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
                <span className="text-primary text-xs">(modified)</span>
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
                <span className="text-primary text-xs">(modified)</span>
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
                <span className="text-primary text-xs">(modified)</span>
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

  const getGridColumns = (className?: string): string => {
    return className || "grid-cols-1 md:grid-cols-2";
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Clear form data when dialog is closed
      setError("");
      setFormData({});
      setInitialData({});
      setShowPasswords({});
      setSearchTerms({});
      setSelectOpen({});
    }
    setOpen(isOpen);
  };

  // Check if there are any changes to enable/disable submit button
  const hasAnyChanges = Object.keys(getChangedValues()).length > 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex text-2xl items-center gap-2">
            <Edit className="h-6 w-6" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className={`grid gap-4 ${getGridColumns(gridClassName)}`}>
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
              type="submit"
              disabled={loading || isLoading || !hasAnyChanges}
            >
              {loading || isLoading ? "Processing..." : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
