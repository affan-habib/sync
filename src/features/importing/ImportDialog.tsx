import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { importCsv } from "api/products/productsAPI";

interface ImportDialogProps {
  show: boolean;
  hide: () => void;
}
export const ImportDialog: FC<ImportDialogProps> = ({ show, hide }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateRow = (row: any) => {
    // Validate enums
    const allowedStatus = ["active", "inactive"];
    const allowedSubvariantType = [
      "multi-color",
      "multi-option",
      "multi-shade",
      "multi-size",
      "single",
    ];

    if (!allowedStatus.includes(row.status.toLowerCase())) {
      return `Invalid 'Status' value: '${row.status}' on row ${
        row.__parsedRowNumber
      }. Allowed values are ${allowedStatus.join(", ")}.`;
    }
    if (
      row.subvariant_type &&
      !allowedSubvariantType.includes(row.subvariant_type.toLowerCase())
    ) {
      return `Invalid 'Subvariant Type' value: '${
        row.subvariant_type
      }' on row ${
        row.__parsedRowNumber
      }. Allowed values are ${allowedSubvariantType.join(", ")}.`;
    }
    // Add more validation checks as needed
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleFileUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (result: any) {
          for (let i = 0; i < result.data.length; i++) {
            const row = result.data[i];
            row.__parsedRowNumber = i + 1;
            const rowError = validateRow(row);
            if (rowError) {
              setError(rowError);
              return;
            }
          }
          importCsv(file).then(() => {
            alert(
              "Successfully uploaded, the products are being processed in the background."
            );
          });
        },
      });
    }
  };

  const handleSampleDownload = () => {
    const link = document.createElement("a");
    link.href = `${process.env.PUBLIC_URL}/products_template.csv`;
    link.download = "products_template.csv";
    link.click();
  };

  return (
    <Dialog open={show} onClose={hide}>
      <DialogTitle>Import Products</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="upload-csv"
          label="Upload CSV"
          type="file"
          id="upload-csv"
          InputLabelProps={{ shrink: true }}
          onChange={handleFileChange}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFileUpload} variant="contained" color="primary">
          Upload
        </Button>
        <Button
          onClick={handleSampleDownload}
          variant="contained"
          color="secondary"
        >
          Download Sample Template
        </Button>
      </DialogActions>
    </Dialog>
  );
};
