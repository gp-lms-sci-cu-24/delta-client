import { DayOfWeek, Time } from "@utils/types";
import { ClassType, Location, Course, Professor } from "@features/shared";
export interface ScheduleDto {
  day: DayOfWeek;
  startTime: Time;
  endTime: Time;
  location: Location;
  classType: ClassType;
  course: Course;
  courseGroup: number;
  professor: Professor;
}
