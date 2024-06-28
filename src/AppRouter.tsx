import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "@components/NotFound";
import { LoadingLayout, RequireAuth, RequireNotAuth } from "@components/router";
import { useAuthHealthMutation } from "@features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import LocalStorageService from "@services/storage";
import {
  selectCurrentUserPayload,
  setCredentials,
} from "@features/auth/authSlice";
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
import AdminDashboard from "./features/Admin/dashboard/AdminDashboard";
import StudentDashboard from "./features/Student/dashboard/StudentDashboard";
import { useSelector } from "react-redux";
import { Role } from "./features/auth/types";
import Profile from "./features/profile/Profile";
import AllTables from "./features/Student/schedule/AllTables";
import ViewSchedule from "./features/Student/schedule/ViewSchedule";
import StudentCourse from "./features/Student/courses/StudentCourse";
import CourseRegistration from "./features/Student/course registration/CourseRegistration";
import Results from "./features/professor/academicAdvisor/Results";
import StudentAcdemicRecord from "./features/professor/academicAdvisor/StudentAcdemicRecord";
import ACStudents from "./features/professor/academicAdvisor/ACStudents";
import ProfessorDashboard from "./features/professor/dashboard/ProfessorDashboard";

export default function AppRoutes() {
  const [checkHealth, authHealth] = useAuthHealthMutation();
  const [userRole, setUserRole] = useState<string>("");
  const [dashboard, setDashboard] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUserPayload);
  useEffect(() => {
    const token = LocalStorageService.getItem("AUTH_TOKEN_STATE");
    if (token) {
      dispatch(setCredentials(token));
      console.log("token", token);
    }
    if (currentUser) {
      if (currentUser.roles.includes(Role.ADMIN)) {
        setUserRole(Role.ADMIN);
        setDashboard("/app/admin/dashboard");
      } else if (currentUser.roles.includes(Role.STUDENT)) {
        setUserRole(Role.STUDENT);
        setDashboard("/app/student/dashboard");
      } else if (currentUser.roles.includes(Role.PROFESSOR)) {
        setUserRole(Role.PROFESSOR);
        setDashboard("/app/professor/dashboard");
      }
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

        <Route path="/app" element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            <Route
              index
              element={
                <Navigate
                  to={
                    currentUser?.roles.includes(Role.STUDENT)
                      ? "student/dashboard"
                      : currentUser?.roles.includes(Role.ADMIN)
                        ? "admin/dashboard"
                        : "professor/dashboard"
                  }
                />
              }
            />
            {/** Admin Stack */}
            <Route path="admin/dashboard" element={<AdminDashboard />} />
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

            <Route path="admin/classes" element={<CourseClass />} />
            <Route path="admin/classes/add" element={<AddCourseClass />} />

            {/** Student Stack */}
            <Route path="student/dashboard" element={<StudentDashboard />} />
            <Route path="student/viewschedule" element={<ViewSchedule />} />
            <Route path="Student/courses" element={<StudentCourse />} />
            {/** student role based stack */}
            <Route element={<RequireAuth allRoles={[Role.STUDENT]} />}>
              <Route
                path={"student/announcements"}
                element={<Announcement />}
              />
              <Route
                path="student/profile/update/:studentCode"
                element={<UpdateStudent />}
              />
              <Route path="student/profile" element={<Profile />} />
            </Route>
            {/** professor role based stack */}
            <Route element={<RequireAuth allRoles={[Role.PROFESSOR]} />}>
              <Route
                path={"professor/announcements"}
                element={<Announcement />}
              />
              <Route
                path="professor/announcements/add"
                element={<SendAnnouncement />}
              />
              <Route path={"professor/profile"} element={<Profile />} />
              <Route
                path="professor/dashboard"
                element={<ProfessorDashboard />}
              />
              <Route path="professor/courses" element={<StudentCourse />} />
              <Route
                path="professor/profile/update/:userName"
                element={<EditProfessor />}
              />
              <Route path="professor/viewschedule" element={<ViewSchedule />} />
            </Route>

            {/** Admin  role based stack */}
            <Route element={<RequireAuth allRoles={[Role.ADMIN]} />}>
              <Route path={"admin/announcements"} element={<Announcement />} />
              <Route
                path="admin/announcements/add"
                element={<SendAnnouncement />}
              />
              <Route
                path="admin/students/student-info"
                element={<StudentAcdemicRecord />}
              />
            </Route>
            <Route
              path="student/course-registration"
              element={<CourseRegistration />}
            />
            <Route path="student/results" element={<Results />} />
            <Route path="academic-advisor" element={<ACStudents />} />
          </Route>
        </Route>

        {/** 404 page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
