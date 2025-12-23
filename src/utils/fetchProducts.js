import {
  setError,
  setLoading,
  setProducts,
} from "../features/productsSlice.js";
import { getProducts } from "../services/api.js";

export async function loadProducts(dispatch, products) {
  dispatch(setLoading(true));

  if (products.length !== 0) {
    dispatch(setLoading(false));
    return;
  }

  try {
    const data = await getProducts();
    dispatch(setProducts(data.products));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
}
