import { DataGrid } from "@mui/x-data-grid";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import StudentInfoCard from "./components/StudentInfoCard";
import { useUserStateQuery } from "@/features/auth/authApiSlice";
import { useGetStudentByIdQuery } from "@features/admin/student/studentApiSlice";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { columnsLevel, rowsLevelOne } from "./Levels";
import { StudentDto } from "@features/admin/student/type";

interface Props {
  id?: string;
}
const semesterOptions = ["Spring", "Summer", "Fall", "Winter"];
const yearOptions = [2023, 2024, 2025];

function Results({ id }: Props) {
  let { data, isLoading } = useGetStudentByIdQuery(id !== undefined ? id : "");
  const studetnQuery = useUserStateQuery();
  if (id === undefined) {
    data = studetnQuery.data as StudentDto;
    isLoading = false;
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
          <FormControl>
            <InputLabel id="semester-label">Semester</InputLabel>
            <Select
              labelId="semester-label"
              id="semester"
              value={"Summer"}
              label="Semester"
              sx={{ width: "100%" }}
            >
              {semesterOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ p: 1, m: 1 }}>
          <FormControl>
            <InputLabel id="year-label">Year</InputLabel>
            <Select labelId="year-label" id="year" value={"2023"} label="year">
              {yearOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <DataGrid
        rows={rowsLevelOne}
        columns={columnsLevel}
        loading={false}
        hideFooter
      />
    </Box>
  );
}

export default Results;
