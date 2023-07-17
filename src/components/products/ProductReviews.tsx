import { Card, CardHeader, List, ListItem, ListItemText, Rating } from '@mui/material';
import {ProductType} from "../../types";
import React from "react";

interface ProductReviewsProps {
    product: ProductType;
}
export const ProductReviews: React.FC<ProductReviewsProps> = ({product}) => {
    // TODO: implement this

    return <></>;

    // if (!product || !product.reviews || product.reviews.length === 0) {
    //     return null;
    // }

    // return (
    //     <Card>
    //         <CardHeader title="Product Reviews"/>
    //         <List>
    //             {product.reviews.map((review, index) => (
    //                 <ListItem key={index}>
    //                     <ListItemText
    //                         primary={<Rating value={review.rating} readOnly />}
    //                         secondary={review.comment}
    //                     />
    //                 </ListItem>
    //             ))}
    //         </List>
    //     </Card>
    // );
};
