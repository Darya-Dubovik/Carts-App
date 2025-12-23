import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { FallbackImage } from "../components/FallbackImage";
import { LogoutButton } from "../components/LogoutButton";

function Product() {
  const { id } = useParams();
  const productId = Number(id);
  const isNaNProduct = isNaN(productId);

  if (isNaNProduct) {
    return <Navigate to="/Page404" replace />;
  }

  const product = useSelector((state) =>
    state.products.list.find((p) => p.id === productId)
  );

  if (!product) {
    return (
      <>
        <Alert severity="warning">Товар не найден</Alert>
        <Button
          component={Link}
          to={"/main"}
          variant="contained"
          size="small"
          sx={{
            position: "absolute",
            top: 86,
            left: 16,
            zIndex: 10,
          }}
        >
          Вернуться назад
        </Button>

        <LogoutButton
          sx={{
            position: "absolute",
            top: 26,
            right: 16,
            zIndex: 10,
          }}
        />
      </>
    );
  }

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

        <LogoutButton
          sx={{
            position: "absolute",
            top: 26,
            right: 16,
            zIndex: 10,
          }}
        />

        <Card
          variant="outline"
          sx={{
            width: 700,
            maxHeight: "90vh",
            display: "flex",
            gap: 5,
          }}
        >
          <FallbackImage
            src={product.thumbnail}
            alt={product.title}
            sx={{
              width: "100%",
              objectFit: "contain",
            }}
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

export default Product;
