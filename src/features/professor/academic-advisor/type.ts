import { MakeOptionalExcept } from "@/utils";
import { YearSemester } from "@features/admin/course-class/type";
import { Course } from "@features/admin/mange-course/type";

export interface CourseResult {
  grade: number;
  rate: string;
  state: string;
  courseClass: {
    course: OptionalCourseResult;
    semester: YearSemester;
    year: number;
    groupNumber: number;
  };
}

export interface OptionalCourseResult
  extends MakeOptionalExcept<Course, "code" | "name" | "creditHours"> {}

export interface QueyStudentResultByYear {
  student: number;
  year: number;
}
export interface QueyStudentResultByYearAndSemester {
  year: number;
  semester: YearSemester;
  student: number;
}



export interface CumulativeResultDto{
  courseCode: string;
  courseName: string;
  creditHours: number;
  grade: number;
  numberOfFail: number;
  mandatory: boolean;
  rate: Rate;
  state: State;
}
  
export enum Rate{
  FAIL="FAIL",
  POOR="POOR",
  GOOD="GOOD",
  VERY_GOOD="VERY_GOOD",
  EXCELLENT="EXCELLENT"
}

export enum State{
  FAILED="FAILED",
  PASSED="PASSED",
  ABSENCE="ABSENCE",
  NEVER_TAKEN="NEVER_TAKEN"
}