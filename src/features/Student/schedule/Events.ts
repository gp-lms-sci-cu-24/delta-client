type ProcessedEvent = {
  event_id: number;
  title: string;
  course?: string;
  professor?: string;
  start: Date;
  end: Date;
  location: string;
  color: string;
  group: string;
};

const events: ProcessedEvent[] = [
  {
    event_id: 1,
    title: "lab CS402",
    course: "CS408",
    professor: "mahmoud esmat",
    start: new Date("2024/4/15 11:00"),
    end: new Date("2024/4/15 14:00"),
    location: "Computer lab in the Mathematics Department",
    color: "darkorange",
    group: "group 1",
  },
  {
    event_id: 2,
    title: "Lecture CS402",
    start: new Date("2024/4/15 14:00"),
    end: new Date("2024/4/15 16:00"),
    location: "auditorium 10",
    color: "darkcyan",
    group: "group 2",
    professor: "rasha ",
    course: "CS208",
  },
  {
    event_id: 3,
    title: "Section M494",
    start: new Date("2024/4/17 10:00"),
    end: new Date("2024/4/17 12:00"),
    location: "auditorium 17",
    color: "darkblue",
    group: "group 1",
    professor: "nour elhoda ",
    course: "M494",
  },
  {
    event_id: 4,
    title: "Lab CS402",
    start: new Date("2024/4/18 11:00"),
    end: new Date("2024/4/18 14:00"),
    location: "Computer lab in the Mathematics Department",
    color: "darkorange",
    group: "group 2",
    professor: "hagar ",
    course: "CS402",
  },
  {
    event_id: 5,
    title: "Lab CS407",
    start: new Date("2024/4/18 14:00"),
    end: new Date("2024/4/18 17:00"),
    location: "Computer lab in the Botany Department",
    color: "darkorange",
    group: "group 2",
    professor: "nour",
    course: "CS407",
  },
  {
    event_id: 6,
    title: "Lab CS427",
    start: new Date("2024/4/18 17:00"),
    end: new Date("2024/4/18 20:00"),
    location: "Computer lab in the Mathematics Department",
    color: "darkorange",
    group: "group 1",
    professor: "elzo",
    course: "CS427",
  },
  {
    event_id: 7,
    title: "Lecture CS408",
    start: new Date("2024/4/13 08:00"),
    end: new Date("2024/4/13 10:00"),
    location: "auditorium 4",
    color: "darkcyan",
    group: "group 2",
    professor: "ereg",
    course: "CS408",
  },
  {
    event_id: 8,
    title: "Lecture M494",
    start: new Date("2024/4/13 10:00"),
    end: new Date("2024/4/13 12:00"),
    location: "auditorium 5",
    color: "darkcyan",
    group: "group 1",
    professor: "nour elhoda ",
    course: "M494",
  },
  {
    event_id: 9,
    title: "Lecture CS427",
    start: new Date("2024/4/13 12:00"),
    end: new Date("2024/4/13 14:00"),
    location: "auditorium 17",
    color: "darkcyan",
    group: "group 1",
    professor: "elzo",
    course: "CS427",
  },
  {
    event_id: 10,
    title: "Lecture CS407",
    start: new Date("2024/4/13 14:00"),
    end: new Date("2024/4/13 16:00"),
    location: "auditorium 8",
    color: "darkcyan",
    group: "group 2",
    professor: "rasha",
    course: "CS407",
  },
];
export default events;
