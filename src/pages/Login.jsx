import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice.js";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert, Box, Button, TextField } from "@mui/material";
import { validateLoginForm } from "../utils/validateLoginForm.js";

export function Login() {
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    console.log(isAuth);
    if (isAuth) {
      navigate("/main", { replace: true });
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (!infoMessage && !warningMessage) return;

    const timer = setTimeout(() => {
      setInfoMessage("");
      setWarningMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [infoMessage, warningMessage]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (!userLogin && !userPassword) {
      setInfoMessage("Введите данные пользователя");
      setLoginError("");
      setPasswordError("");
      return;
    }

    const isValid = validateLoginForm({
      login: userLogin,
      password: userPassword,
      setLoginError,
      setPasswordError,
    });

    if (!isValid) {
      setInfoMessage("Пожалуйста, исправьте ошибки в форме");
      return;
    }

    if (userLogin === user.login && userPassword === user.password) {
      dispatch(login());
      navigate("/main");
    } else {
      setWarningMessage("Пользователь не найден");
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
      {infoMessage ? <Alert severity="info">{infoMessage}</Alert> : null}
      {warningMessage ? (
        <Alert severity="warning">{warningMessage}</Alert>
      ) : null}
      <form onSubmit={handleLogin}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}
        >
          <TextField
            onChange={(event) => setUserLogin(event.target.value)}
            value={userLogin}
            label="Login"
            variant="outlined"
            id="login"
            fullWidth
            error={!!loginError}
            helperText={loginError}
            autoComplete="username"
          />

          <TextField
            onChange={(event) => setUserPassword(event.target.value)}
            value={userPassword}
            label="Password"
            type="password"
            variant="outlined"
            id="password"
            fullWidth
            error={!!passwordError}
            helperText={passwordError}
            autoComplete="current-password"
          />

          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
