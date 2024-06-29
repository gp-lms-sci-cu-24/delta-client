import { YearSemester } from "@features/admin/course-class/type";
import { Course } from "@features/admin/mange-course/type";
import { MakeOptionalExcept } from "@/utils";

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
  year: string;
  semester: string;
  student: string;
}
