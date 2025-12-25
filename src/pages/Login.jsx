import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice.js";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert, Box, Button, TextField } from "@mui/material";
import { validateLoginForm } from "../utils/validateLoginForm.js";
import { useLoginMutation } from "../services/auth.js";

export function Login() {
  //const user = useSelector((state) => state.auth.user);
  //const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [login, { isLoading, error }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  //const [infoMessage, setInfoMessage] = useState("");
  //const [warningMessage, setWarningMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      navigate("/main", { replace: true });
    }
  }, []);

  // useEffect(() => {
  //   if (!infoMessage && !warningMessage) return;

  //   const timer = setTimeout(() => {
  //     setInfoMessage("");
  //     setWarningMessage("");
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [infoMessage, warningMessage]);

  const handleLogin = async (event) => {
    event.preventDefault();

    // if (!userLogin || !userPassword) {
    //   setInfoMessage("Введите данные пользователя");
    //   setLoginError("");
    //   setPasswordError("");
    //   return;
    // }

    // console.log(userLogin);
    // console.log(userPassword);
    const isValid = validateLoginForm({
      login: userLogin,
      password: userPassword,
      setLoginError,
      setPasswordError,
    });

    // console.log(isValid);

    // if (!isValid) {
    //   setInfoMessage("Пожалуйста, исправьте ошибки в форме");
    //   return;
    // }

    // console.log(user.login);
    // console.log(user.password);

    //if (userLogin === user.login && userPassword === user.password) {
    if (isValid) {
      try {
        const result = await login({
          username: userLogin,
          password: userPassword,
        }).unwrap();
        console.log(result);
        //dispatch(login());
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
      {/* {infoMessage ? <Alert severity="info">{infoMessage}</Alert> : null} */}
      {error ? <Alert severity="warning">Пользователь не найден</Alert> : null}
      <form onSubmit={handleLogin}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}
        >
          <TextField
            disabled={isLoading}
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
            disabled={isLoading}
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
