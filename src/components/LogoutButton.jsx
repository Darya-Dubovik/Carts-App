import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { clearProducts } from "../features/productsSlice";

export function LogoutButton({ sx }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProducts());
    navigate("/", { replace: true });
  };

  return (
    <Button onClick={handleLogout} variant="contained" size="small" sx={sx}>
      Выйти
    </Button>
  );
}
