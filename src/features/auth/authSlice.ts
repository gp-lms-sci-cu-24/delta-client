/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { RootState } from "@/app/root";
import { AuthPayload, AuthState } from "./types";
import LocalStorageService from "@/services/storage";

const initialState: AuthState = {
  token: null,
  payload: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      LocalStorageService.setItem("AUTH_TOKEN_STATE", token);
      state.token = token;
      state.payload = jwtDecode<AuthPayload>(token);
    },
    clearCredentials: (state) => {
      LocalStorageService.removeItem("AUTH_TOKEN_STATE");
      state.token = null;
      state.payload = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const selectCurrentUserPayload = (state: RootState) =>
  state.auth.payload;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
