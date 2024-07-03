import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import {
  UpdateProfessor,
  degreeVaildation,
  degrees,
} from "./types";
import {
  useGetProfessorQuery,
  useUpdateProfessorMutation,
} from "./professorApiSlice";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useResponsiveStack } from "@/services/responsive";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { InputField } from "@/components/inputs/InputField";
import { emailValidation, genderValidation, nameValidation, usernameValidation } from "@/constants/validations";
import { SelectField } from "@/components/inputs/SelectField";
import { StudentGender } from "../student/StudentData";
import CustomLoadingButton from "@/components/buttons/CustomLoadingButton";

function EditProfessor() {
  const { userName } = useParams();
  console.log("username", userName);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading: loading } = useGetProfessorQuery(userName || "__");
  const [updateProfessor, { isLoading }] = useUpdateProfessorMutation();
  const { isSmallDown } = useResponsiveStack();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfessor>();

  useEffect(() => {
    if (data) {
      setValue("data.degree", data.degree);
      setValue("data.email", data.email);
      setValue("data.firstName", data.firstName);
      setValue("data.gender", data.gender);
      setValue("data.lastName", data.lastName);
      setValue("username", data.username);
    }
  }, [data, setValue]);
  const onSubmit: SubmitHandler<UpdateProfessor> = async (data) => {
    console.log("data", data);
    await updateProfessor(data)
      .then(() => {
        enqueueSnackbar("Professor Updated successfully", {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("Error in Update Professor", {
          variant: "error",
        });
      });
  };
  if (loading) return <Loading></Loading>;

  return (
    <Box sx={{ p: 3 }}>
      <Header pageName={"Edit Professor"} message="" />
      <Box
        component="form"
        sx={{
          width: isSmallDown ? "100%" : "75%",
          mx: "auto",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Stack
          direction={isSmallDown ? "column" : "row"}
          sx={{ gap: isSmallScreen ? 0 : 2 }}
        >
          <InputField
            label="First Name"
            inputProps={register("data.firstName", {...nameValidation,deps:["data.firstName"]})}
            error={Boolean(errors.data?.firstName)}
            helperText={
              Boolean(errors.data?.firstName) === true ? "Required" : " "
            }
            variant={"outlined"}
          />
          <InputField
            label="Last Name"
            inputProps={register("data.lastName", {...nameValidation,deps:["data.lastName"]})}
            error={Boolean(errors.data?.lastName)}
            helperText={
              Boolean(errors.data?.lastName) === true ? "Required" : " "
            }
            variant={"outlined"}
          />
        </Stack>
        <InputField
          label="username"
          inputProps={register("username", {...usernameValidation,deps:["username"]})}
          error={Boolean(errors.username)}
          helperText={Boolean(errors.username) === true ? "Required" : " "}
          variant={"outlined"}
        />

        <Stack
          direction={isSmallScreen ? "column" : "row"}
          sx={{ gap: isSmallScreen ? 0 : 2, mt: 2 }}
        >
          <SelectField
            label="Gender"
            inputProps={register("data.gender", {...genderValidation,deps:["data.gender"]})}
            defaultValue={data?.gender}
            error={Boolean(errors.data?.gender)}
            helperText={
              Boolean(errors.data?.gender) === true ? "Required" : " "
            }
            options={StudentGender}
          />
          <SelectField
            label="Degree"
            inputProps={register("data.degree", {...degreeVaildation,deps:["data.degree"]})}
            error={Boolean(errors.data?.degree)}
            helperText={
              Boolean(errors.data?.degree) === true ? "Required" : " "
            }
            options={degrees}
            defaultValue={data?.degree}
          />
        </Stack>
        <InputField
          label="Email"
          inputProps={register("data.email", emailValidation)}
          error={Boolean(errors.data?.email)}
          helperText={Boolean(errors.data?.email) === true ? "Required" : " "}
          variant={"outlined"}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomLoadingButton
            title="Upadate Professor"
            loading={isLoading}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default EditProfessor;
