import { apiSlice, baseApiSlice, MessageResponse } from "@app/api";
import {
  AuthStateResponse,
  Credentials,
  LoginResponse,
  UserState,
} from "./types";

const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Credentials>({
      query: (credentials: Credentials) => ({
        url: "/v1/auth",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: "/v1/auth/signOut",
        method: "POST",
      }),
    }),
  }),
});

const authApiSliceWithRefresh = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authHealth: builder.mutation<AuthStateResponse, void>({
      query: () => ({
        url: "/v1/auth/health",
        method: "GET",
      }),
    }),
    userState: builder.query<UserState, void>({
      query: () => ({
        url: "/v1/users/me",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
export const { useAuthHealthMutation, useUserStateQuery } =
  authApiSliceWithRefresh;
