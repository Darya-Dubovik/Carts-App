import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice.js";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, TextField } from "@mui/material";

export function Login() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

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

    if (userLogin === user.login && userPassword === user.password) {
      navigate("/main");
      dispatch(login());
    } else if (userLogin === "" && userPassword === "") {
      setInfoMessage("Введите данные пользователя");
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
