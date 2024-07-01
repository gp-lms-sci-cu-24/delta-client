import { DayOfWeek, Time } from "@utils/types";

export function dayOfWeekToNumber(day: DayOfWeek): number {
  switch (day) {
    case DayOfWeek.SATURDAY:
      return 0;
    case DayOfWeek.SUNDAY:
      return 1;
    case DayOfWeek.MONDAY:
      return 2;
    case DayOfWeek.TUESDAY:
      return 3;
    case DayOfWeek.WEDNESDAY:
      return 4;
    case DayOfWeek.THURSDAY:
      return 5;
    case DayOfWeek.FRIDAY:
      return 0;
  }
}

export function dayAndTimeToDate(day: DayOfWeek, time: Time, date = new Date()): Date {
  const timeParts = time.split(":");
  date.setHours(parseInt(timeParts[0], 10));
  date.setMinutes(parseInt(timeParts[1], 10));
  date.setSeconds(0);
  date.setMilliseconds(0);

  const curDay = (date.getDay() + 1) % 7;
  const dayDiff = dayOfWeekToNumber(day) - curDay;

  return new Date(date.getTime() + 1000 * 60 * 60 * 24 * dayDiff);
}
