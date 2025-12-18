import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { Product } from "./pages/Product";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/main" element={<Main />} />
        <Route path="/product/:id" element={<Product />} />
      </Route>
    </Routes>
  );
}
