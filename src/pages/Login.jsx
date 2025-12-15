import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice.js";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

export function Login() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (userLogin === user.login && userPassword === user.password) {
      navigate("/main");
      dispatch(login());
    } else if (userLogin === "" && userPassword === "") {
      alert("Введите данные пользователя");
    } else {
      alert("Пользователь не найден");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        height: "100vh",
      }}
    >
      <form onSubmit={handleLogin}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}
        >
          <TextField
            onChange={(event) => setUserLogin(event.target.value)}
            label="Login"
            variant="outlined"
            id="login"
            fullWidth
          />

          <TextField
            onChange={(event) => setUserPassword(event.target.value)}
            label="Password"
            type="password"
            variant="outlined"
            id="password"
            fullWidth
          />

          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
