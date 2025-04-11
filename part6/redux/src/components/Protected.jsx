import { Outlet, Navigate } from "react-router-dom";

const Protected = () => {
  // const isAuthenticated = localStorage.getItem("token");
  return <Outlet />
  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
