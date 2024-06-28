import { apiSlice, MessageResponse } from "@/app/api";
import { ProfileUploadImage } from "./type";

const ProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadProfileImage: builder.mutation<MessageResponse, ProfileUploadImage>({
      query: (param) => ({
        url: `/v1/storage/my/profile`,
        body: param.formData,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUploadProfileImageMutation } = ProfileApiSlice;
