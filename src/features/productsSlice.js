import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload; //«Возьми текущий список продуктов и замени его на то, что пришло в payload» action = dispatch(setProducts(data.products))
    },
  },
});

export const { setProducts } = productsSlice.actions; // Это объект со всеми action creator’ами, которые описаны в reducers. Деструктуризация
export default productsSlice.reducer; // Это ОДНА функция — reducer всего slice.
