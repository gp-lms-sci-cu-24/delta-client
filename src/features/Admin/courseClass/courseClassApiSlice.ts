import { apiSlice, Page } from "@/app/api";
import { CourseClass, CourseClassQuery, CreateCourseClassDto } from "./type";

const courseClassApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourseClasses: builder.query<Page<CourseClass>, CourseClassQuery>({
      query: (query) => ({
        url: "/v1/classes",
        params: query,
        method: "GET",
      }),
      providesTags: ["CourseClass"],
    }),
    addCourseClass: builder.mutation<CourseClass, CreateCourseClassDto>({
      query: (body) => ({
        url: "/v1/classes",
        body:body,
        method: "POST",
      }),
      invalidatesTags: ["CourseClass"],
    }),
    getAllByCourse : builder.mutation<Page<CourseClass>, string>({
      query: (body) => ({
        url: `/v1/classes/${body}?pageNo=0&pageSize=20&includes=TIMINGS,ADMIN_PROFESSOR,COURSE&states=REGISTRATION`,
        method: "GET",
      }),
      invalidatesTags: ["CourseClass"],
    }),
  }),
});

export const { useGetAllCourseClassesQuery, useAddCourseClassMutation , useGetAllByCourseMutation } =
  courseClassApiSlice;
