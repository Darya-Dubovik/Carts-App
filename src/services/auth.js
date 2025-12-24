// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS, API_URL } from "../constants/api.js";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // credentials: "include", // Включаем cookies
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token; // Получаем токен из состояния
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    // Логин
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.authLogin,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...credentials,
          expiresInMins: 60, // Опционально
        }),
      }),
      transformResponse: (response) => {
        // Сохраняем токен при успешном логине
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        return response;
      },
      invalidatesTags: ["Auth"],
    }),
    // Получение данных текущего пользователя
    getMe: builder.query({
      query: () => API_ENDPOINTS.authMe,
      providesTags: ["Auth"],
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: API_ENDPOINTS.authRefresh,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken,
          expiresInMins: 30,
        }),
      }),
    }),
    // logout: builder.mutation({
    //   query: () => ({
    //     url: "auth/logout", // если эндпоинт существует
    //     method: "POST",
    //   }),
    //   transformResponse: () => {
    //     // Очищаем хранилище
    //     localStorage.removeItem("accessToken");
    //     localStorage.removeItem("refreshToken");
    //     return { success: true };
    //   },
    //   invalidatesTags: ["Auth"],
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useGetMeQuery, useRefreshTokenMutation } =
  authApi;
