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
import AddLocation from "./features/Admin/location/AddLocation";
import UpdateLocation from "./features/Admin/location/UpdateLocation";
import Locations from "./features/Admin/location/Location";
import AllStudent from "./features/Admin/student/AllStudent";
import AddStudent from "./features/Admin/student/AddStudent";
import AllProfessors from "./features/Admin/professor/AllProfessors";
import AddProfessor from "./features/Admin/professor/AddProfessor";
import Professor from "./features/Admin/professor/Professor";
import EditProfessor from "./features/Admin/professor/EditProfessor";
import UpdateStudent from "./features/Admin/student/UpdateStudent";
import Announcement from "./features/Admin/announcement/Announcement";
import SendAnnouncement from "./features/Admin/announcement/SendAnnouncement";
import CourseClass from "./features/Admin/courseClass/CourseClass";
import AddCourseClass from "./features/Admin/courseClass/AddCourseClass";

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
          <Route path="admin/courses/add" element={<AddCourse />} />
          <Route path="admin/courses/update/:code" element={<EditCourse />} />
          <Route path="admin/departments" element={<Departments />} />
          <Route path="admin/departments/add" element={<AddDepartment />} />
          <Route
            path="admin/departments/update/:code"
            element={<UpdateDepartment />}
          />
           <Route path="admin/locations" element={<Locations />} />
            <Route path="admin/locations/add" element={<AddLocation />} />
            <Route
              path="admin/locations/update/:id"
              element={<UpdateLocation />}
            />
             <Route path="admin/students" element={<AllStudent />} />
            <Route path="admin/students/add" element={<AddStudent />} />
            <Route
              path="admin/students/update/:studentCode"
              element={<UpdateStudent />}
            />
            {/** professor */}
            <Route path="admin/professors" element={<AllProfessors />} />
            <Route path="admin/professors/add" element={<AddProfessor />} />
            <Route path="admin/professors/:id" element={<Professor />} />
            <Route
              path="admin/professors/update/:userName"
              element={<EditProfessor />}
            />
             <Route path="admin/announcements" element={<Announcement />} />
            <Route path="admin/announcements/add" element={<SendAnnouncement />} />
            <Route path="admin/classes" element={<CourseClass />} />
            <Route path="admin/classes/add" element={<AddCourseClass />} />
        </Route>

        {/** 404 page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
