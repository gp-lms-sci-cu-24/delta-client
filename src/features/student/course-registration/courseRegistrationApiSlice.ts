import { apiSlice, MessageResponse } from "@/app/api";
import { Course } from "@features/admin/mange-course/type";
import { RegisterCourseQuery } from "./type";
import { CourseClass } from "@features/shared";

const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyAvilableCourses: builder.query<Course[], void>({
      query: () => ({
        url: "/v1/register/me/courses",
        method: "GET",
      }),
      providesTags: ["CourseRegister"],
    }),
    registerCourseToMe: builder.mutation<MessageResponse, RegisterCourseQuery>({
      query: (query) => ({
        url: `/v1/register/me/class/${query.courseCode}/${query.year}/${query.semester}/${query.group}`,
        method: "POST",
      }),
      invalidatesTags: ["CourseRegister"],
    }),
    takeASeatForMe: builder.mutation<MessageResponse, RegisterCourseQuery>({
      query: (query) => ({
        url: `/v1/register/me/class/${query.courseCode}/${query.year}/${query.semester}/${query.group}`,
        method: "POST",
      }),
      invalidatesTags: ["CourseRegister"],
    }),
    getMyRegisteredCourses: builder.query<CourseClass[], void>({
      query: () => ({
        url: "/v1/register/me/class",
        method: "GET",
      }),
      providesTags: ["CourseRegister"],
    }),
    removeRegister: builder.mutation<MessageResponse, RegisterCourseQuery>({
      query: (query) => ({
        url: `/v1/register/me/class/${query.courseCode}/${query.year}/${query.semester}/${query.group}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CourseRegister", "CourseClass"],
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
