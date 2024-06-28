import { YearSemester } from "@features/admin/courseClass/type";

export interface RegisterCourseQuery {
  courseCode: string;
  year: number;
  semester: YearSemester;
  section: string;
  group: number;
}
