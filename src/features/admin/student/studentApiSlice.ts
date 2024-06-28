import { apiSlice, Page, PageQuery } from "@/app/api";
import { createStudentDto, StudentDto, updateStudentDto } from "./type";

// Define a base query with the base URL of your API
export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<Page<StudentDto>, PageQuery>({
      query: (page) => ({
        url: "/v1/students",
        params: page,
        method: "GET",
      }),
      providesTags: ["Student"],
    }),
    addStudent: builder.mutation<StudentDto, createStudentDto>({
      query: (body) => ({
        url: "/v1/students",
        body:body,
        method: "POST",
      }),
      invalidatesTags: ["Student"],
    }),
    getStudentById: builder.query<StudentDto, string>({
      query: (code) => ({
        url: `/v1/students/${code}`,
        method: "GET",
      }),
      providesTags: ["Student"],
    }),
    deleteStudent: builder.mutation<StudentDto, string>({
      query: (code) => ({
        url: `/v1/students/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    updateStudent: builder.mutation<StudentDto, updateStudentDto>({
      query: (props) => ({
        url: `/v1/students/${props.code}`,
        body: props.data,
        method: "PUT",
      }),
      invalidatesTags: ["Student"],
    })
  }),
});

export const { useGetStudentsQuery , useAddStudentMutation  , useGetStudentByIdQuery , useDeleteStudentMutation,useUpdateStudentMutation } = studentApiSlice;
