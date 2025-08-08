import * as XLSX from "xlsx";
import type { FieldConfig } from "../components/shared/ExcelBulkUploadDialog";

export const downloadExcelTemplate = (
  fileName: string,
  columns: FieldConfig[],
  sampleData?: Record<string, any>[]
) => {
  // Create headers array
  const headers = columns.map(col => col.label);
  
  // Create sample data if not provided
  const data = sampleData && sampleData.length > 0 ? sampleData : [
    columns.reduce((acc, col) => {
      acc[col.label] = col.type === "email" ? "example@email.com" 
                      : col.type === "phone" ? "+1234567890"
                      : col.type === "password" ? "password123"
                      : col.type === "select" && col.options ? col.options[0]
                      : "Sample " + col.label;
      return acc;
    }, {} as Record<string, any>)
  ];

  // Create worksheet with headers and sample data
  const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
  
  // Set column widths
  const colWidths = headers.map(() => ({ width: 15 }));
  worksheet['!cols'] = colWidths;

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

  // Add instructions sheet
  const instructions = [
    { Instruction: "1. Fill in the data in the Template sheet" },
    { Instruction: "2. Do not modify the column headers" },
    { Instruction: "3. Required columns must be filled" },
    { Instruction: "4. Email columns must have valid email format" },
    { Instruction: "5. Save and upload the file" }
  ];
  
  const instructionSheet = XLSX.utils.json_to_sheet(instructions);
  instructionSheet['!cols'] = [{ width: 50 }];
  XLSX.utils.book_append_sheet(workbook, instructionSheet, "Instructions");

  // Download the file
  XLSX.writeFile(workbook, fileName);
};

export const generateUserTemplate = (role: "student" | "admin") => {
  const columns: FieldConfig[] = [
    { key: "username", label: "Username", type: "text", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "firstName", label: "First Name", type: "text", required: true },
    { key: "lastName", label: "Last Name", type: "text", required: true },
    { key: "phone", label: "Phone", type: "phone", required: false },
    { key: "password", label: "Password", type: "password", required: true }
  ];

  const sampleData = [
    {
      "Username": "john.doe",
      "Email": "john.doe@example.com", 
      "First Name": "John",
      "Last Name": "Doe",
      "Phone": "+1234567890",
      "Password": "password123"
    },
    {
      "Username": "jane.smith",
      "Email": "jane.smith@example.com",
      "First Name": "Jane", 
      "Last Name": "Smith",
      "Phone": "+0987654321",
      "Password": "securepass456"
    }
  ];

  downloadExcelTemplate(
    `${role}_bulk_upload_template.xlsx`,
    columns,
    sampleData
  );
};
