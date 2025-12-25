import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box } from "@mui/material";
import { LogoutButton } from "../components/LogoutButton";
import { ProductCard } from "../components/ProductCard";
//import { loadProducts } from "../utils/fetchProducts.js";
//import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../services/auth.js";
import { useGetProductsQuery } from "../services/products.js";

function Main() {
  //const navigate = useNavigate();

  // Получаем товары
  const {
    data: products,
    isLoading,
    error,
    refetch: refetchProducts,
  } = useGetProductsQuery();

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");

  //   if (!token) {
  //     console.log("Нет токена, редирект на /");
  //     navigate("/", { replace: true });
  //     return;
  //   }

  //   if (error && error.status === 401) {
  //     console.log("Токен недействителен, редирект на /");
  //     localStorage.removeItem("accessToken");
  //     navigate("/", { replace: true });
  //   }
  // }, [error, navigate]);
  //const [logout] = useLogoutMutation();

  // const handleLogout = async () => {
  //   try {
  //     await logout().unwrap();
  //   } catch (err) {
  //     console.error('Ошибка выхода:', err);
  //   }
  // };

  // if (isLoading) return <Alert severity="info">Загрузка товаров...</Alert>;
  // if (error) return <Alert severity="error">Ошибка: {error}</Alert>;

  // if (user) {
  //   loadProducts;
  // }
  //const dispatch = useDispatch();

  // useEffect(() => {
  //   loadProducts(dispatch, products);
  // }, [dispatch]);

  // const {
  //   list: products,
  //   loading,
  //   error,
  // } = useSelector((state) => state.products);

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
