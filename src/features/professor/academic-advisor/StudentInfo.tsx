import { Box } from "@mui/material";
import StudentInfoCard from "./components/StudentInfoCard";
import Loading from "@/components/Loading";
import CurrentTable from "@features/student/course-registration/components/CurrentTable";
import { useGetStudentByIdQuery } from "@features/admin/student/studentApiSlice";
interface Props {
  id?: string;
}
export default function StudentInfo({ id }: Props) {
  const { data, isLoading } = useGetStudentByIdQuery(
    id !== undefined ? id : ""
  );

  if (isLoading) return <Loading />;
  return (
    <>
      <StudentInfoCard
        username={data?.username}
        creditHours={data?.creditHours}
        creditHoursSemester={data?.creditHoursSemester}
        level={data?.level}
        fatherName={data?.fatherName}
        grandfatherName={data?.grandfatherName}
        firstName={data?.firstName}
        gpa={data?.gpa}
        department={data?.department}
        joiningYear={data?.joiningYear}
        profilePicture={data?.profilePicture}
      />

      <Box sx={{ m: 2 }}>
        <CurrentTable />
      </Box>
    </>
  );
}
