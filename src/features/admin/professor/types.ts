import { RegisterOptions } from "react-hook-form";
import { Gender } from "../student/type";
import { PageQuery } from "@/app/api";
import { Role } from "@/features/auth/types";

export enum Degree {
  BACHELOR = "BACHELOR",
  MASTER = "MASTER",
  DOCTORATE = "DOCTORATE",
  PROFESSOR_DOCTORATE = "PROFESSOR DOCTORATE",
}
export interface AcademicPageQuery {
  username?: string;
  page?: PageQuery;
}

export const degrees = [
  {
    value: Degree.BACHELOR,
    label: "BACHELOR",
  },
  {
    value: Degree.MASTER,
    label: "MASTER",
  },
  {
    value: Degree.DOCTORATE,
    label: "DOCTORATE",
  },
  {
    value: Degree.PROFESSOR_DOCTORATE,
    label: "PROFESSOR DOCTORATE",
  },
];

export type Professor = {
  username: string;
  firstName: string;
  lastName: string;

  degree: Degree;

  gender: Gender;
  email: string;
  roles: Role[];
  profilePicture: string;
};
export type CreateProfessor = {
  firstName: string;
  lastName: string;

  username: string;
  password: string;
  degree: Degree;

  gender: Gender;
  email: string;
  roles: ["PROFESSOR"];
};
export type UpdateProfessor = {
  username: string;
  data: {
    firstName: string;
    lastName: string;
    degree: Degree;
    gender: Gender;
    email: string;
  };
};

export const degreeVaildation: RegisterOptions = {
  required: {
    value: true,
    message: "Please select a degree.",
  },
  validate: (value) => {
    if (
      !value ||
      !(
        value === Degree.BACHELOR ||
        value === Degree.DOCTORATE ||
        value === Degree.MASTER ||
        value === Degree.PROFESSOR_DOCTORATE
      )
    ) {
      return "Please select a valid degree option (PROFESSOR DOCTORATE or MASTER,DOCTORATE ,BACHELOR).";
    }
    return true;
  },
};
