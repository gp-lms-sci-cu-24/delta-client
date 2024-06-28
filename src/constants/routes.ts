const ROUTES = {
  AUTH_LOGIN: "/auth/login",
  AUTH_FORGET_PASSWORD: "/auth/forgot-password",
  HOME: "/app/dashboard",

  DASHBOARD: "/app/dashboard",

  PROFILE: "/p/:username",
  NOT_FOUND: "/not-found",
  COURSES: "admin/courses",
  ADD_COURSE: "admin/course/add",
  UPDATE_COURSE: "admin/course/update/:code",
  DEPARTMENTS: "admin/departments",
  ADD_DEPARTMENT: "admin/department/add",
  UPDATE_DEPARTMENT: "admin/department/update/:code",
};

export default ROUTES;
