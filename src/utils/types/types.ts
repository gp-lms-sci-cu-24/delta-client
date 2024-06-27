export type MakeOptionalExcept<T, K extends keyof T> = Partial<T> & {
  [P in K]: T[P];
};

export enum DayOfWeek {
  MONDAY="MONDAY",
  TUESDAY="TUESDAY",
  WEDNESDAY="WEDNESDAY",
  THURSDAY="THURSDAY",
  FRIDAY="FRIDAY",
  SATURDAY="SATURDAY",
  SUNDAY="SUNDAY",
}
