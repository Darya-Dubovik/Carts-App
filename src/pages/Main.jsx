import React from "react";
import { Alert, Box } from "@mui/material";
import { LogoutButton } from "../components/LogoutButton";
import { ProductCard } from "../components/ProductCard";
import { useGetProductsQuery } from "../services/products.js";

function Main() {
  const {
    data: products,
    isLoading,
    error,
    refetch: refetchProducts,
  } = useGetProductsQuery();

  if (isLoading) {
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
