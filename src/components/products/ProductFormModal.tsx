import React, {useCallback, useState} from 'react';
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import {useMutation} from 'react-query';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Typography,
    DialogTitle,
    Dialog,
    DialogContent,
    Grid,
    Box, DialogActions
} from '@mui/material';
import {useDropzone} from 'react-dropzone';

type FormData = {
    sku?: string[],
    tags?: string[],
    skuArray: {
        value: string
    }[],
    tagsArray: {
        value: string
    }[],
    productName: string,
    productType: string,
    productBrand: string,
    productCategory: string,
    description: string,
    shortDescription: string,
    currency: string,
    price: string,
    discountedPrice: string,
    color: string,
    size: string,
    stockQuantity: number,
    isNew: boolean,
    isTrending: boolean,
    images: File[],
    videos: File[],
    source: string,
    sourceLink: string,
    review: string
};

const categories = ['Makeup', 'Skin', 'Hair', 'Bath & Body'];
const currencies = ['USD', 'EUR', 'GBP'];

interface Props {
    open: boolean;
    onClose: () => void;
}

export const ProductFormModal: React.FC<Props> = ({
                                                      open,
                                                      onClose
                                                  }) => {
    const {
        register,
        control,
        handleSubmit,
        setValue
    } = useForm<FormData>();

    const {
        fields: skuFields,
        append: appendSku,
        remove: removeSku
    } = useFieldArray({
        control,
        name: "skuArray"
    });
    const {
        fields: tagFields,
        append: appendTag,
        remove: removeTag
    } = useFieldArray({
        control,
        name: "tagsArray"
    });

    const someAsyncFunc = async (data: FormData) => {
    };
    const {mutate} = useMutation(someAsyncFunc);

    const onDropImages = useCallback((acceptedFiles: File[]) => {
        setValue("images", acceptedFiles);
    }, [setValue]);
    const {
        getRootProps: getRootPropsImages,
        getInputProps: getInputPropsImages
    } = useDropzone({onDrop: onDropImages});

    const onDropVideos = useCallback((acceptedFiles: File[]) => {
        setValue("videos", acceptedFiles);
    }, [setValue]);
    const {
        getRootProps: getRootPropsVideos,
        getInputProps: getInputPropsVideos
    } = useDropzone({onDrop: onDropVideos});

    const onSubmit = (data: FormData) => {
        const modifiedData = {
            ...data,
            sku: data.skuArray.map(item => item.value),
            tags: data.tagsArray.map(item => item.value)
        };
        mutate(modifiedData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
                <DialogTitle>Add Product</DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField {...register("productName")} label="Product Name" fullWidth
                                       style={{padding: "10px 0"}}/>
                            <TextField {...register("productType")} label="Product Type" fullWidth
                                       style={{padding: "10px 0"}}/>
                            <TextField {...register("productBrand")} label="Product Brand" fullWidth
                                       style={{padding: "10px 0"}}/>
                            <Controller
                                control={control}
                                name="productCategory"
                                defaultValue=""
                                render={({field}) => (
                                    <FormControl fullWidth variant="filled" style={{padding: "10px 0"}}>
                                        <InputLabel id="product-category-label">Product Category</InputLabel>
                                        <Select
                                            labelId="product-category-label"
                                            value={field.value}
                                            onChange={e => field.onChange(e.target.value)}
                                        >
                                            {categories.map(category =>
                                                <MenuItem key={category} value={category}>{category}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <TextField {...register("description")} label="Description" multiline fullWidth
                                       style={{padding: "10px 0"}}/>
                            <TextField {...register("shortDescription")} label="Short Description" fullWidth
                                       style={{padding: "10px 0"}}/>
                            <Controller
                                control={control}
                                name="currency"
                                defaultValue=""
                                render={({field}) => (
                                    <FormControl fullWidth variant="filled" style={{padding: "10px 0"}}>
                                        <InputLabel id="currency-label">Currency</InputLabel>
                                        <Select
                                            labelId="currency-label"
                                            value={field.value}
                                            onChange={e => field.onChange(e.target.value)}
                                        >
                                            {currencies.map(currency =>
                                                <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField {...register("price")} label="Price" fullWidth style={{padding: "10px 0"}}/>
                            <TextField {...register("discountedPrice")} label="Discounted Price" fullWidth
                                       style={{padding: "10px 0"}}/>
                            <TextField {...register("color")} label="Color" fullWidth style={{padding: "10px 0"}}/>
                            <TextField {...register("size")} label="Size" fullWidth style={{padding: "10px 0"}}/>
                            <TextField {...register("stockQuantity")} label="Stock Quantity" type="number" fullWidth
                                       style={{padding: "10px 0"}}/>
                            <Box mt={2}>
                                <FormControlLabel control={<Checkbox {...register("isNew")} defaultChecked/>}
                                                  label="New Product"/>
                                <FormControlLabel control={<Checkbox {...register("isTrending")} />}
                                                  label="Trending Product"/>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">SKU</Typography>
                            {skuFields.map((item, index) => (
                                <Grid container key={index} spacing={1}>
                                    <Grid item xs={11}>
                                        <TextField {...register(`skuArray.${index}.value` as const)} label="SKU"
                                                   fullWidth
                                                   defaultValue={item.value} style={{padding: "10px 0"}}/>
                                    </Grid>
                                    <Grid item xs={1} className="align-self-center" >
                                        <Button fullWidth onClick={() => removeSku(index)}>Remove</Button>
                                    </Grid>
                                </Grid>
                            ))}
                            <Button onClick={() => appendSku({value: ""})}>Add SKU</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Tags</Typography>
                            {tagFields.map((item, index) => (
                                <Grid container key={index} spacing={1}>
                                    <Grid item xs={10}>
                                        <TextField {...register(`tagsArray.${index}.value` as const)} label="Tags"
                                                   fullWidth
                                                   defaultValue={item.value} style={{padding: "10px 0"}}/>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button fullWidth onClick={() => removeTag(index)}>Remove</Button>
                                    </Grid>
                                </Grid>
                            ))}
                            <Button fullWidth onClick={() => appendTag({value: ""})}>Add Tag</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Images</Typography>
                            <div {...getRootPropsImages()} style={{
                                border: '1px solid #ddd',
                                padding: '10px',
                                textAlign: 'center'
                            }}>
                                <input {...getInputPropsImages()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Videos</Typography>
                            <div {...getRootPropsVideos()} style={{
                                border: '1px solid #ddd',
                                padding: '10px',
                                textAlign: 'center'
                            }}>
                                <input {...getInputPropsVideos()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register("source")} label="Source" fullWidth style={{padding: "10px"}}/>
                            <TextField {...register("sourceLink")} label="Source Link" fullWidth
                                       style={{padding: "10px"}}/>
                            <TextField {...register("review")} label="Review" fullWidth style={{padding: "10px"}}/>
                        </Grid>
                    </Grid>
                    {/*<Box mt={2}>*/}
                    {/*    */}
                    {/*</Box>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}
