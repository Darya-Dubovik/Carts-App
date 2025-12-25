import * as React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "../services/auth";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useGetMeQuery();

  useEffect(() => {
    if (userError) {
      navigate("/"), { replace: true };
    }
  }, [userError, navigate]);

  // if (!isAuth) {
  //   return <Navigate to="/" replace />;
  // }
  return <Outlet />;
}
