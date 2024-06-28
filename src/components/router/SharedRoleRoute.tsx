import { selectCurrentUserPayload } from "@features/auth/authSlice";
import { Role } from "@features/auth/types";
import { useSelector } from "react-redux";
import ErrorPage from "@components/ErrorPage";

export interface ISharedRoleRouteProps {
  admin?: JSX.Element;
  professor?: JSX.Element;
  student?: JSX.Element;
  defaultView?: JSX.Element;
  error?: JSX.Element;
}

export default function SharedRoleRoute({
  admin,
  professor,
  student,
  defaultView = <ErrorPage />,
  error = <ErrorPage />,
}: ISharedRoleRouteProps) {
  const currentUser = useSelector(selectCurrentUserPayload);

  const isStudent = currentUser?.roles.includes(Role.STUDENT);
  const isAdmin = currentUser?.roles.includes(Role.ADMIN);
  const isProfessor = currentUser?.roles.includes(Role.PROFESSOR);

  const adminComponent = admin || defaultView;
  const professorComponent = professor || defaultView;
  const studentComponent = student || defaultView;

  if (isAdmin) return adminComponent;
  else if (isStudent) return studentComponent;
  else if (isProfessor) return professorComponent;
  else return error;
}
