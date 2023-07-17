import axios from 'axios';
import { ProductType } from '../../types';
import { apiBaseUrl } from '../../config';

interface MetaData {
    current_page: number;
    from: number;
    last_page: number;
    links: { url: string, label: string, active: boolean }[];
    per_page: number;
    to: number;
    total: number;
}

interface Links {
    first: string;
    last: string;
    prev: string;
    next: string;
}

interface ProductsResponse {
    data: ProductType[];
    meta: MetaData;
    links: Links;
}

export const fetchProducts = async (page: number, rowsPerPage: number, searchTerm: string): Promise<ProductsResponse> => {
    const response = await axios.get<ProductsResponse>(`${apiBaseUrl}/products?page=${page}&perPage=${rowsPerPage}&search=${encodeURIComponent(searchTerm)}`);
    return response.data;
};

