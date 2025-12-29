import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearProducts: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setProducts, setLoading, setError, clearProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
