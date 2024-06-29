import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import { CreateProfessor, degreeVaildation, degrees } from "./types";
import { useAddProfessorMutation } from "./professorApiSlice";
import { useSnackbar } from "notistack";
import { StudentGender } from "../student/StudentData";
import { useResponsiveStack } from "@/services/responsive";
import Header from "@/components/Header";
import { InputField } from "@/components/inputs/InputField";
import { PasswordField } from "@/components/inputs/PasswordField";
import { emailValidation, genderValidation, nameValidation, passwordValidation, usernameValidation } from '../../../constants/validations';
import { SelectField } from "@/components/inputs/SelectField";

function AddProfessor() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [AddProfessor, { isLoading }] = useAddProfessorMutation();
  const { isSmallDown } = useResponsiveStack();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProfessor>();

  const onSubmit: SubmitHandler<CreateProfessor> = async (data) => {
    await AddProfessor(data)
      .then((result) => {
        console.log("result", result);
      if (result.error) {
        enqueueSnackbar("Error in create Professor", {
          variant: "error",
        });
      }
      else {
        enqueueSnackbar("Professor created successfully", {
          variant: "success",
        });

       reset();
      }
      })
      .catch((e) => {
        console.error("Error in create Professor", e);
        enqueueSnackbar("Error in create Professor", {
          variant: "error",
        });
      });
  };

  return (
    <Box sx={{ p: 1 }}>
      <Header pageName={"Add Professor"} message="" />
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
            inputProps={register("firstName", {...nameValidation,deps:["firstName"]})}
            error={Boolean(errors.firstName)}
            helperText={Boolean(errors.firstName) === true ? "Required" : " "}
            variant={"outlined"}
          />
          <InputField
            label="Last Name"
            inputProps={register("lastName", {...nameValidation,deps:["lastName"]})}
            error={Boolean(errors.lastName)}
            helperText={Boolean(errors.lastName) === true ? "Required" : " "}
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
          direction={isSmallDown ? "column" : "row"}
          sx={{ gap: isSmallScreen ? 0 : 2 }}
        >
          <PasswordField
            inputProps={register("password", {...passwordValidation,deps:["password"]})}
            error={Boolean(errors.password)}
          />
        </Stack>
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          sx={{ gap: isSmallScreen ? 0 : 2, mt: 2 }}
        >
          <SelectField
            label="Gender"
            inputProps={register("gender", {...genderValidation,deps:["gender"]})}
            error={Boolean(errors.gender)}
            helperText={Boolean(errors.gender) === true ? "Required" : " "}
            options={StudentGender}
          />
          <SelectField
            label="Degree"
            inputProps={register("degree", {...degreeVaildation,deps:["degree"]})}
            error={Boolean(errors.degree)}
            helperText={Boolean(errors.degree) === true ? "Required" : " "}
            options={degrees}
          />
        </Stack>
        <InputField
          label="Email"
          inputProps={register("email", emailValidation)}
          error={Boolean(errors.email)}
          helperText={Boolean(errors.email) === true ? "Required" : " "}
          variant={"outlined"}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
          >
            Create Professor
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddProfessor;
