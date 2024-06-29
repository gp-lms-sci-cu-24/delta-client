
import { apiSlice } from "@/app/api";
import { CumulativeResultDto } from "./type";

const departmentMapSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentMap: builder.query< CumulativeResultDto[][], string>({
      query: (body) => ({
        url: `/v1/result/map/${body}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
    useGetDepartmentMapQuery
  } = departmentMapSlice;
