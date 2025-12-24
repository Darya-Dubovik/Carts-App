import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Page404 } from "./pages/Page404";
const LazyMain = React.lazy(() => import("./pages/Main"));
const LazyProduct = React.lazy(() => import("./pages/Product"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* <Route element={<ProtectedRoute />}> */}
      <Route
        path="/main"
        element={
          <React.Suspense>
            <LazyMain />
          </React.Suspense>
        }
      />
      <Route
        path="/product/:id"
        element={
          <React.Suspense>
            <LazyProduct />
          </React.Suspense>
        }
      />
      {/* </Route> */}
      <Route path="/Page404" element={<Page404 />} />
    </Routes>
  );
}
