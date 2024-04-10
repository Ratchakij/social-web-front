import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = Boolean(useSelector((state) => state.token));
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
}
