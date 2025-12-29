import React from "react";
import { CardMedia } from "@mui/material";
import ImagePlaceholder from "../assets/Image_placeholder.svg";

export function FallbackImage({ src, alt, ...props }) {
  return (
    <CardMedia
      component="img"
      image={src}
      alt={alt}
      onError={(event) => {
        event.target.onerror = null;
        event.target.src = ImagePlaceholder;
      }}
      {...props}
    />
  );
}
