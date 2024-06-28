import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { StudentGender } from "./StudentData";
import { useGetAllDepartmentQuery } from "../departments/departmentsApiSlice";
import { useAddStudentMutation } from "./studentApiSlice";
import { useSnackbar } from "notistack";
import { createStudentDto } from "./type";
import Header from "@/components/Header";
import { InputField } from "@/components/inputs/InputField";
import {
  codeValidation,
  genderValidation,
  joiningYearValidation,
  nameValidation,
  passwordValidation,
} from "@/constants/validations";
import { PasswordField } from "@/components/inputs/PasswordField";
import { SelectField } from "@/components/inputs/SelectField";
import CustomLoadingButton from "@/components/buttons/CustomLoadingButton";

function AddStudent() {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [addStudent, { isLoading }] = useAddStudentMutation();

  const departmentQuery = useGetAllDepartmentQuery();
  const departmentsData = departmentQuery.data || [];
  console.log("departmentsData", departmentsData);
  const extractedData = departmentsData.map((item) => ({
    value: item.code,
    label: item.name,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createStudentDto>();

  const onSubmit: SubmitHandler<createStudentDto> = (data) => {
    console.log("data", data);
    addStudent(data)
      .unwrap()
      .then(() => {
        enqueueSnackbar(`Student added successfully`, {
          variant: "success",
        });
        reset();
        console.log("ADDED SUCCESSFULLY");
      })
      .catch((e: any) => {
        console.log(e);
        enqueueSnackbar(`failed to add student`, {
          variant: "error",
        });
      });
  };

  return (
    <Box sx={{ p: 1 }}>
      <Header pageName={"Add Student"} message="" />
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",

          width: isSmallScreen ? "100%" : "75%",
          mx: "auto",
        }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Stack direction={isSmallScreen ? "column" : "row"} sx={{ gap: isSmallScreen ? 0 : 2 }}>
          <InputField
            label="First Name"
            inputProps={register("firstName", { ...nameValidation, deps: ["firstName"] })}
            error={Boolean(errors.firstName)}
            helperText={Boolean(errors.firstName) === true ? "Required" : " "}
            variant={"outlined"}
          />
          <InputField
            label="Last Name"
            inputProps={register("lastname", { ...nameValidation, deps: ["lastname"] })}
            error={Boolean(errors.lastname)}
            helperText={Boolean(errors.lastname) === true ? "Required" : " "}
            variant={"outlined"}
          />
        </Stack>
        <Stack direction={isSmallScreen ? "column" : "row"} sx={{ gap: isSmallScreen ? 0 : 2 }}>
          <InputField
            label="Father Name"
            inputProps={register("fatherName", { ...nameValidation, deps: ["fatherName"] })}
            error={Boolean(errors.fatherName)}
            helperText={Boolean(errors.fatherName) === true ? "Required" : " "}
            variant={"outlined"}
          />
          <InputField
            label="Grandfather Name"
            inputProps={register("grandfatherName", {
              ...nameValidation,
              deps: ["grandfatherName"],
            })}
            error={Boolean(errors.grandfatherName)}
            helperText={Boolean(errors.grandfatherName) === true ? "Required" : " "}
            variant={"outlined"}
          />
        </Stack>
        <Stack direction={isSmallScreen ? "column" : "row"} sx={{ gap: isSmallScreen ? 0 : 2 }}>
          <InputField
            label="Joining Year"
            inputProps={register("joining_year", {
              ...joiningYearValidation,
              deps: ["joining_year"],
            })}
            error={Boolean(errors.joining_year)}
            helperText={Boolean(errors.joining_year) === true ? "Required" : " "}
            variant={"outlined"}
          />
        </Stack>
        <Stack direction={isSmallScreen ? "column" : "row"} sx={{ gap: isSmallScreen ? 0 : 2 }}>
          <InputField
            label="Address"
            inputProps={register("address", { ...nameValidation, deps: ["address"] })}
            error={Boolean(errors.address)}
            helperText={Boolean(errors.address) === true ? "Required" : " "}
            variant={"outlined"}
          />
        </Stack>
        <Stack direction={isSmallScreen ? "column" : "row"} sx={{ gap: isSmallScreen ? 0 : 2 }}>
          <InputField
            label="Code"
            inputProps={register("code", { ...codeValidation, deps: ["code"] })}
            error={Boolean(errors.code)}
            helperText={Boolean(errors.code) === true ? "Required" : " "}
            variant={"outlined"}
          />
        </Stack>

        <Stack direction={isSmallScreen ? "column" : "row"} sx={{ gap: isSmallScreen ? 0 : 2 }}>
          <PasswordField
            inputProps={register("password", { ...passwordValidation, deps: ["password"] })}
            error={Boolean(errors.password)}
          />
        </Stack>
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          sx={{ gap: isSmallScreen ? 0 : 2, mt: 2 }}
        >
          <SelectField
            label="Gender"
            inputProps={register("gender", { ...genderValidation, deps: ["gender"] })}
            error={Boolean(errors.gender)}
            helperText={Boolean(errors.gender) === true ? "Required" : " "}
            options={StudentGender}
          />
          <SelectField
            label="Department"
            inputProps={register("department_code", { required: true })}
            error={Boolean(errors.department_code)}
            helperText={Boolean(errors.department_code) === true ? "Required" : " "}
            options={extractedData}
          />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomLoadingButton
            size="medium"
            title="Create User"
            customSx={{ textTransform: "capitalize" }}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default AddStudent;
