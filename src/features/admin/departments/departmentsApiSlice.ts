import { apiSlice, MessageResponse, Page, PageQuery } from "@/app/api";
import {
  CreateDepartmentDto,
  Department,
  DepartmentUploadImage,
  UpdateDepartmentDto,
} from "./types";

const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDepartment: builder.query<Department[],void>({
      query: () => ({
        url: "/v1/departments",
        method: "GET",
      }),
      providesTags: ["Department"],
    }),
    getDepartment: builder.query<Department, string>({
      query: (code) => ({
        url: `/v1/departments/${code}`,
        method: "GET",
      }),
      providesTags: ["Department"],
    }),
    addDepartment: builder.mutation<Department, CreateDepartmentDto>({
      query: (body) => ({
        url: "/v1/departments",
        body,
        method: "POST",
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation<Department, UpdateDepartmentDto>({
      query: (props) => ({
        url: `/v1/departments/${props.code}`,
        body: props.data,
        method: "PUT",
      }),
      invalidatesTags: ["Department"],
    }),
    uploadDepartmentImage: builder.mutation<
      MessageResponse,
      DepartmentUploadImage
    >({
      query: (param) => ({
        url: `/v1/storage/departments/${param.code}`,
        body: param.formData,
        method: "POST",
      }),

      invalidatesTags: ["Department"],
    }),
    deleteDepartment: builder.mutation<MessageResponse, string>({
      query: (code) => ({
        url: `/v1/departments/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useGetAllDepartmentQuery,
  useAddDepartmentMutation,
  useUploadDepartmentImageMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
} = departmentApiSlice;
