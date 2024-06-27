import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "@components/NotFound";
import { LoadingLayout, RequireNotAuth } from "@components/router";
import { useAuthHealthMutation } from "@features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import LocalStorageService from "@services/storage";
import { setCredentials } from "@features/auth/authSlice";
import SignInPage from "@features/auth/pages/SignInPage";
import ForgotPasswordPage from "@features/auth/pages/ForgotPasswordPage";
import MainLayout from "@layouts/MainLayout";
import AddCourse from "./features/Admin/MangeCourse/AddCourse";
import Courses from "./features/Admin/MangeCourse/Courses";
import EditCourse from "./features/Admin/MangeCourse/EditCourse";
import Departments from "./features/Admin/departments/Departments";
import AddDepartment from "./features/Admin/departments/AddDepartments";
import UpdateDepartment from "./features/Admin/departments/UpdateDepartment";

export default function AppRoutes() {
  const [checkHealth, authHealth] = useAuthHealthMutation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = LocalStorageService.getItem("AUTH_TOKEN_STATE");
    if (token) {
      dispatch(setCredentials(token));
    }

    checkHealth();
    setLoading(false);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoadingLayout
            loading={authHealth.isLoading || loading}
            enableProgress
          />
        }
      >
        <Route
          index
          element={
            <Navigate to={authHealth.data ? "/app/dashboard" : "/auth/login"} />
          }
        />

        {/** Not Authed user Stack */}
        <Route path="/auth" element={<RequireNotAuth />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>
        <Route path="/app" element={<MainLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<p>test</p>} />
        <Route path="admin/courses" element={<Courses />} />
            <Route path="admin/course/add" element={<AddCourse />} />
            <Route path="admin/course/update/:code" element={<EditCourse />} />
            <Route path="admin/departments" element={<Departments />} />
            <Route path="admin/department/add" element={<AddDepartment />} />
            <Route
              path="admin/department/update/:code"
              element={<UpdateDepartment />}
            />
        </Route>

        {/** 404 page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
