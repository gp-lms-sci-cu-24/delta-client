import { Department } from "../departments/types";

export interface DepartmentCourse {
  department: Department;
  semester: DepartmentSemester;
  mandatory: boolean;
}

export interface Course {
  name: string;
  code: string;
  info: string;
  creditHours: number;
  image: string;
  departments: DepartmentCourse[];
  coursePrerequisites: string[];
}

export interface AddCourseDto {
  name: string;
  code: string;
  info: string;
  creditHours: number;
  image:string;
  coursePrerequisites: string[];
  departments: AddCourseDepartment[];
}
export interface AddCourseDepartment {
  departmentCode: string;
  mandatory: boolean;
  semester: DepartmentSemester;
}
 
export interface UpdateCourseDto {
  courseCode: string;
 data:{ name: string;
  code: string;
  info: string;
  creditHours: number;
  image: string;
  departments: DepartmentCourse[];
  coursePrerequisites: string[];}
}


export interface CourseUploadImage {
  code: string;
  formData: FormData;
}

export enum DepartmentSemester {
  FIRST_SEMESTER,
  SECOND_SEMESTER,
  THIRD_SEMESTER,
  FOURTH_SEMESTER,
  FIFTH_SEMESTER,
  SIXTH_SEMESTER,
  SEVENTH_SEMESTER,
  EIGHTH_SEMESTER,
}
