import { YearSemester } from "@features/admin/course-class/type";

export interface RegisterCourseQuery {
  courseCode: string;
  year: number;
  semester: YearSemester;
  group: number;
}
