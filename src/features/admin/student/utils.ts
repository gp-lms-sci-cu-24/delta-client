import { Level } from "./type";

export const getReadableLeveL = (level: Level) => {
  switch (level) {
    case Level.LEVEL_1:
      return "Freshman";
    case Level.LEVEL_2:
      return "Sophomore";
    case Level.LEVEL_3:
      return "Junior";
    case Level.LEVEL_4:
      return "Senior";
    default:
      return "";
  }
};

export const getLevelNumber = (level: Level) => {
  switch (level) {
    case Level.LEVEL_1:
      return 1;
    case Level.LEVEL_2:
      return 2;
    case Level.LEVEL_3:
      return 3;
    case Level.LEVEL_4:
      return 4;
    default:
      return 0;
  }
};
