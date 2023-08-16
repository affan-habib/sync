import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

interface ImportDialogProps {
  show: boolean;
  hide: () => void;
}
export const ImportDialog: FC<ImportDialogProps> = ({ show, hide }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleFileUpload = () => {
    if (file) {
      // Handle file upload
    }
  };

  const handleSampleDownload = () => {
    // Handle sample download
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
