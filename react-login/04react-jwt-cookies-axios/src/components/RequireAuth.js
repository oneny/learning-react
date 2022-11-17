import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(allowedRoles);

  // RequireAuth component can protect all the child components that are nested inside of it. 
  return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet /> // this one represents any child components of RequireAuth
      : auth?.user 
        ? <Navigate to="/unauthorized" state={{ from: location }} replace /> // user는 있는데 해당하는 roles가 없는 경우
        : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth;