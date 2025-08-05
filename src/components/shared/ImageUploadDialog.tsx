import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import toast from "react-hot-toast";

interface ImageUploadDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  courseId: string;
  imageType: "thumbnail" | "cover";
  onUploadSuccess: () => void;
}

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({
  open,
  setOpen,
  title,
  courseId,
  imageType,
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image file");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      // Use the correct field name based on imageType to match backend expectations
      const fieldName = imageType === "thumbnail" ? "thumbnail" : "coverImage";
      formData.append(fieldName, selectedFile);

      const endpoint = `http://[::1]:8080/api/files/course-images/${imageType}/${courseId}`;

      // Get token from localStorage (same as Apollo client)
      const token = localStorage.getItem("token");
      
      const response = await fetch(endpoint, {
        method: "PUT",
        body: formData,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      // Parse response to ensure it's valid JSON
      await response.json();
      
      toast.success(
        `${
          imageType === "thumbnail" ? "Thumbnail" : "Cover image"
        } uploaded successfully`
      );
      onUploadSuccess();
      handleClose();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        `Failed to upload ${imageType}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && !uploading) {
      handleUpload();
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const mockEvent = {
          target: { files: [file] },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileSelect(mockEvent);
      } else {
        toast.error("Please drop a valid image file");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* File input area */}
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {previewUrl ? (
              <div className="space-y-3">
                <div className="w-full overflow-hidden rounded-lg">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full max-w-full h-auto max-h-48 sm:max-h-64 object-contain mx-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                  {selectedFile?.name}
                </p>
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
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG up to 5MB
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Image
                </Button>
              </div>
            )}
          </div>

          <DialogFooter className="flex-shrink-0">
            <Button type="button" variant="outline" onClick={handleClose} disabled={uploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedFile || uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
