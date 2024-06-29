import { apiSlice } from "@/app/api";
import { RegisterCourseQuery } from "./type";
import { Course } from "@features/admin/mange-course/type";

const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyAvilableCourses: builder.query<Course[], void>({
      query: () => ({
        url: "/v1/register/me/courses",
        method: "GET",
      }),
      providesTags: ["CourseRegister"],
    }),
    registerCourseToMe: builder.mutation<Course[], RegisterCourseQuery>({
      query: (query) => ({
        url: `/v1/register/me/class/${query.courseCode}/${query.year}/${query.semester}/${query.group}`,
        method: "POST",
      }),
      invalidatesTags: ["CourseRegister"],
    }),
    takeASeatForMe: builder.mutation<Course[], RegisterCourseQuery>({
      query: (query) => ({
        url: `/v1/register/me/class/${query.courseCode}/${query.year}/${query.semester}/${query.group}`,
        method: "POST",
      }),
      invalidatesTags: ["CourseRegister"],
    }),
    getMyRegisteredCourses: builder.query<Course[], void>({
      query: () => ({
        url: "/v1/register/me/class",
        method: "GET",
      }),
      providesTags: ["CourseRegister"],
    }),
    removeRegister: builder.mutation<Course[], RegisterCourseQuery>({
      query: (query) => ({
        url: `/v1/register/me/class/${query.courseCode}/${query.year}/${query.semester}/${query.group}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CourseRegister"],
    }),
  }),
});

export const {
  useGetMyAvilableCoursesQuery,
  useGetMyRegisteredCoursesQuery,
  useRegisterCourseToMeMutation,
  useRemoveRegisterMutation,
  useTakeASeatForMeMutation,
} = courseApiSlice;
