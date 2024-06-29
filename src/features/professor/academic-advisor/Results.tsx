import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import StudentInfoCard from "./components/StudentInfoCard";
import { useUserStateQuery } from "@/features/auth/authApiSlice";
import { useGetStudentByIdQuery } from "@features/admin/student/studentApiSlice";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { columnsLevel } from "./Levels";
import { StudentDto } from "@features/admin/student/type";
import { YearSemester } from "@features/admin/course-class/type";
import { useGetStudentResultByYearAndSemesterQuery } from "./courseResultApiSlice";
import { useState } from "react";
import { QueyStudentResultByYearAndSemester } from "./type";
import { SelectField } from "@/components/inputs/SelectField";

interface Props {
  id?: string;
}
const semesterOptions: string[] = Object.values(YearSemester);
const yearOptions = ["2023", "2024", "2025"];

function Results({ id }: Props) {
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [selectedSemester, setSelectedSemester] = useState<string>(YearSemester.FIRST);
  let { data, isLoading } = useGetStudentByIdQuery(id !== undefined ? id : "");
  const studetnQuery = useUserStateQuery();
  if (id === undefined) {
    data = studetnQuery.data as StudentDto;
    isLoading = false;
  }

  const { data: results, isLoading: resLoading } = useGetStudentResultByYearAndSemesterQuery({
    year: selectedYear,
    student: id ?? "0",
    semester: selectedSemester,
  } as QueyStudentResultByYearAndSemester);

  console.log("results", results);
  console.log("year", selectedYear);
  console.log("semester", selectedSemester);

  if (isLoading) return <Loading />;
  return (
    <Box sx={{ p: 2, width: "100%", height: "100vh" }}>
      <Header pageName="Results" />
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
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          p: 1,
          m: 1,
          borderRadius: 1,
        }}
      >
        <Box sx={{ p: 1, m: 1 }}>
          <SelectField
            label={"Year"}
            error={false}
            helperText={""}
            options={yearOptions.map((e) => ({ value: e, label: e }))}
            defaultValue={"2024"}
            setValue={(e) => setSelectedYear(e.target.value)}
            value={selectedYear}
          />
        </Box>
        <Box sx={{ p: 1, m: 1 }}>
          <SelectField
            label={"Semester"}
            error={false}
            helperText={""}
            options={semesterOptions.map((e) => ({ value: e, label: e }))}
            defaultValue={"SUMMER"}
            setValue={(e) => setSelectedSemester(e.target.value)}
            value={selectedSemester}
          />
        </Box>
      </Box>
      <DataGrid rows={results} columns={columnsLevel} loading={resLoading} hideFooter />
    </Box>
  );
}

export default Results;
