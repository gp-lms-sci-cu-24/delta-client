import { apiSlice, MessageResponse, Page, PageQuery } from "@/app/api";
import { AddCourseDto, Course, CourseUploadImage, UpdateCourseDto } from "./type";

const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query<Page<Course>, PageQuery>({
      query: (page) => ({
        url: "/v1/courses",
        params: page,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    addCourse: builder.mutation<Course, AddCourseDto>({
      query: (body) => ({
        url: "/v1/courses",
        body,
        method: "POST",
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation<MessageResponse, string>({
      query: (code) => ({
        url: `/v1/courses/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    editCourse: builder.mutation<Course,UpdateCourseDto>({
      query: (props) => ({
        url: `/v1/courses/update/${props.courseCode}`,
        body:props.data,
        method: "PUT",
      }),
      invalidatesTags: ["Course"],
    }),
    getCourseById: builder.query<Course, string>({
      query: (id) => ({
        url: `/v1/courses/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    search: builder.mutation<Course[], string>({
      query: (q) => ({
        url: `/v1/courses/search?q=${q}`,
        method: "GET",
      }),
    }),
    uploadCourseImage: builder.mutation<MessageResponse, CourseUploadImage>({
      query: (param) => ({
        url: `/v1/storage/courses/${param.code}`,
        body: param.formData,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useSearchMutation,
  useUploadCourseImageMutation,
} = courseApiSlice;
