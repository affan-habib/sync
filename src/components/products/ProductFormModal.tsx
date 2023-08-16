import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Dropzone } from "../common/Dropzone";
import {
  createProduct,
  presign,
  saveMedia,
  uploadPresignedFile,
} from "../../api/products/productsAPI";
import { ProductFormData } from "../../types";

const categories = ["Makeup", "Skin", "Hair", "Bath & Body"];
const currencies = ["USD", "EUR", "GBP"];

interface FileWithPreview extends File {
  preview?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ProductFormModal: React.FC<Props> = ({ open, onClose }) => {
  const { register, control, handleSubmit, setValue } =
    useForm<ProductFormData>({
      defaultValues: {
        skuArray: [{ value: "" }],
        tagsArray: [{ value: "" }],
      },
    });

  const {
    fields: skuFields,
    append: appendSku,
    remove: removeSku,
  } = useFieldArray({
    control,
    name: "skuArray",
  });
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tagsArray",
  });

  const [images, setImages] = useState<FileWithPreview[]>([]);
  const [videos, setVideos] = useState<FileWithPreview[]>([]);

  const handleImageUpload = (files: File[]) => {
    setImages((prev) => [...prev, ...files]);
  };

  const handleVideoUpload = (files: File[]) => {
    setVideos((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (removedFile: FileWithPreview) => {
    setImages((prevFiles) =>
      prevFiles.filter((f) => f.preview !== removedFile.preview)
    );
  };

  const handleRemoveVideo = (removedFile: FileWithPreview) => {
    setVideos((prevFiles) =>
      prevFiles.filter((f) => f.preview !== removedFile.preview)
    );
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const { skuArray, tagsArray, ...restData } = data;

      const sku = skuArray?.map((item) => item.value).filter(Boolean);
      const tags = tagsArray?.map((item) => item.value).filter(Boolean);

      const productId = await createProduct({ ...restData, sku, tags });

      await handleMediaUpload(productId.id, images, "image");
      await handleMediaUpload(productId.id, videos, "video");

      onClose();
    } catch (error) {
      console.error("Failed to submit product", error);
    }
  };

  const handleMediaUpload = async (
    productId: string,
    mediaFiles: FileWithPreview[],
    mediaType: "image" | "video"
  ) => {
    for (const mediaFile of mediaFiles) {
      const { presignedUrl, url } = await presign(
        productId,
        mediaFile.name,
        mediaFile.type,
        mediaFile.size,
        mediaType
      );
      await uploadPresignedFile(presignedUrl, mediaFile);
      await saveMedia(
        productId,
        mediaType,
        url,
        mediaFile.name,
        mediaFile.type,
        mediaFile.size
      );
    }
  };

  const onError = (errors: any) => {
    console.error("Errors while submitting form:", errors);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("productName")}
              label="Product Name"
              fullWidth
              style={{ padding: "10px 0" }}
            />
            <TextField
              {...register("productType")}
              label="Product Type"
              fullWidth
              style={{ padding: "10px 0" }}
            />
            <TextField
              {...register("productBrand")}
              label="Product Brand"
              fullWidth
              style={{ padding: "10px 0" }}
            />
            <Controller
              control={control}
              name="productCategory"
              defaultValue=""
              render={({ field }) => (
                <FormControl
                  fullWidth
                  variant="filled"
                  style={{ padding: "10px 0" }}
                >
                  <InputLabel id="product-category-label">
                    Product Category
                  </InputLabel>
                  <Select
                    labelId="product-category-label"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <TextField
              {...register("description")}
              label="Description"
              multiline
              fullWidth
              style={{ padding: "10px 0" }}
            />
            <TextField
              {...register("shortDescription")}
              label="Short Description"
              fullWidth
              style={{ padding: "10px 0" }}
            />
            <Controller
              control={control}
              name="currency"
              defaultValue=""
              render={({ field }) => (
                <FormControl
                  fullWidth
                  variant="filled"
                  style={{ padding: "10px 0" }}
                >
                  <InputLabel id="currency-label">Currency</InputLabel>
                  <Select
                    labelId="currency-label"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("price")}
              label="Price"
              fullWidth
              style={{ padding: "10px 0" }}
            />
            <TextField
              {...register("discountedPrice")}
              label="Discounted Price"
              fullWidth
              style={{ padding: "10px 0" }}
            />
            <TextField
              {...register("color")}
              label="Color"
              fullWidth
              style={{ padding: "10px 0" }}
            />
            <TextField
              {...register("size")}
              label="Size"
              fullWidth
              style={{ padding: "10px 0" }}
            />
            <TextField
              {...register("stockQuantity")}
              label="Stock Quantity"
              type="number"
              fullWidth
              style={{ padding: "10px 0" }}
            />
            <Box mt={2}>
              <FormControlLabel
                control={<Checkbox {...register("isNew")} defaultChecked />}
                label="New Product"
              />
              <FormControlLabel
                control={<Checkbox {...register("isTrending")} />}
                label="Trending Product"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">SKU</Typography>
            {skuFields.map((item, index) => (
              <Grid container key={index} spacing={1}>
                <Grid item xs={11}>
                  <TextField
                    {...register(`skuArray.${index}.value` as const)}
                    label="SKU"
                    fullWidth
                    defaultValue={item.value}
                    style={{ padding: "10px 0" }}
                  />
                </Grid>
                {index !== 0 && (
                  <Grid item xs={1}>
                    <Box display="flex" alignItems="center" height="100%">
                      <Button fullWidth onClick={() => removeSku(index)}>
                        Remove
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            ))}
            <Grid container justifyContent="flex-end">
              <Button onClick={() => appendSku({ value: "" })}>Add SKU</Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Tags</Typography>
            {tagFields.map((item, index) => (
              <Grid container key={index} spacing={1}>
                <Grid item xs={11}>
                  <TextField
                    {...register(`tagsArray.${index}.value` as const)}
                    label="Tags"
                    fullWidth
                    defaultValue={item.value}
                    style={{ padding: "10px 0" }}
                  />
                </Grid>
                {index !== 0 && (
                  <Grid item xs={1}>
                    <Box display="flex" alignItems="center" height="100%">
                      <Button fullWidth onClick={() => removeTag(index)}>
                        Remove
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            ))}
            <Grid container justifyContent="flex-end">
              <Button onClick={() => appendTag({ value: "" })}>Add Tag</Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Images</Typography>
            <Dropzone
              onFileUpload={handleImageUpload}
              onFileRemove={handleRemoveImage}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Videos</Typography>
            <Dropzone
              onFileUpload={handleVideoUpload}
              onFileRemove={handleRemoveVideo}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("source")}
              label="Source"
              fullWidth
              style={{ padding: "10px" }}
            />
            <TextField
              {...register("sourceLink")}
              label="Source Link"
              fullWidth
              style={{ padding: "10px" }}
            />
            <TextField
              {...register("review")}
              label="Review"
              fullWidth
              style={{ padding: "10px" }}
            />
          </Grid>
        </Grid>
        {/*<Box mt={2}>*/}
        {/*    */}
        {/*</Box>*/}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSubmit(onSubmit, onError)}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
