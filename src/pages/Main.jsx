import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProducts,
  setError,
  setLoading,
  setProducts,
} from "../features/productsSlice";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { logout } from "../features/authSlice";
import { getProducts } from "../services/api";

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // const products = useSelector((state) => state.products.list);

  const {
    list: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  console.log(products);
  // const productsState = useSelector((state) => state.products);
  // const products = productsState.list;
  // const loading = productsState.loading;
  // const error = productsState.error;

  // if (products.length === 0) {
  //   return <Alert severity="info">Список товаров пуст</Alert>; //Проверить
  // }

  if (loading) {
    return <Alert severity="info">Загрузка товаров...</Alert>;
  }

  if (error) {
    return <Alert severity="error">Ошибка: {error}</Alert>;
  }

  if (products.length === 0) {
    return <Alert severity="warning">Список товаров пуст</Alert>;
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProducts());
    navigate("/");
  };

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
        <Button
          onClick={handleLogout}
          variant="contained"
          size="small"
          sx={{
            position: "absolute",
            top: 26,
            right: 16,
            zIndex: 10,
          }}
        >
          Выйти
        </Button>
        {products.map((product) => (
          <div key={product.id}>
            <Card
              variant="outline"
              sx={{
                width: 345,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  objectFit: "contain",
                }}
                image={product.thumbnail}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "1.7rem",
                    fontWeight: 500,
                    mb: 1.5,
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: "1.2rem",
                    fontStyle: "italic",
                    mb: 1.5,
                  }}
                >
                  {product.category}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontSize: "1.1rem",
                  }}
                >
                  ${product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/product/${product.id}`}
                  variant="contained"
                  size="small"
                >
                  Подробнее
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </Box>
    </div>
  );
}

export default Main;
