import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  // products: productsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
