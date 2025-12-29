import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
      navigate("/", { replace: true });
    }
  }, [userError, navigate]);

  return <Outlet />;
}
