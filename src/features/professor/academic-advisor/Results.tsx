import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import StudentInfoCard from "./components/StudentInfoCard";
import { useUserStateQuery } from "@/features/auth/authApiSlice";
import { useGetStudentByIdQuery } from "@features/admin/student/studentApiSlice";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { columnsLevel } from "./Levels";
import { StudentDto } from "@features/admin/student/type";
import { YearSemester } from "@features/admin/course-class/type";
import {
  usePostStudentGradeMutation,
  useGetStudentResultByYearAndSemesterQuery,
} from "./courseResultApiSlice";
import { useState } from "react";
import { QueyStudentResultByYearAndSemester } from "./type";
import { SelectField } from "@/components/inputs/SelectField";
import { CourseResult, AssignGradeQuery } from "./type";
import { useSnackbar } from "notistack";

interface rowData {
  id: string;
  code: string;
  subject: string;
  semester: string;
  degree: string;
  rate: string;
  group: string;
  statues: string;
}

const semesterOptions: string[] = Object.values(YearSemester);
const yearOptions = ["2023", "2024", "2025"];
interface Props {
  id?: string;
}
function Results({ id }: Props) {
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [selectedSemester, setSelectedSemester] = useState<string>(YearSemester.FIRST);
  let { data, isLoading } = useGetStudentByIdQuery(id !== undefined ? id : "");
  const { enqueueSnackbar } = useSnackbar();
  const studetnQuery = useUserStateQuery();
  if (!id) {
    data = studetnQuery.data as StudentDto;
    id = data.username;
    isLoading = false;
  }
  const [assignGrade] = usePostStudentGradeMutation();
  const { data: results, isLoading: resLoading } = useGetStudentResultByYearAndSemesterQuery({
    year: selectedYear,
    student: id ?? "2027115",
    semester: selectedSemester,
  } as QueyStudentResultByYearAndSemester);

  console.log("results", results);
  console.log("year", selectedYear);
  console.log("semester", selectedSemester);

  function structerdRes(results: CourseResult[] | undefined): GridRowsProp<rowData> {
    if (!results) return [];
    return results?.map((e) => {
      return {
        id: e.courseClass.course.code.toString(),
        code: id ? id.toString() : "",
        group: e.courseClass.groupNumber.toString(),
        subject: e.courseClass.course.code.toString(),
        semester: e.courseClass.semester.toString(),
        degree: e.grade.toString(),
        rate: e.rate.toString(),
        statues: e.state.toString(),
      };
    });
  }

  function handleAssign(_oldrow: rowData, newrow: rowData) {
    const q: AssignGradeQuery = {
      student: newrow.id,
      year: selectedYear,
      semester: selectedSemester,
      group: Number(newrow.group),
      grade: Number(newrow.degree),
      course: newrow.subject,
    };
    assignGrade(q)
      .unwrap()
      .then(() => {
        enqueueSnackbar(
          `Grade ${newrow.degree} assigend to student ${id} successfully in course ${newrow.code}`,
          {
            variant: "success",
          },
        );
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar(
          `Grade ${newrow.degree} failed to assign to student ${id} in course ${newrow.code} \n because ${e.data.message}`,
          {
            variant: "error",
          },
        );
      });
  }
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
      <DataGrid
        rows={structerdRes(results)}
        columns={columnsLevel}
        loading={resLoading}
        processRowUpdate={(newrow, oldrow) => {
          handleAssign(oldrow, newrow);

          return newrow;
        }}
        hideFooter
      />
    </Box>
  );
}

export default Results;
