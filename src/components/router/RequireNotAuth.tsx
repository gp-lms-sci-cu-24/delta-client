import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserPayload } from "../../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import ROUTES from "@/constants/routes";

export interface RequireNotAuthProps {
  to?: string;
  replace?: boolean;
}

const RequireNotAuth: FunctionComponent<RequireNotAuthProps> = ({
  to = ROUTES.HOME,
  replace = true,
}) => {
  const user = useSelector(selectCurrentUserPayload);

  return user ? <Navigate to={to} replace={replace} /> : <Outlet />;
};

export default RequireNotAuth;
