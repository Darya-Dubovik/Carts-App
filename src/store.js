import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import productsReducer from "./features/productsSlice.js";
import { authApi } from "./services/auth.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
