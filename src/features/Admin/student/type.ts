import { ImageType } from "react-images-uploading";
import { Department } from "../departments/types";


export interface StudentDto {
  username: string;
  gender: Gender;
  firstName: string;
  fatherName: string;
  grandfatherName: string;
  lastname: string;
  code: string;
  address: string;
  gpa: number;
  creditHoursSemester: number;
  level: Level;
  creditHours: number;
  joiningYear: string;
  department: Department;
  profilePicture: string;
  roles:[];
}

export interface createStudentDto {
  password: string,
  firstName: string;
  fatherName: string;
  grandfatherName: string;
  lastname: string;
  code: string;
  address: string;
  gender: Gender;
  joining_year: string;
  department_code: string;
  profilePicture:ImageType;
}
export interface updateStudentDto {
  code:string;
  data:{
    firstName: string;
    lastname: string;
    fatherName: string;
    grandfatherName: string;
    address: string;
    gender: Gender;
    joining_year: string;
    department_code: string;
  };
}
export enum Level {
  LEVEL_1 = "LEVEL_1",
  LEVEL_2 = "LEVEL_2",
  LEVEL_3 = "LEVEL_3",
  LEVEL_4 = "LEVEL_4",
}
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}