interface ICourses {
  title: string;
  imageUrl: string;
}
import Image from "/src/features/student/schedule/assets/exam.jpg"
const Schedules: ICourses[] = [
  {
    title: "term schedule",
    imageUrl: Image,
  },
  {
    title: "mid term schedule",
    imageUrl: Image,
  },
];

export { Schedules };
