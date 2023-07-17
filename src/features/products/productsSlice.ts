import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ProductType } from '../../types';

interface ProductsState {
    products: ProductType[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        getProductsSuccess(state, action: PayloadAction<ProductType[]>) {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },
        getProductsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure
} = productsSlice.actions;

export default productsSlice.reducer;