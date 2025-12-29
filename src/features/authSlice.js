import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/auth.js";

const initialState = {
  token: localStorage.getItem("accessToken") || null,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        state.user = action.payload;
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(authApi.endpoints.getMe.matchRejected, (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("accessToken");
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
