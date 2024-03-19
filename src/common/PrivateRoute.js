import { Navigate } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
export default function PrivateRoute(props) {
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  console.log("Được vào trang admin: ", isLoggedIn);
  return isLoggedIn ? <AdminPage /> : <Navigate to="/login" />;
}