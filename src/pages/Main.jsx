import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../features/productsSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Products_URL } from "../constants/api";

export function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(Products_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(setProducts(data.products));
      })
      .catch((error) => {
        console.error("Ошибка загрузки товаров:", error);
      });
  }, [dispatch]);

  const products = useSelector((state) => state.products.list);

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
