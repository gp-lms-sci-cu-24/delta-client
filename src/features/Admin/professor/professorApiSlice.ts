import { apiSlice, MessageResponse, Page, PageQuery } from "@/app/api";
import { Professor, CreateProfessor, UpdateProfessor } from "./types";

const professorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProfessors: builder.query<Page<Professor>, PageQuery>({
      query: (page) => ({
        url: "/v1/professors",
        params: page,
        method: "GET",
      }),
      providesTags: ["Professor"],
    }),
    getProfessor: builder.query<Professor, string>({
      query: (id) => ({
        url: `/v1/professors/${id}`,
        method: "GET",
      }),
      providesTags: ["Professor"],
    }),
    addProfessor: builder.mutation<Professor, CreateProfessor>({
      query: (body) => ({
        url: "/v1/professors",
        body,
        method: "POST",
      }),
      invalidatesTags: ["Professor"],
    }),
    updateProfessor: builder.mutation<Professor, UpdateProfessor>({
      query: (props) => ({
        url: `/v1/professors/${props.username}`,
        body: props.data,
        method: "PUT",
      }),
      invalidatesTags: ["Professor"],
    }),
    deleteProfessor: builder.mutation<MessageResponse, string>({
      query: (useName) => ({
        url: `/v1/professors/${useName}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Professor"],
    }),
    searchProfessors: builder.mutation<Professor[], string>({
      query: (q) => ({
        url: `/v1/professors/search?q=${q}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllProfessorsQuery,
  useAddProfessorMutation,
  useGetProfessorQuery,
  useDeleteProfessorMutation,
  useUpdateProfessorMutation,
  useSearchProfessorsMutation,
} = professorApiSlice;
