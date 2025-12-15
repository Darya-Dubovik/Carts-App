import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { Product } from "./pages/Product";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./features/productsSlice";

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
