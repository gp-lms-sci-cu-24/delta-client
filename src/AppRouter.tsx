import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "@components/NotFound";
import { LoadingLayout, RequireAuth, RequireNotAuth, SharedRoleRoute } from "@components/router";
import { useAuthHealthMutation } from "@features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import LocalStorageService from "@services/storage";
import { selectCurrentUserPayload, setCredentials } from "@features/auth/authSlice";
import SignInPage from "@features/auth/pages/SignInPage";
import ForgotPasswordPage from "@features/auth/pages/ForgotPasswordPage";
import MainLayout from "@layouts/MainLayout";
import AddCourse from "@features/admin/mange-course/AddCourse";
import Courses from "@features/admin/mange-course/Courses";
import EditCourse from "@features/admin/mange-course/EditCourse";
import Departments from "@features/admin/departments/Departments";
import AddDepartment from "@features/admin/departments/AddDepartments";
import UpdateDepartment from "@features/admin/departments/UpdateDepartment";
import AddLocation from "@features/admin/location/AddLocation";
import UpdateLocation from "@features/admin/location/UpdateLocation";
import Locations from "@features/admin/location/Location";
import AllStudent from "@features/admin/student/AllStudent";
import AddStudent from "@features/admin/student/AddStudent";
import AllProfessors from "@features/admin/professor/AllProfessors";
import AddProfessor from "@features/admin/professor/AddProfessor";
import Professor from "@features/admin/professor/Professor";
import EditProfessor from "@features/admin/professor/EditProfessor";
import UpdateStudent from "@features/admin/student/UpdateStudent";
import Announcement from "@features/admin/announcement/Announcement";
import SendAnnouncement from "@features/admin/announcement/SendAnnouncement";
import CourseClass from "@features/admin/course-class/CourseClass";
import AddCourseClass from "@features/admin/course-class/AddCourseClass";
import AdminDashboard from "@features/admin/dashboard/AdminDashboard";
import StudentDashboard from "@features/student/dashboard/StudentDashboard";
import { useSelector } from "react-redux";
import { Role } from "./features/auth/types";
import Profile from "./features/profile/Profile";
import AllTables from "@features/student/schedule/AllTables";
import ViewSchedule from "@features/student/schedule/ViewSchedule";
import StudentCourse from "@features/student/courses/StudentCourse";
import CourseRegistration from "@features/student/course-registration/CourseRegistration";
import Results from "@features/professor/academic-advisor/Results";
import StudentAcdemicRecord from "@features/professor/academic-advisor/StudentAcdemicRecord";
import ACStudents from "@features/professor/academic-advisor/ACStudents";
import ProfessorDashboard from "./features/professor/dashboard/ProfessorDashboard";
import ROUTES from "@constants/routes";

export default function AppRoutes() {
  const [checkHealth, authHealth] = useAuthHealthMutation();
  const [loading, setLoading] = useState(true);

  // const [userRole, setUserRole] = useState<string>("");
  // const [dashboard, setDashboard] = useState<string>("");
  const dispatch = useDispatch();
  // const currentUser = useSelector(selectCurrentUserPayload);

  const isAuthLoading = loading || authHealth.isLoading;
  const isAuthed = authHealth.data?.roles;

  const NotFoundRoute = <Route path="*" element={<NotFound />} />;

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
      <Route path="/" element={<LoadingLayout loading={isAuthLoading} />}>
        <Route index element={<Navigate to={isAuthed ? ROUTES.HOME : ROUTES.AUTH_LOGIN} />} />

        {/** Not Authed user Stack */}
        <Route path="/auth" element={<RequireNotAuth />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          {NotFoundRoute}
        </Route>

        <Route path="/app" element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            <Route element={<LoadingLayout enableProgress />}>
              <Route index element={<Navigate to={ROUTES.HOME} />} />

              {/** Shared Stack */}
              <Route
                path="dashboard"
                element={
                  <SharedRoleRoute
                    admin={<AdminDashboard />}
                    student={<StudentDashboard />}
                    professor={<ProfessorDashboard />}
                  />
                }
              />

              {/** Admin Stack */}

              <Route path="admin/courses" element={<Courses />} />
              <Route path="admin/courses/add" element={<AddCourse />} />
              <Route path="admin/courses/update/:code" element={<EditCourse />} />

              <Route path="admin/departments" element={<Departments />} />
              <Route path="admin/departments/add" element={<AddDepartment />} />
              <Route path="admin/departments/update/:code" element={<UpdateDepartment />} />

              <Route path="admin/locations" element={<Locations />} />
              <Route path="admin/locations/add" element={<AddLocation />} />
              <Route path="admin/locations/update/:id" element={<UpdateLocation />} />

              <Route path="admin/students" element={<AllStudent />} />
              <Route path="admin/students/add" element={<AddStudent />} />
              <Route path="admin/students/update/:studentCode" element={<UpdateStudent />} />

              {/** professor */}
              <Route path="admin/professors" element={<AllProfessors />} />
              <Route path="admin/professors/add" element={<AddProfessor />} />
              <Route path="admin/professors/:id" element={<Professor />} />
              <Route path="admin/professors/update/:userName" element={<EditProfessor />} />

              <Route path="admin/classes" element={<CourseClass />} />
              <Route path="admin/classes/add" element={<AddCourseClass />} />

              {/** Student Stack */}
              <Route path="student/dashboard" element={<StudentDashboard />} />
              <Route path="student/viewschedule" element={<ViewSchedule />} />
              <Route path="Student/courses" element={<StudentCourse />} />
              {/** student role based stack */}
              <Route element={<RequireAuth allRoles={[Role.STUDENT]} />}>
                <Route path={"student/announcements"} element={<Announcement />} />
                <Route path="student/profile/update/:studentCode" element={<UpdateStudent />} />
                <Route path="student/profile" element={<Profile />} />
              </Route>
              {/** professor role based stack */}
              <Route element={<RequireAuth allRoles={[Role.PROFESSOR]} />}>
                <Route path={"professor/announcements"} element={<Announcement />} />
                <Route path="professor/announcements/add" element={<SendAnnouncement />} />
                <Route path={"professor/profile"} element={<Profile />} />
                <Route path="professor/dashboard" element={<ProfessorDashboard />} />
                <Route path="professor/courses" element={<StudentCourse />} />
                <Route path="professor/profile/update/:userName" element={<EditProfessor />} />
                <Route path="professor/viewschedule" element={<ViewSchedule />} />
              </Route>

              {/** Admin  role based stack */}
              <Route element={<RequireAuth allRoles={[Role.ADMIN]} />}>
                <Route path={"admin/announcements"} element={<Announcement />} />
                <Route path="admin/announcements/add" element={<SendAnnouncement />} />
                <Route path="admin/students/student-info" element={<StudentAcdemicRecord />} />
              </Route>
              <Route path="student/course-registration" element={<CourseRegistration />} />
              <Route path="student/results" element={<Results />} />
              <Route path="academic-advisor" element={<ACStudents />} />
              {NotFoundRoute}
            </Route>
          </Route>
        </Route>

        {/** 404 page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
