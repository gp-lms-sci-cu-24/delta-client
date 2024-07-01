import { apiSlice } from "@app/api";
import { ScheduleDto } from "./types";

const scheduleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMySchedule: builder.query<ScheduleDto[], void>({
      query: () => ({
        url: "/v1/schedule",
        method: "GET",
      }),
      providesTags: [
        "CourseRegister",
        "Course",
        "CourseClass",
        "Location",
        "Student",
        "User",
        "Announcement",
        "CourseResult",
        "Professor",
      ],
    }),
  }),
});

export const { useGetMyScheduleQuery } = scheduleApiSlice;
