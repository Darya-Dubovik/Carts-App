import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import productsReducer from "./features/productsSlice.js";
import { authApi } from "./services/auth.js";
import { productsApi } from "./services/products.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productsApi.middleware),
});
