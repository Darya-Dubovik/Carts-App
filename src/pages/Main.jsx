import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading, setProducts } from "../features/productsSlice";
import { Alert, Box } from "@mui/material";
import { getProducts } from "../services/api";
import { LogoutButton } from "../components/LogoutButton";
import { ProductCard } from "../components/ProductCard";

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProductsWrapper() {
      try {
        const data = await getProducts();
        dispatch(setProducts(data.products));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      }
    }

    dispatch(setLoading(true));
    if (products.length === 0) {
      getProductsWrapper();
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const {
    list: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  if (loading) {
    return <Alert severity="info">Загрузка товаров...</Alert>;
  }

  if (error) {
    return <Alert severity="error">Ошибка: {error}</Alert>;
  }

  if (products.length === 0) {
    return <Alert severity="warning">Список товаров пуст</Alert>;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        <LogoutButton
          sx={{
            position: "absolute",
            top: 26,
            right: 16,
            zIndex: 10,
          }}
        />
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </div>
  );
}

export default Main;
