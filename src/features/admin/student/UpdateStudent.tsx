import React, { useEffect, useState } from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Gender, updateStudentDto } from "./type";
import {
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} from "./studentApiSlice";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { StudentGender } from "./StudentData";
import { useGetAllDepartmentQuery } from "../departments/departmentsApiSlice";
import NotFound from "@/components/NotFound";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { InputField } from "@/components/inputs/InputField";
import {
  genderValidation,
  joiningYearValidation,
  nameValidation,
} from "@/constants/validations";
import { useForm } from "react-hook-form";
import { SelectField } from "@/components/inputs/SelectField";
import CustomLoadingButton from "@/components/buttons/CustomLoadingButton";

function UpdateStudent() {
  const { studentCode } = useParams();
  const studentQuery = useGetStudentByIdQuery(studentCode || "__");
  console.log("studentQuery", studentQuery?.data);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [fatherName, setFatherName] = React.useState("");
  const [grandfatherName, setGrandfatherName] = React.useState("");
  const [joiningYear, setJoiningYear] = React.useState("");
  const [address, setAddress] = useState<string>("");
  const [gender, setGender] = useState<string>(Gender.MALE);
  const [departmentCode, setDepartmentCode] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [updateStudent, { isLoading }] = useUpdateStudentMutation();

  const departmentQuery = useGetAllDepartmentQuery({ pageNo: 0, pageSize: 20 });
  const departmentsData = departmentQuery.data?.content || [];

  const extractedData = departmentsData.map((item) => ({
    value: item.code,
    label: item.name,
  }));
  const {
    register,
    formState: { errors },
  } = useForm<updateStudentDto>();

  useEffect(() => {
    setFirstName(studentQuery.data?.firstName ?? "");
    setLastName(studentQuery.data?.lastname ?? "");
    setFatherName(studentQuery.data?.fatherName ?? "");
    setGrandfatherName(studentQuery.data?.grandfatherName ?? "");
    setJoiningYear(studentQuery.data?.joiningYear ?? "");
    setAddress(studentQuery.data?.address ?? "");
    setGender(studentQuery.data?.gender ?? Gender.MALE);
    setDepartmentCode(studentQuery.data?.department.code ?? "GEN");
  }, []);
  if (!studentCode || studentQuery.isError) {
    return <NotFound home="/app" />;
  }

  if (studentQuery.isLoading) {
    return <Loading />;
  }
  const onSubmit = () => {
    const updateStudentdto: updateStudentDto = {
      code: studentCode,
      data: {
        firstName: firstName,
        lastname: lastName,
        fatherName: fatherName,
        grandfatherName: grandfatherName,
        address: address,
        gender: gender == Gender.MALE ? Gender.MALE : Gender.FEMALE,
        joining_year: joiningYear,
        department_code: departmentCode,
      },
    };
    console.log("data", updateStudentdto);

    updateStudent(updateStudentdto)
      .unwrap()
      .then((p) => {
        console.log(p);
        enqueueSnackbar(`Student updated successfully`, {
          variant: "success",
        });
      })
      .catch((e) => {
        console.log("error", e);
        enqueueSnackbar(`failed to update student`, {
          variant: "error",
        });
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Header pageName={"Updated Student"} message="" />
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: isSmallScreen ? "100%" : "75%",
          mx: "auto",
        }}
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
      >
        <Stack direction={isSmallScreen ? "column" : "row"} sx={{ gap: 2 }}>
          <InputField
            label="First Name"
            value={firstName}
            setValue={(e) => setFirstName(e.target.value)}
            variant={"outlined"}
            inputProps={register("data.firstName", {
              ...nameValidation,
              deps: ["data.firstName"],
            })}
            error={Boolean(errors.data?.firstName)}
            helperText={
              Boolean(errors.data?.firstName) === true ? "Required" : " "
            }
          />
          <InputField
            label="Last Name"
            value={lastName}
            setValue={(e) => setLastName(e.target.value)}
            variant={"outlined"}
            inputProps={register("data.lastname", {
              ...nameValidation,
              deps: ["data.lastname"],
            })}
            error={Boolean(errors.data?.lastname)}
            helperText={
              Boolean(errors.data?.lastname) === true ? "Required" : " "
            }
          />
        </Stack>
        <Stack direction={isSmallScreen ? "column" : "row"} sx={{ gap: 2 }}>
          <InputField
            label="Father Name"
            value={fatherName}
            setValue={(e) => setFatherName(e.target.value)}
            variant={"outlined"}
            inputProps={register("data.fatherName", {
              ...nameValidation,
              deps: ["data.fatherName"],
            })}
            error={Boolean(errors.data?.fatherName)}
            helperText={
              Boolean(errors.data?.fatherName) === true ? "Required" : " "
            }
          />
          <InputField
            label="Grandfather Name"
            value={grandfatherName}
            setValue={(e) => setGrandfatherName(e.target.value)}
            variant={"outlined"}
            inputProps={register("data.grandfatherName", {
              ...nameValidation,
              deps: ["data.grandfatherName"],
            })}
            error={Boolean(errors.data?.grandfatherName)}
            helperText={
              Boolean(errors.data?.grandfatherName) === true ? "Required" : " "
            }
          />
        </Stack>
        <Stack direction={isSmallScreen ? "column" : "row"} sx={{ gap: 2 }}>
          <InputField
            label="Joining Year"
            value={joiningYear}
            setValue={(e) => setJoiningYear(e.target.value)}
            variant={"outlined"}
            inputProps={register("data.joining_year", {
              ...joiningYearValidation,
              deps: ["data.joining_year"],
            })}
            error={Boolean(errors.data?.joining_year)}
            helperText={
              Boolean(errors.data?.joining_year) === true ? "Required" : " "
            }
          />
        </Stack>
        <Stack direction={isSmallScreen ? "column" : "row"} sx={{ gap: 2 }}>
          <InputField
            label="Address"
            value={address || ""}
            setValue={(e) => setAddress(e.target.value)}
            variant={"outlined"}
            inputProps={register("data.address", {
              ...nameValidation,
              deps: ["data.address"],
            })}
            error={Boolean(errors.data?.address)}
            helperText={
              Boolean(errors.data?.address) === true ? "Required" : " "
            }
          />
        </Stack>
        <Stack direction={isSmallScreen ? "column" : "row"} sx={{ gap: 2 }}>
          <SelectField
            label="Gender"
            value={gender}
            setValue={(e) => setGender(e.target.value)}
            options={StudentGender}
            inputProps={register("data.gender", {
              ...genderValidation,
              deps: ["data.gender"],
            })}
            error={Boolean(errors.data?.gender)}
            helperText={
              Boolean(errors.data?.gender) === true ? "Required" : " "
            }
          />
          <SelectField
            label="Department"
            value={departmentCode}
            setValue={(e) => setDepartmentCode(e.target.value)}
            options={extractedData}
            inputProps={register("data.department_code", { required: true })}
            error={Boolean(errors.data?.department_code)}
            helperText={
              Boolean(errors.data?.department_code) === true ? "Required" : " "
            }
          />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomLoadingButton
            size="medium"
            title="update student"
            customSx={{ textTransform: "capitalize" }}
            variant="contained"
            onClick={onSubmit}
            loading={isLoading}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default UpdateStudent;
