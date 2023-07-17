import {useQuery} from 'react-query';
import {fetchProducts} from '../features/products/productsAPI';
import {ProductType} from "../types";


interface MetaData {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string,
        label: string,
        active: boolean
    }[];
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

interface ProductResponse {
    data: ProductType[];
    meta: MetaData;
    links: Links;
}

export const useProductsQuery = (page: number, rowsPerPage: number, searchTerm: string) => {
    return useQuery<ProductResponse, Error>(['products', page, rowsPerPage, searchTerm], () => fetchProducts(page, rowsPerPage, searchTerm), {
        keepPreviousData: true,
    });
};
