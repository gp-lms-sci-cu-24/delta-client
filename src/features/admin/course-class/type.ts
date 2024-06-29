import { PageQuery } from "@/app/api";
import { LocationDto } from "../location/types";
import { Professor } from "../professor/types";
import { Course } from "@features/admin/mange-course/type";
import { DayOfWeek, MakeOptionalExcept, Time } from "@/utils";

export interface CourseClassQuery extends PageQuery {
  includes?: CourseClassQueryIncludes[];
  states?: CourseClassState[];
  semesters?: YearSemester[];
  years?: number[];
  professor?: string;
}

export interface getByCoursePage{
  code:string,
  page:PageQuery
}

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
  location: LocationDto;
  type: ClassType;
}
export interface AdminProfessor
  extends MakeOptionalExcept<
    Professor,
    "firstName" | "lastName" | "username"
  > {}

export interface OptionalCourse
  extends MakeOptionalExcept<Course, "code" | "name"> {}

export interface CreateCourseClassDto {
  courseCode: string;
  semester: string;
  adminProfessor: string;
  maxCapacity: number;
  year: number;
  state: string;
  timings: CreateCourseClassTimingDto[];
}

export interface CreateCourseClassTimingDto {
  day: string;
  locationId: number;
  startTime: string;
  endTime: string;
  type: string;
}

export enum YearSemester {
  FIRST="FIRST",
  SECOND="SECOND",
  SUMMER="SUMMER",
}
export enum CourseClassQueryIncludes {
  COURSE,
  TIMINGS,
  ADMIN_PROFESSOR,
  PROFESSORS,
}
export enum CourseClassState {
  REGISTRATION,
  IN_PROGRESS,
  INACTIVE,
  FINISHED,
}
export enum ClassType {
  THEORETICAL_LECTURE="THEORETICAL_LECTURE",
  TRAINING_SECTION="TRAINING_SECTION",
  LABORATORY_SECTION="LABORATORY_SECTION",
}
