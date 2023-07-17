import {Card, Box, Button} from '@mui/material';
import {ProductType} from '../../types';
import React from "react";

interface ProductVideoProps {
    product: ProductType;
}

export const ProductVideo: React.FC<ProductVideoProps> = ({product}) => {
    const productVideo = product.video || null;

    if (!productVideo) {
        return null;
    }

    return (
        <Card>
            <Box p={3} textAlign="center">
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => window.open(productVideo, '_blank')}
                    style={{textTransform: 'uppercase'}}
                >
                    View Product Video
                </Button>
            </Box>
        </Card>
    );
};
