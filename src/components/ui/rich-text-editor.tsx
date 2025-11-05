
import React, { useRef, useEffect, useCallback, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minHeight?: number;
}

const cn = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ 
    value = "", 
    onChange, 
    placeholder = "Enter your text...", 
    disabled = false, 
    className,
    minHeight = 120
  }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const isInitialized = useRef(false);
    const isUpdating = useRef(false);

    const formatCommands = [
      { command: "bold", icon: <Bold className="h-4 w-4" />, title: "Bold (Ctrl+B)" },
      { command: "italic", icon: <Italic className="h-4 w-4" />, title: "Italic (Ctrl+I)" },
      { command: "underline", icon: <Underline className="h-4 w-4" />, title: "Underline (Ctrl+U)" },
    ];

    const listCommands = [
      { command: "insertUnorderedList", icon: <List className="h-4 w-4" />, title: "Bullet List" },
      { command: "insertOrderedList", icon: <ListOrdered className="h-4 w-4" />, title: "Numbered List" },
    ];

    const alignCommands = [
      { command: "justifyLeft", icon: <AlignLeft className="h-4 w-4" />, title: "Align Left" },
      { command: "justifyCenter", icon: <AlignCenter className="h-4 w-4" />, title: "Align Center" },
      { command: "justifyRight", icon: <AlignRight className="h-4 w-4" />, title: "Align Right" },
    ];

    const directionCommands = [
      { command: "ltr", icon: <span className="text-xs font-bold">LTR</span>, title: "Left to Right" },
      { command: "rtl", icon: <span className="text-xs font-bold">RTL</span>, title: "Right to Left" },
    ];

    const handleContentChange = useCallback(() => {
      if (editorRef.current && onChange && !isUpdating.current) {
        const content = editorRef.current.innerHTML;
        onChange(content);
      }
    }, [onChange]);

    const executeCommand = useCallback((command: string, value?: string) => {
      if (disabled) return;

      const selection = window.getSelection() as Selection | null;
      const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
      const container = range
        ? (range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
            ? (range.commonAncestorContainer as HTMLElement)
            : (range.commonAncestorContainer.parentElement))
        : null;

      // Handle text direction - only apply to current block element
      if (command === "ltr" || command === "rtl") {
        if (editorRef.current && container) {
          // Find the immediate block element where cursor is
          const blockElement = container.closest("p, div, li, h1, h2, h3, h4, h5, h6") as HTMLElement | null;
          
          if (blockElement && editorRef.current.contains(blockElement)) {
            // Only apply to the current block element
            blockElement.setAttribute("dir", command);
            
            // Special handling for list items
            if (blockElement.tagName === "LI") {
              if (command === "rtl") {
                // RTL: bullet should be inside to prevent overflow
                blockElement.style.direction = "rtl";
                blockElement.style.listStylePosition = "inside";
                blockElement.style.paddingRight = "0";
                blockElement.style.paddingLeft = "0";
                blockElement.style.textAlign = "right";
              } else {
                // LTR: bullet should be on the left, outside
                blockElement.style.direction = "ltr";
                blockElement.style.listStylePosition = "outside";
                blockElement.style.paddingLeft = "0";
                blockElement.style.paddingRight = "0";
                blockElement.style.textAlign = "left";
              }
            } else {
              // For non-list elements
              blockElement.style.direction = command;
              
              // Auto-align based on direction for this block only
              setTimeout(() => {
                const sel = window.getSelection();
                if (sel && sel.rangeCount > 0) {
                  const r = sel.getRangeAt(0);
                  const tempRange = document.createRange();
                  tempRange.selectNodeContents(blockElement);
                  sel.removeAllRanges();
                  sel.addRange(tempRange);
                  
                  if (command === "ltr") {
                    document.execCommand("justifyLeft", false);
                  } else if (command === "rtl") {
                    document.execCommand("justifyRight", false);
                  }
                  
                  // Restore cursor position
                  sel.removeAllRanges();
                  sel.addRange(r);
                }
                handleContentChange();
              }, 0);
            }
            
            handleContentChange();
          } else {
            // If no specific block, create a new paragraph with direction
            const newP = document.createElement("p");
            newP.setAttribute("dir", command);
            newP.innerHTML = "<br>";
            
            if (range) {
              range.insertNode(newP);
              range.setStart(newP, 0);
              range.setEnd(newP, 0);
              selection?.removeAllRanges();
              selection?.addRange(range);
            }
            
            handleContentChange();
          }
        }
        return;
      }

      // Handle list and list item alignment
      if (["justifyLeft", "justifyCenter", "justifyRight"].includes(command)) {
        // Check if we're in a list item
        const listItem = container?.closest("li") as HTMLElement | null;
        const list = container?.closest("ul, ol") as HTMLElement | null;
        
        if (listItem) {
          // Apply alignment to the specific list item
          let alignValue = "left";
          if (command === "justifyCenter") alignValue = "center";
          if (command === "justifyRight") alignValue = "right";

          listItem.style.textAlign = alignValue;
          
          // Get the direction of the list item
          const direction = listItem.getAttribute("dir") || "ltr";
          
          if (alignValue === "center") {
            listItem.style.listStylePosition = "inside";
            listItem.style.paddingLeft = "0";
            listItem.style.paddingRight = "0";
          } else if (alignValue === "right") {
            if (direction === "rtl") {
              // RTL with right alignment: keep bullet outside on the right
              listItem.style.listStylePosition = "outside";
              listItem.style.paddingLeft = "0";
              listItem.style.paddingRight = "2em";
            } else {
              // LTR with right alignment: bullet inside
              listItem.style.listStylePosition = "inside";
              listItem.style.paddingLeft = "0";
              listItem.style.paddingRight = "0";
            }
          } else {
            // Left alignment
            if (direction === "rtl") {
              // RTL with left alignment: bullet inside
              listItem.style.listStylePosition = "inside";
              listItem.style.paddingLeft = "0";
              listItem.style.paddingRight = "0";
            } else {
              // LTR with left alignment: bullet outside on the left
              listItem.style.listStylePosition = "outside";
              listItem.style.paddingLeft = "0";
              listItem.style.paddingRight = "0";
            }
          }
          
          handleContentChange();
          return;
        } else if (list) {
          // Apply alignment to the entire list
          let alignValue = "left";
          if (command === "justifyCenter") alignValue = "center";
          if (command === "justifyRight") alignValue = "right";

          list.style.textAlign = alignValue;
          
          // Apply to all list items
          const items = list.querySelectorAll("li");
          items.forEach((item: HTMLElement) => {
            item.style.textAlign = alignValue;
            item.style.listStylePosition = "inside";
            
            if (alignValue === "center" || alignValue === "right") {
              item.style.paddingLeft = "0";
              item.style.paddingRight = "0";
            } else {
              item.style.paddingLeft = "";
              item.style.paddingRight = "";
              item.style.listStylePosition = "outside";
            }
          });
          
          handleContentChange();
          return;
        }
      }

      // Handle list commands
      if (command === "insertUnorderedList" || command === "insertOrderedList") {
        if (editorRef.current) editorRef.current.focus();
        document.execCommand(command, false, value);
        
        // After creating the list, check if we need to apply RTL direction
        setTimeout(() => {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const container = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
              ? (range.commonAncestorContainer as HTMLElement)
              : (range.commonAncestorContainer.parentElement);
            
            // Check if we're in an RTL context
            const listItem = container?.closest("li") as HTMLElement | null;
            if (listItem) {
              const parent = listItem.closest("p[dir='rtl'], div[dir='rtl']");
              if (parent || editorRef.current?.style.direction === 'rtl') {
                // Apply RTL to the newly created list item
                listItem.setAttribute("dir", "rtl");
                listItem.style.direction = "rtl";
                listItem.style.listStylePosition = "inside";
                listItem.style.paddingRight = "0";
                listItem.style.paddingLeft = "0";
                listItem.style.textAlign = "right";
              }
            }
          }
          handleContentChange();
        }, 0);
      } else {
        // Regular formatting commands
        document.execCommand(command, false, value);
      }

      if (editorRef.current) {
        editorRef.current.focus();
        handleContentChange();
      }
    }, [disabled, handleContentChange]);

    const handleInput = useCallback(() => {
      handleContentChange();
    }, [handleContentChange]);

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
      handleContentChange();
    }, [handleContentChange]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b': e.preventDefault(); executeCommand('bold'); break;
          case 'i': e.preventDefault(); executeCommand('italic'); break;
          case 'u': e.preventDefault(); executeCommand('underline'); break;
        }
      }
    }, [executeCommand]);

    // Initialize content
    useEffect(() => {
      if (editorRef.current && !isInitialized.current) {
        if (value) {
          isUpdating.current = true;
          editorRef.current.innerHTML = value;
          isUpdating.current = false;
        }
        isInitialized.current = true;
      }
    }, [value]);

    // Update content when value changes externally
    useEffect(() => {
      if (editorRef.current && isInitialized.current && value !== undefined) {
        const currentContent = editorRef.current.innerHTML;
        if (currentContent !== value && document.activeElement !== editorRef.current) {
          isUpdating.current = true;
          editorRef.current.innerHTML = value;
          isUpdating.current = false;
        }
      }
    }, [value]);

    return (
      <div className={cn("border rounded-md bg-background w-full", className)}>
        {/* Toolbar */}
        <div className="border-b p-2 flex items-center gap-1 flex-wrap">
          {formatCommands.map(({ command, icon, title }) => (
            <Button
              key={command}
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => executeCommand(command)}
              disabled={disabled}
              title={title}
            >
              {icon}
            </Button>
          ))}

          <div className="w-px h-6 bg-border mx-1" />

          {listCommands.map(({ command, icon, title }) => (
            <Button
              key={command}
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => executeCommand(command)}
              disabled={disabled}
              title={title}
            >
              {icon}
            </Button>
          ))}

          <div className="w-px h-6 bg-border mx-1" />

          {alignCommands.map(({ command, icon, title }) => (
            <Button
              key={command}
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => executeCommand(command)}
              disabled={disabled}
              title={title}
            >
              {icon}
            </Button>
          ))}

          <div className="w-px h-6 bg-border mx-1" />

          {directionCommands.map(({ command, icon, title }) => (
            <Button
              key={command}
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-auto px-2"
              onClick={() => executeCommand(command)}
              disabled={disabled}
              title={title}
            >
              {icon}
            </Button>
          ))}
        </div>

        {/* Editable area */}
        <div
          ref={ref || editorRef}
          className={cn(
            "p-3 prose prose-sm max-w-none focus:outline-none",
            "prose-headings:mt-0 prose-headings:mb-2",
            "prose-p:mt-0 prose-p:mb-2",
            "overflow-y-auto",
            disabled && "opacity-50 cursor-not-allowed bg-muted",
            "[&:empty:before]:content-[attr(data-placeholder)]",
            "[&:empty:before]:text-muted-foreground",
            "[&:empty:before]:pointer-events-none"
          )}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={handleInput}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          style={{ 
            minHeight: `${minHeight}px`,
            maxHeight: "320px",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            width: "100%",
            boxSizing: "border-box",
            overflowX: "hidden"
          }}
          data-placeholder={placeholder}
        />

        <style dangerouslySetInnerHTML={{
          __html: `
            [contenteditable] {
              word-break: break-word;
              overflow-wrap: break-word;
              white-space: pre-wrap;
              width: 100%;
              box-sizing: border-box;
              overflow-x: hidden;
              position: relative;
            }
            [contenteditable] * {
              max-width: 100%;
              word-break: break-word;
              overflow-wrap: break-word;
              box-sizing: border-box;
            }
            [contenteditable] p,
            [contenteditable] div,
            [contenteditable] span,
            [contenteditable] li {
              word-break: break-word !important;
              overflow-wrap: break-word !important;
            }
            [contenteditable] ul,
            [contenteditable] ol {
              margin: 0.5em 0;
              padding-left: 2em;
              list-style-position: outside;
              overflow: visible;
            }
            [contenteditable] ul[dir="rtl"],
            [contenteditable] ol[dir="rtl"] {
              padding-left: 0;
              padding-right: 2em;
              overflow: visible;
            }
            [contenteditable] li {
              margin: 0.25em 0;
              display: list-item;
            }
            [contenteditable] ul {
              list-style-type: disc;
            }
            [contenteditable] ol {
              list-style-type: decimal;
            }
            /* Center aligned list items */
            [contenteditable] li[style*="text-align: center"] {
              list-style-position: inside;
              text-align: center;
              padding-left: 0;
              padding-right: 0;
              display: list-item;
            }
            /* Right aligned list items */
            [contenteditable] li[style*="text-align: right"] {
              list-style-position: inside;
              text-align: right;
              padding-left: 0;
              padding-right: 0;
              display: list-item;
            }
            /* Left aligned list items */
            [contenteditable] li[style*="text-align: left"] {
              list-style-position: outside;
              text-align: left;
              padding-left: 0;
              padding-right: 0;
              display: list-item;
            }
            /* RTL support for list items */
            [contenteditable] li[dir="rtl"] {
              direction: rtl;
              text-align: right;
              list-style-position: outside;
              padding-right: 2em;
              padding-left: 0;
            }
            [contenteditable] li[dir="ltr"] {
              direction: ltr;
              text-align: left;
              list-style-position: outside;
              padding-left: 0;
              padding-right: 0;
            }
            /* RTL list items with right alignment */
            [contenteditable] li[dir="rtl"][style*="text-align: right"] {
              list-style-position: outside;
              padding-right: 2em;
              padding-left: 0;
            }
            /* RTL list items with center alignment */
            [contenteditable] li[dir="rtl"][style*="text-align: center"] {
              list-style-position: inside;
              padding-right: 0;
              padding-left: 0;
            }
            /* LTR list items preserve normal alignment behavior */
            [contenteditable] li[dir="ltr"][style*="text-align: right"] {
              list-style-position: inside;
              padding-left: 0;
              padding-right: 0;
            }
            [contenteditable] li[dir="ltr"][style*="text-align: center"] {
              list-style-position: inside;
              padding-left: 0;
              padding-right: 0;
            }
            [contenteditable] li[dir="ltr"][style*="text-align: left"] {
              list-style-position: outside;
              padding-left: 0;
              padding-right: 0;
            }
            /* RTL support for paragraphs and other blocks */
            [contenteditable] p[dir="rtl"],
            [contenteditable] div[dir="rtl"],
            [contenteditable] h1[dir="rtl"],
            [contenteditable] h2[dir="rtl"],
            [contenteditable] h3[dir="rtl"] {
              direction: rtl;
              text-align: right;
            }
            [contenteditable] p[dir="ltr"],
            [contenteditable] div[dir="ltr"],
            [contenteditable] h1[dir="ltr"],
            [contenteditable] h2[dir="ltr"],
            [contenteditable] h3[dir="ltr"] {
              direction: ltr;
              text-align: left;
            }
          `
        }} />
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";