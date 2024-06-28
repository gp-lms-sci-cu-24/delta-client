import { YearSemester } from "@/features/Admin/courseClass/type";

export interface RegisterCourseQuery {
  courseCode: string;
  year: number;
  semester: YearSemester;
  section: string;
  group: number;
}
