// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
//   user: { login: "user1", password: "1234" },
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state) => {
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       //state.user = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;

// export default authSlice.reducer;

// features/auth/authSlice.js
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
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    // Обработка состояния login запроса
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
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }
    );
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
