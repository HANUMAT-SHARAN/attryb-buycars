import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { errorAlert } from "../Components/Reusable";

const PrivateRoute = ({ children }) => {
  const { auth } = useSelector((store) => store.auth);
  if (!auth) {
    errorAlert("Login Now To add New Deals");
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
