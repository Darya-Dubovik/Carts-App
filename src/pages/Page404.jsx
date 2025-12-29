import React from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Page404() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h1" sx={{ fontSize: "80px", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Страница не найдена
      </Typography>
      <Button component={Link} to="/main" variant="contained">
        Вернуться на главную
      </Button>
    </div>
  );
}
