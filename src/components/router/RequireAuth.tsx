import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserPayload } from "../../features/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Role } from "../../features/auth/types";
import NotFound from "@components/NotFound";
import ROUTES from "@/constants/routes";

export interface RequireAuthProps {
  to?: string;
  replace?: boolean;
  anyRole?: Role[];
  allRoles?: Role[];
  unAuthorized?: JSX.Element;
}

const RequireAuth: FunctionComponent<RequireAuthProps> = ({
  to = ROUTES.AUTH_LOGIN,
  unAuthorized = <NotFound home={ROUTES.HOME} />,
  replace = true,
  anyRole,
  allRoles,
}) => {
  const user = useSelector(selectCurrentUserPayload);
  const location = useLocation();

  let hasAccess: boolean = true;

  if (anyRole) {
    hasAccess &&= anyRole.some((role) => user?.roles.includes(role));
  }

  if (allRoles) {
    hasAccess &&= allRoles.every((role) => user?.roles.includes(role));
  }

  return !user ? (
    <Navigate to={to} state={{ from: location }} replace={replace} />
  ) : !hasAccess ? (
    unAuthorized
  ) : (
    <Outlet />
  );
};

export default RequireAuth;
