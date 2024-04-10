import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RedirectIfAuthenticated({ children }) {
  const isAuth = Boolean(useSelector((state) => state.token));
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return children;
}
