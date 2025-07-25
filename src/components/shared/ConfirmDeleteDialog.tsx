import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import React from "react";

interface ConfirmDeleteDialogProps {
  title?: string;
  message: React.ReactNode;
  description?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ConfirmDeleteDialog({
  title = "Confirm Deletion",
  message,
  description = "This action cannot be undone.",
  onConfirm,
  isLoading = false,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  open,
  setOpen,
}: ConfirmDeleteDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const dialogProps = open !== undefined && setOpen ? { open, onOpenChange: setOpen } : {};

  return (
    <Dialog {...dialogProps}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {title}
              </DialogTitle>
              <DialogDescription className="mt-1">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4">
          {message}
        </div>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                {confirmLabel}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
