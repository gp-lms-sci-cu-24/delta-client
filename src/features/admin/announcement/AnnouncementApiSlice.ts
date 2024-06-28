
import { apiSlice, MessageResponse, Page, PageQuery } from "@/app/api";
import {
  AnnouncementDto,
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
} from "./type";

const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAnnouncements: builder.query<Page<AnnouncementDto>, PageQuery>({
      query: () => ({
        url: "/v1/announcements",
        method: "GET",
      }),
      providesTags: ["Announcement"],
    }),
    sendAnnouncement: builder.mutation<AnnouncementDto, CreateAnnouncementDto>({
      query: (body) => ({
        url: "/v1/announcements/send",
        body,
        method: "POST",
      }),
      invalidatesTags: ["Announcement"],
    }),
    updateAnnouncement: builder.mutation<
      AnnouncementDto,
      UpdateAnnouncementDto
    >({
      query: (props) => ({
        url: `/v1/departments/${props.id}`,
        body: props.data,
        method: "PUT",
      }),
      invalidatesTags: ["Announcement"],
    }),

    deleteAnnouncement: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `/v1/announcements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Announcement"],
    }),
  }),
});

export const {
  useGetAllAnnouncementsQuery,
  useSendAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = departmentApiSlice;
