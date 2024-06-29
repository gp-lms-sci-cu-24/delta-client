
import { apiSlice } from "@/app/api";
import {
  AssignGradeQuery,
  CourseResult,
  QueyStudentResultByYear,
  QueyStudentResultByYearAndSemester,
} from "./type";

const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentResult: builder.query<CourseResult[], number>({
      query: (body) => ({
        url: `/v1/result/student/${body}`,
        method: "GET",
      }),
      providesTags: ["CourseResult"],
    }),
    getStudentResultByYear: builder.query<
      CourseResult[],
      QueyStudentResultByYear
    >({
      query: (body) => ({
        url: `/v1/result/student/${body.student}/${body.year}`,
        method: "GET",
      }),
      providesTags: ["CourseResult"],
    }),
    getStudentResultByYearAndSemester: builder.query<
      CourseResult[],
      QueyStudentResultByYearAndSemester
    >({
      query: (body) => ({
        url: `/v1/result/student/${body.student}/${body.year}/${body.semester}`,
        method: "GET",
      }),
      providesTags: ["CourseResult"],
    }),
    postStudentGrade: builder.mutation<
      CourseResult[],
      AssignGradeQuery
    >({
      query: (body) => ({
        url: `/v1/result/finish/${body.student}/${body.year}/${body.semester}/${body.group}/${body.grade}/${body.course}`,
        method: "POST",
      }),
      invalidatesTags: ["CourseResult"],
    }),
  }),
});

export const {
  useGetStudentResultByYearAndSemesterQuery,
  useGetStudentResultByYearQuery,
  useGetStudentResultQuery,
  usePostStudentGradeMutation
} = courseApiSlice;
