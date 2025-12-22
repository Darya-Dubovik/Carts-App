import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { FallbackImage } from "./FallbackImage";

export function ProductCard({ product }) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
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
  );
}
