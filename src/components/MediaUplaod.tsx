import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Dropzone } from "./common/Dropzone";

interface FileWithPreview extends File {
  preview?: string;
}

interface MediaUploadProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ setFieldValue }) => {
  const [images, setImages] = useState<FileWithPreview[]>([]);
  const [videos, setVideos] = useState<FileWithPreview[]>([]);

  const handleUpload = (files: File[], setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>, fieldName: string) => {
    const updatedFiles = [...files, ...files];
    setFiles(updatedFiles);
    setFieldValue(fieldName, updatedFiles);
  };

  const handleRemove = (removedFile: FileWithPreview, files: FileWithPreview[], setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>) => {
    const updatedFiles = files.filter((f) => f.preview !== removedFile.preview);
    setFiles(updatedFiles);
    setFieldValue("images", updatedFiles);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Images</Typography>
        <Dropzone
          onFileUpload={(files) => handleUpload(files, setImages, "images")}
          onFileRemove={(removedFile) => handleRemove(removedFile, images, setImages)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Videos</Typography>
        <Dropzone
          onFileUpload={(files) => handleUpload(files, setVideos, "videos")}
          onFileRemove={(removedFile) => handleRemove(removedFile, videos, setVideos)}
        />
      </Grid>
    </Grid>
  );
};

export default MediaUpload;
