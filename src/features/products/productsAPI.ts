import axios from 'axios';
import { Product } from '../../types';
import { apiBaseUrl } from '../../config';

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<{ data: Product[] }>(`${apiBaseUrl}/products`);
    return response.data.data;
};
