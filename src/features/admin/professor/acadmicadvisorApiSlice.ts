import { apiSlice, MessageResponse, Page } from "@/app/api";
import { AcademicPageQuery, Professor } from "./types";
import { UserStateDto } from "@/features/auth/types";
import { StudentDto } from "../student/type";

const acadmicadvisorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        assignAcadmicAdvisorRole :builder.mutation<MessageResponse, UserStateDto>({
          query: (user) => ({
            url: `/v1/academic-advisor`,
            method: "POST",
            body:user,
          }),
          invalidatesTags: ["Professor"],
        }),

        removeAcadmicAdvisorRole :builder.mutation<MessageResponse, UserStateDto>({
          query: (user) => ({
            url: `/v1/academic-advisor`,
            method: "DELETE",
            body:user,
          }),
          invalidatesTags: ["Professor"],
        }),

        assignUserToAcadmicAdvisor :builder.mutation<MessageResponse, string[]>({
            query: (data) => ({
              url: `/v1/academic-advisor/${data[0]}`,
              method: "POST",
              body:{"username":data[1]},
            }),
            invalidatesTags: ["Professor"],
        }),

        getAssignedStudents:builder.query<Page<StudentDto>, AcademicPageQuery>({
          query: (data) => ({
            url: `/v1/academic-advisor/${data.username}/students`,
            params: data.page,
            method: "GET",
          }),
          providesTags: ["Professor"],
        }),

        getAssignedProfessors : builder.query<Page<Professor>, AcademicPageQuery>({
          query: (data) => ({
            url: `/v1/academic-advisor/${data.username}/professors`,
            params: data.page,
            method: "GET",
          }),
          providesTags: ["Professor"],
        }),
        removeAssignUser : builder.mutation<MessageResponse, string[]>({
          query: (data) => ({
            url: `/v1/academic-advisor/${data[0]}`,
            method: "DELETE",
            body:{"username":data[1]},
          }),
          invalidatesTags: ["Professor"],
        }),

    }),
});

export const { useRemoveAcadmicAdvisorRoleMutation, useAssignAcadmicAdvisorRoleMutation,useAssignUserToAcadmicAdvisorMutation ,useGetAssignedProfessorsQuery,useGetAssignedStudentsQuery,useRemoveAssignUserMutation} =
acadmicadvisorApiSlice;
