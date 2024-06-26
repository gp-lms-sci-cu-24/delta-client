import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import { LoadingLayout, RequireNotAuth } from "./components/router";
import { useAuthHealthMutation } from "./features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import LocalStorageService from "./services/storage";
import { setCredentials } from "./features/auth/authSlice";
import SignInPage from "./features/auth/pages/SignInPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";

export default function AppRoutes() {
  const [checkHealth, authHealth] = useAuthHealthMutation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = LocalStorageService.getItem("AUTH_TOKEN_STATE");
    if (token) {
      dispatch(setCredentials(token));
    }
    console.log("Checking health");
    console.log(token);

    checkHealth();
    setLoading(false);
  }, []);

  console.log(authHealth);

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

        {/** 404 page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
