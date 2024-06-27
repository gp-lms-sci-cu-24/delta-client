import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// import { RootState } from "../root";
import { LoginResponse } from "@features/auth/types";
import { clearCredentials, setCredentials } from "@features/auth/authSlice";
import { RootState } from "@app/root";
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const currentState = getState() as RootState;
    const token = currentState.auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If UnAuthorized erorr happen
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/v1/auth/refresh", method: "POST" },
      api,
      extraOptions,
    );

    // Refresh happen succfully
    if (refreshResult.data) {
      const refreshResponse = refreshResult.data as LoginResponse;
      api.dispatch(setCredentials(refreshResponse.access_token));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api-with-refresh",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "Course",
    "CourseClass",
    "CourseRegister",
    "CourseResult",
    "Department",
    "Location",
    "Student",
    "Professor",
    "Announcement",
    "User",
  ],
});

export const baseApiSlice = createApi({
  reducerPath: "api-without-refresh",
  baseQuery,
  endpoints: () => ({}),
});
