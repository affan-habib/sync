import { useQuery } from 'react-query';
import { fetchProducts } from '../features/products/productsAPI';

export const useProductsQuery = () => {
    return useQuery('products', fetchProducts);
};
