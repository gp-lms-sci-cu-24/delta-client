import { apiSlice, MessageResponse, Page, PageQuery } from "@/app/api";
import { LocationDto, CreateLocationDto, LocationUploadImage,UpdateLocationDto } from "./types";


const locationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLocation: builder.query<Page<LocationDto>, PageQuery>({
      query: (page) => ({
        url: "/v1/locations",
        params: page,
        method: "GET",
      }),
      providesTags: ["Location"],
    }),
    getLocation: builder.query<LocationDto, number>({
      query: (id) => ({
        url: `/v1/locations/${id}`,
        method: "GET",
      }),
      providesTags: ["Location"],
    }),
    addLocation: builder.mutation<LocationDto, CreateLocationDto>({
      query: (body) => ({
        url: "/v1/locations",
        body,
        method: "POST",
      }),
    }),
    uploadLocationImage: builder.mutation<
      MessageResponse,
      LocationUploadImage
    >({
      query: (param) => ({
        url: `/v1/storage/locations/${param.id}`,
        body: param.formData,
        method: "POST",
      }),

      invalidatesTags: ["Location"],
    }),
    updateLocation: builder.mutation<LocationDto, UpdateLocationDto>({
      query: (props) => ({
        url: `/v1/locations/${props.id}`,
        body: props.data,
        method: "PUT",
      }),
      invalidatesTags: ["Location"],
    }),
    deleteLocation: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `/v1/locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const { useGetAllLocationQuery, useAddLocationMutation,useUploadLocationImageMutation,useGetLocationQuery,useDeleteLocationMutation,useUpdateLocationMutation } =
  locationApiSlice;
