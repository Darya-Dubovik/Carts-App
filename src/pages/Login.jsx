import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice.js"; // путь поправь если нужен
import { useNavigate } from "react-router-dom";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login({ name: "User" })); // авторизуемся
    navigate("/main"); // переходим на главную
  };

  return (
    <div>
      <h1>Log in</h1>
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}
