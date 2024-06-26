import { SxProps, Theme } from "@mui/material";

export type AuthDataState = "empty" | "idle" | "loading" | "success" | "error";

export type Credentials = {
  username: string;
  password: string;
};
export type LoginInputs = Credentials;

export interface AuthPayload {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  roles: Role[];
}
export interface AuthState {
  token: string | null;
  payload: AuthPayload | null;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expired_in: number;
}

export interface AuthStateResponse {
  message: string;
  roles: Role[];
}

export enum Role {
  USER = "USER",
  STUDENT = "STUDENT",
  PROFESSOR = "PROFESSOR",
  STUDENT_AFFAIR = "STUDENT_AFFAIR",
  ACADEMIC_ADVISOR = "ACADEMIC_ADVISOR",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface UserStateDto {
  username: string;
}

export type UserState = UserStateDto;

export interface SxStyleProps {
  [key: string]: SxProps<Theme>;
}
