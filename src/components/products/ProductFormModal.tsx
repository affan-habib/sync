import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {ImageDropzone} from "../common/ImageDropzone";
import { SyntheticEvent } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const ProductFormModal: React.FC<Props> = ({ open, onClose }) => {
    const [productImage, setProductImage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm();

    const handleImageUpload = (event: SyntheticEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            setProductImage(URL.createObjectURL(file));
        }
    };

    const onSubmit = (data: any) => { // use appropriate data type here
        const newProduct = {
            id: generateProductId(), // Generate a unique product ID
            image: productImage,
            ...data,
        };
        console.log("newProduct", newProduct);
        // setProductsData((prevProducts) => [...prevProducts, newProduct]);
        reset();
        onClose();
    };

    const generateProductId = () => {
        // Generate a random alphanumeric product ID
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let productId = "";
        for (let i = 0; i < 10; i++) {
            productId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return productId;
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Add Product</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ImageDropzone handleImageUpload={handleImageUpload} />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="productName"
                                control={control}
                                rules={{ required: "Product name is required." }}
                                render={({ field }) => (
                                    <TextField
                                        id="productName"
                                        label="Name"
                                        fullWidth
                                        autoFocus
                                        error={!!errors.productName}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="productDescription"
                                control={control}
                                rules={{ required: "Product description is required." }}
                                render={({ field }) => (
                                    <TextField
                                        id="productDescription"
                                        label="Description"
                                        fullWidth
                                        error={!!errors.productDescription}
                                        multiline
                                        rows={4}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="productShortDescription"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        id="productShortDescription"
                                        label="Short Description"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="productSKUs"
                                control={control}
                                render={({ field }) => (
                                    <TextField id="productSKUs" label="SKUs" fullWidth {...field} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="productTags"
                                control={control}
                                render={({ field }) => (
                                    <TextField id="productTags" label="Tags" fullWidth {...field} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="productCategory"
                                control={control}
                                render={({ field }) => (
                                    <TextField id="productCategory" label="Category" fullWidth {...field} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="productQuantity"
                                control={control}
                                render={({ field }) => (
                                    <TextField id="productQuantity" label="Quantity" fullWidth {...field} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="productColor"
                                control={control}
                                render={({ field }) => (
                                    <TextField id="productColor" label="Color" fullWidth {...field} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="productSize"
                                control={control}
                                render={({ field }) => (
                                    <TextField id="productSize" label="Size" fullWidth {...field} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="productVendor"
                                control={control}
                                render={({ field }) => (
                                    <TextField id="productVendor" label="Vendor" fullWidth {...field} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="productPrice"
                                control={control}
                                render={({ field }) => (
                                    <TextField id="productPrice" label="Price" fullWidth {...field} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="productVideo"
                                control={control}
                                render={({ field }) => (
                                    <TextField id="productVideo" label="Video Link" fullWidth {...field} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Active</FormLabel>
                                <Controller
                                    name="productActive"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={field.value}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                />
                                            }
                                            label="Active"
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <DialogActions sx={{ justifyContent: "flex-end" }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

