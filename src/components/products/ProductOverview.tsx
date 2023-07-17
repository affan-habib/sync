import { FC } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import { ProductType } from '../../types';

interface ProductOverviewProps {
    product: ProductType;
}

export const ProductOverview: FC<ProductOverviewProps> = ({ product }) => {
    if (!product) {
        return null;
    }

    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={product.image || 'https://source.unsplash.com/random'}
                alt={product.name}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="subtitle1" sx={{ pb: 2 }}>
                        {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 0.5 } }}>
                        {product.tags.map((tag, index) => (
                            <Chip key={index} label={tag} />
                        ))}
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};
