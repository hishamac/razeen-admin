import React, { useState, useRef } from "react";
import { Upload, X, File } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import toast from "react-hot-toast";

interface AssignmentFileUploadDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  assignmentId: string;
  assignmentTitle: string;
  onUploadSuccess: () => void;
}

const AssignmentFileUploadDialog: React.FC<AssignmentFileUploadDialogProps> = ({
  open,
  setOpen,
  title,
  assignmentId,
  assignmentTitle,
  onUploadSuccess,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    if (selectedFiles.length > 20) {
      toast.error("Maximum 20 files can be uploaded at once");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      
      // Append all files with the field name 'adminFiles'
      selectedFiles.forEach((file) => {
        formData.append("adminFiles", file);
      });

      const endpoint = `https://api.learnwithrazeen.in/api/assignments/${assignmentId}/upload-admin`;
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
        throw new Error(error.message || "Failed to upload files");
      }

      const result = await response.json();

      toast.success(
        result.message || `${result.files?.length || selectedFiles.length} file(s) uploaded successfully for assignment "${assignmentTitle}"`
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
    setSelectedFiles([]);
    setOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length > 0 && !uploading) {
      handleUpload();
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <File className="h-5 w-5" />
            <span>{title}</span>
          </DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Assignment: <span className="font-medium">{assignmentTitle}</span>
          </p>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label>Upload Files</Label>
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click to select files or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Any file type is accepted (Maximum 20 files)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files ({selectedFiles.length})</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <File className="h-4 w-4 shrink-0 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(index)}
                      className="shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={uploading || selectedFiles.length === 0}
            >
              {uploading ? "Uploading..." : `Upload ${selectedFiles.length} File(s)`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentFileUploadDialog;
