import React from "react";
import { Navigate } from "react-router-dom";

const OwnerProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "owner") {
    return <Navigate to="/verification" replace />;
  }

  return children;
};

export default OwnerProtectedRoute;
