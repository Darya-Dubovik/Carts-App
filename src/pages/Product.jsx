import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export function Product() {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.list.find((p) => p.id === Number(id))
  );

  if (!product) return <p>Товар не найден</p>;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          component={Link}
          to={"/main"}
          variant="contained"
          size="small"
          sx={{
            position: "absolute",
            top: 26,
            left: 16,
            zIndex: 10,
          }}
        >
          Вернуться назад
        </Button>

        <Card
          variant="outline"
          sx={{
            width: 700,
            maxHeight: "90vh",
            display: "flex",
            gap: 5,
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
                mb: 5,
              }}
            >
              ${product.price}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: "1.2rem",
              }}
            >
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
