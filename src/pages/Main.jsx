import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box } from "@mui/material";
import { LogoutButton } from "../components/LogoutButton";
import { ProductCard } from "../components/ProductCard";
import { loadProducts } from "../utils/fetchProducts.js";

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadProducts(dispatch, products);
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
