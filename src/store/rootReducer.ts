import { combineReducers } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";

const rootReducer = combineReducers({
  products: productsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
