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
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(navigate);

  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // useEffect(() => {
  //   if (isAuth) {
  //     navigate("/main", { replace: true });
  //   }
  // }, [isAuth, navigate]);

  useEffect(() => {
    if (!infoMessage && !warningMessage) return;

    const timer = setTimeout(() => {
      setInfoMessage("");
      setWarningMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [infoMessage, warningMessage]);

  useEffect(() => {
    if (isSuccess) {
      console.log("Авторизация успешна, выполняю редирект...");

      // Вариант 1: Простой редирект
      navigate("/main");

      // Вариант 2: Редирект с заменой истории
      // navigate('/main', { replace: true });

      // Вариант 3: Редирект с задержкой (если нужно показать сообщение)
      // setTimeout(() => {
      //   navigate('/main');
      // }, 1000);
    }
  }, [isSuccess, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!userLogin && !userPassword) {
      setInfoMessage("Введите данные пользователя");
      setLoginError("");
      setPasswordError("");
      return;
    }

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
    if (userLogin && userPassword) {
      try {
        const result = await login({
          username: userLogin,
          password: userPassword,
        }).unwrap();
        console.log(result);
        //dispatch(login());
        //navigate("/main");
      } catch (err) {
        console.error("Ошибка входа:", err);
      }
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
      {error ? <Alert severity="warning">Пользователь не найден"</Alert> : null}
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
