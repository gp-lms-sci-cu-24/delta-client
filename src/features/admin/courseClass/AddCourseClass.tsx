import { useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import {
  CreateCourseClassDto,
  CreateCourseClassTimingDto,
  YearSemester,
} from "./type";
import { useForm } from "react-hook-form";
import { ScheduleInput } from "./components/ScheduleInput";
import { AutoCompleteProffesor } from "./components/AutoCompleteProfessor";
import LoadingButton from "@mui/lab/LoadingButton";
import { AutoCompleteCourse } from "./components/AutoCompleteCourse";
import { useAddCourseClassMutation } from "./courseClassApiSlice";
import Header from "@/components/Header";
import Selector from "@/components/Selector";
import { useResponsiveStack } from "@/services/responsive";

export default function AddCourseClass() {
  const { isSmallDown } = useResponsiveStack();
  const [course, setCourse] = useState<string>();
  const [professor, setProfessor] = useState<string>();
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [timings, setTimings] = useState<CreateCourseClassTimingDto[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourseClassDto>();

  const semesterOptions = Object.values(YearSemester);

  const yearsOptions = [2024, 2025, 2023];
  const formatYearsOptions = (years: number[]) => {
    return years.map((year) => `${year} / ${year + 1}`);
  };

  const [addCourseClass, { isLoading }] = useAddCourseClassMutation();
  const onSubmit = (data: CreateCourseClassDto) => {
    data.adminProfessor = professor ?? "";
    data.courseCode = course ?? "";
    data.semester = selectedSemester ?? "";
    data.year = Number(selectedYear == null ? "0" : selectedYear.split("/")[0]);
    data.timings = timings ?? [];
    addCourseClass(data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Box sx={{ p: 2 }}>
      <Header pageName={"Add Course Class"} message="" />
      <Box
        sx={{
          width: isSmallDown ? "100%" : "75%",
          mx: "auto",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          mt: isSmallDown ? 2 : 5,
        }}
      >
        <Stack
          sx={{ width: isSmallDown ? "100%" : "85%", mb: 2, mx: "auto" }}
          direction={"column"}
        >
          <Box sx={{ mb: 2 }}>
            <AutoCompleteCourse value={course ?? ""} onChange={setCourse} />
          </Box>
          <Selector
            value={selectedSemester ?? ""}
            setValue={setSelectedSemester}
            options={semesterOptions}
            title="Semester"
            label="Choose Semester"
          />
          <Box sx={{ mt: 2 }}>
            <AutoCompleteProffesor
              value={professor ?? ""}
              onChange={setProfessor}
            />
          </Box>
          <Box sx={{ my: 2 }} />
          <Stack direction={isSmallDown ? "column" : "row"} gap={2}>
            <Selector
              value={selectedYear ?? ""}
              setValue={setSelectedYear}
              options={formatYearsOptions(yearsOptions)}
              title="Year"
              label="Choose Year"
            />
            <TextField
              inputProps={{
                ...register("maxCapacity", {
                  required: true,
                  minLength: 2,
                  valueAsNumber: true,
                  min: 1,
                }),
                type: "number",
                min: 1,
              }}
              error={Boolean(errors.maxCapacity)}
              helperText={
                errors.maxCapacity?.type === "required"
                  ? "Required"
                  : errors.maxCapacity?.type === "min"
                  ? "Minimum value is 1"
                  : " "
              }
              sx={{ width: isSmallDown ? "100%" : "30%" }}
              label="Max Capacity"
              variant={"outlined"}
              rows={1}
            />
          </Stack>
          <ScheduleInput value={timings} onChange={setTimings} />
          <Stack direction={isSmallDown ? "column" : "row"} gap={2}></Stack>
        </Stack>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          sx={{ textTransform: "capitalize" }}
          variant="contained"
          loading={isLoading}
        >
          add Course Class
        </LoadingButton>
      </Box>
    </Box>
  );
}
