import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  FileText,
  Video,
  Image as ImageIcon,
  File,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { ModuleType } from "../../generated/graphql";
import toast from "react-hot-toast";

interface ModuleFileUploadDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  moduleId: string;
  moduleName: string;
  currentModuleType?: ModuleType;
  onUploadSuccess: () => void;
}

const ModuleFileUploadDialog: React.FC<ModuleFileUploadDialogProps> = ({
  open,
  setOpen,
  title,
  moduleId,
  moduleName,
  currentModuleType,
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [moduleType, setModuleType] = useState<ModuleType | "">(
    currentModuleType || ""
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File type validation based on module type
  const getAcceptedFileTypes = (type: ModuleType | "") => {
    switch (type) {
      case ModuleType.Video:
        return "video/mp4";
      case ModuleType.Image:
        return "image/*";
      case ModuleType.Pdf:
        return ".pdf";
      case ModuleType.Document:
        return ".doc,.docx,.txt,.rtf";
      default:
        return "*/*";
    }
  };

  // Get file icon based on module type
  const getModuleTypeIcon = (type: ModuleType | "") => {
    switch (type) {
      case ModuleType.Video:
        return Video;
      case ModuleType.Image:
        return ImageIcon;
      case ModuleType.Pdf:
      case ModuleType.Document:
        return FileText;
      default:
        return File;
    }
  };

  // Validate file based on module type
  const validateFile = (file: File, type: ModuleType) => {
    const maxSize = 100 * 1024 * 1024; // 100MB max for videos
    const imageMaxSize = 5 * 1024 * 1024; // 5MB max for images
    const documentMaxSize = 10 * 1024 * 1024; // 10MB max for documents

    switch (type) {
      case ModuleType.Video:
        if (!file.type.startsWith("video/")) {
          return "Please select a valid video file";
        }
        if (file.size > maxSize) {
          return "Video file size exceeds 100MB limit";
        }
        break;
      case ModuleType.Image:
        if (!file.type.startsWith("image/")) {
          return "Please select a valid image file";
        }
        if (file.size > imageMaxSize) {
          return "Image file size exceeds 5MB limit";
        }
        break;
      case ModuleType.Pdf:
        if (file.type !== "application/pdf") {
          return "Please select a valid PDF file";
        }
        if (file.size > documentMaxSize) {
          return "PDF file size exceeds 10MB limit";
        }
        break;
      case ModuleType.Document:
        const validDocTypes = [
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
          "application/rtf",
        ];
        if (!validDocTypes.includes(file.type)) {
          return "Please select a valid document file (DOC, DOCX, TXT, RTF)";
        }
        if (file.size > documentMaxSize) {
          return "Document file size exceeds 10MB limit";
        }
        break;
    }
    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && moduleType) {
      const validationError = validateFile(file, moduleType as ModuleType);
      if (validationError) {
        toast.error(validationError);
        return;
      }

      setSelectedFile(file);

      // Create preview URL for images only
      if (moduleType === ModuleType.Image && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    if (!moduleType) {
      toast.error("Please select a module type");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Use the secure file upload endpoint with moduleType as query parameter
      const endpoint = `https://api.learnwithrazeen.in/api/files/secure/upload/${moduleId}?moduleType=${moduleType}`;

      // Get token from localStorage
      const token = localStorage.getItem("token");

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload file");
      }

      await response.json();

      toast.success(
        `${moduleType.toLowerCase()} file uploaded successfully for module "${moduleName}"`
      );
      onUploadSuccess();
      handleClose();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setModuleType(currentModuleType || "");
    setOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && moduleType && !uploading) {
      handleUpload();
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0 && moduleType) {
      const file = files[0];
      const validationError = validateFile(file, moduleType as ModuleType);
      if (!validationError) {
        const mockEvent = {
          target: { files: [file] },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileSelect(mockEvent);
      } else {
        toast.error(validationError);
      }
    }
  };

  const IconComponent = getModuleTypeIcon(moduleType);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <IconComponent className="h-5 w-5" />
            <span>{title}</span>
          </DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Module: <span className="font-medium">{moduleName}</span>
          </p>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Module Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="moduleType">Module Type</Label>
            <Select
              value={moduleType}
              onValueChange={(value) => setModuleType(value as ModuleType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select module type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ModuleType.Video}>
                  <div className="flex items-center space-x-2">
                    <Video className="h-4 w-4" />
                    <span>Video</span>
                  </div>
                </SelectItem>
                <SelectItem value={ModuleType.Image}>
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>Image</span>
                  </div>
                </SelectItem>
                <SelectItem value={ModuleType.Pdf}>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>PDF</span>
                  </div>
                </SelectItem>
                <SelectItem value={ModuleType.Document}>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Document</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload Area */}
          {moduleType && (
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={getAcceptedFileTypes(moduleType)}
                onChange={handleFileSelect}
                className="hidden"
              />

              {selectedFile ? (
                <div className="space-y-3">
                  {previewUrl && moduleType === ModuleType.Image ? (
                    <div className="w-full overflow-hidden rounded-lg">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full max-w-full h-auto max-h-48 sm:max-h-64 object-contain mx-auto rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <IconComponent className="h-12 w-12 text-gray-400" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <IconComponent className="mx-auto h-12 w-12 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-primary">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {moduleType === ModuleType.Video &&
                        "Video files (MP4)"}
                      {moduleType === ModuleType.Image &&
                        "Image files (JPG, PNG, GIF)"}
                      {moduleType === ModuleType.Pdf && "PDF files"}
                      {moduleType === ModuleType.Document &&
                        "Document files (DOC, DOCX, TXT, RTF)"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {!moduleType && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <File className="mx-auto h-12 w-12 mb-3 opacity-50" />
              <p>Select a module type to begin file upload</p>
            </div>
          )}
        </form>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={uploading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || !moduleType || uploading}
            className="w-full sm:w-auto"
          >
            {uploading ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleFileUploadDialog;
