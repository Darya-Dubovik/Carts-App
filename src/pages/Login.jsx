import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, TextField } from "@mui/material";
import { validateLoginForm } from "../utils/validateLoginForm.js";
import { useLoginMutation } from "../services/auth.js";

export function Login() {
  const [login, { isLoading, error }] = useLoginMutation();

  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      navigate("/main", { replace: true });
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const isValid = validateLoginForm({
      login: userLogin,
      password: userPassword,
      setLoginError,
      setPasswordError,
    });

    if (isValid) {
      try {
        const result = await login({
          username: userLogin,
          password: userPassword,
        }).unwrap();
        console.log(result);
        navigate("/main", { replace: true });
      } catch (err) {
        console.error("Ошибка входа:", err);
      }
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
      {error ? <Alert severity="warning">Пользователь не найден</Alert> : null}
      <form onSubmit={handleLogin}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}
        >
          <TextField
            disabled={isLoading}
            onChange={(event) => setUserLogin(event.target.value)}
            value={userLogin}
            label="Логин"
            variant="outlined"
            id="login"
            fullWidth
            error={!!loginError}
            helperText={loginError}
            autoComplete="username"
          />

          <TextField
            disabled={isLoading}
            onChange={(event) => setUserPassword(event.target.value)}
            value={userPassword}
            label="Пароль"
            type="password"
            variant="outlined"
            id="password"
            fullWidth
            error={!!passwordError}
            helperText={passwordError}
            autoComplete="current-password"
          />

          <Button
            disabled={isLoading}
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            {isLoading ? "Waiting..." : "Login"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
