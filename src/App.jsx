import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
// import { Main } from "./pages/Main";
// import { Product } from "./pages/Product";
import ProtectedRoute from "./routes/ProtectedRoute";
const LazyMain = React.lazy(() => import("./pages/Main"));
const LazyProduct = React.lazy(() => import("./pages/Product"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/main"
          element={
            <React.Suspense fallback="Loading...">
              <LazyMain />
            </React.Suspense>
          }
        />
        <Route
          path="/product/:id"
          element={
            <React.Suspense fallback="Loading...">
              <LazyProduct />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
