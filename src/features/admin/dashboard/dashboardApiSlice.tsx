import { apiSlice } from "@/app/api";
import { DashboardDto } from "./type";

const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardDto ,void>({
      query: () => ({
        url: "/v1/dashboard",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } =
dashboardApiSlice;
