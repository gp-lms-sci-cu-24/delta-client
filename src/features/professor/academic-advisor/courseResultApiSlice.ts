
import { apiSlice } from "@/app/api";
import {
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
  }),
});

export const {
  useGetStudentResultByYearAndSemesterQuery,
  useGetStudentResultByYearQuery,
  useGetStudentResultQuery,
} = courseApiSlice;
