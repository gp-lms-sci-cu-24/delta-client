import { DayOfWeek, MakeOptionalExcept, Time } from "@utils/types";

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

export interface Department {
  name: string;
  info: string;
  image?: string | null;
  code: string;
  graduationCreditHours: number;
}

export interface Course {
  name: string;
  code: string;
  info: string;
  creditHours: number;
  image?: string;
  departments: DepartmentCourse[];
  coursePrerequisites: string[];
}
export interface DepartmentCourse {
  department: Department;
  semester: DepartmentSemester;
  mandatory: boolean;
}

export interface AdminProfessor
  extends MakeOptionalExcept<Professor, "firstName" | "lastName" | "username"> {}

export interface OptionalCourse extends MakeOptionalExcept<Course, "code" | "name"> {}

export interface CourseClass {
  id?: number;
  course: OptionalCourse;
  semester: YearSemester;
  state: CourseClassState;
  maxCapacity: number;
  numberOfStudentsRegistered: number;
  year: number;
  groupNumber: number;
  adminProfessor: AdminProfessor;
  professors?: Professor[];
  timings?: Timing[];
}
export interface Timing {
  id?: number;
  day: DayOfWeek;
  startTime: Time;
  endTime: Time;
  location: Location;
  type: ClassType;
}
export interface Location {
  id: number;
  name: string;
  info: string;
  image: string;
  path: string;
  maxCapacity: number;
}

/*****************************
 * ENUMS
 ******************************/

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
export enum Degree {
  BACHELOR = "BACHELOR",
  MASTER = "MASTER",
  DOCTORATE = "DOCTORATE",
  PROFESSOR_DOCTORATE = "PROFESSOR DOCTORATE",
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
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export enum YearSemester {
  FIRST = "FIRST",
  SECOND = "SECOND",
  SUMMER = "SUMMER",
}
export enum CourseClassState {
  REGISTRATION,
  IN_PROGRESS,
  INACTIVE,
  FINISHED,
}
export enum ClassType {
  THEORETICAL_LECTURE = "THEORETICAL_LECTURE",
  TRAINING_SECTION = "TRAINING_SECTION",
  LABORATORY_SECTION = "LABORATORY_SECTION",
}
