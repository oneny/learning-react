import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode  from "jwt-decode";

function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth);

  const decoded = auth?.accessToken
    ? jwt_decode(auth.accessToken)
    : undefined;

  const roles = decoded?.UserInfo?.roles || [];

  // RequireAuth component can protect all the child components that are nested inside of it. 
  return (
    roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet /> // this one represents any child components of RequireAuth
      : auth?.accessToken
        ? <Navigate to="/unauthorized" state={{ from: location }} replace /> // user는 있는데 해당하는 roles가 없는 경우
        : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth;