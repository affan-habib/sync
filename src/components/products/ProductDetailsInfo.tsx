import { Card, CardHeader, Grid, Typography, Box, Button } from "@mui/material";
import { Product } from '../../types';
import React from "react";

interface ProductDetailsInfoProps {
    product: Product;
}

export const ProductDetailsInfo: React.FC<ProductDetailsInfoProps> = ({ product }) => {

    if (!product) {
        return null;
    }

    return (
        <Card>
            <CardHeader title="Product Details" />
            <Box p={3}>
                <Grid container spacing={3}>
                    {product.SKUs && (
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2">
                                <strong>SKUs:</strong> {product.SKUs.join(", ")}
                            </Typography>
                        </Grid>
                    )}
                    {product.category && (
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2">
                                <strong>Category:</strong> {product.category}
                            </Typography>
                        </Grid>
                    )}
                    {product.quantity !== null && product.quantity !== undefined && (
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2">
                                <strong>Quantity:</strong> {product.quantity}
                            </Typography>
                        </Grid>
                    )}
                    {product.color && (
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2">
                                <strong>Color:</strong> {product.color}
                            </Typography>
                        </Grid>
                    )}
                    {product.size && (
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2">
                                <strong>Size:</strong> {product.size}
                            </Typography>
                        </Grid>
                    )}
                    {product.vendor && (
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2">
                                <strong>Vendor:</strong> {product.vendor}
                            </Typography>
                        </Grid>
                    )}
                    {product.price && product.currency && (
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2">
                                <strong>Price:</strong>{" "}
                                {`${parseFloat(product.price).toFixed(2)} ${product.currency}`}
                            </Typography>
                        </Grid>
                    )}

                    {product.isActive !== null && product.isActive !== undefined && (
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2">
                                <strong>Active:</strong> {product.isActive ? "Yes" : "No"}
                            </Typography>
                        </Grid>
                    )}
                    {product.description && (
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                <strong>Description:</strong> {product.description}
                            </Typography>{" "}
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Card>
    );
};
