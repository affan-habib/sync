import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { useDispatch } from "react-redux";
import productsReducer from './features/products/productsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Here's the custom hook
export default store;
