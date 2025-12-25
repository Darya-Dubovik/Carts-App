import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS, API_URL } from "../constants/api.js";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.authLogin,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...credentials,
        }),
      }),
      transformResponse: (response) => {
        localStorage.setItem("accessToken", response.accessToken);
        return response;
      },
      invalidatesTags: ["Auth"],
    }),

    getMe: builder.query({
      query: () => API_ENDPOINTS.authMe,
      providesTags: ["Auth"],
      transformErrorResponse: (response) => {
        localStorage.removeItem("accessToken");
        return response;
      },
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
