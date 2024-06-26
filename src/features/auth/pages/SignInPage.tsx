import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { isFetchBaseQueryError } from "@app/api";
import { useLoginMutation } from "../authApiSlice";
import { LoginInputs } from "../types";
import { setCredentials } from "../authSlice";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PasswordField from "@components/PasswordField";
import LoadingButton from "@mui/lab/LoadingButton";
import ROUTES from "@/constants/routes";
import loginSchema from "../loginScheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { CssBaseline, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useResponsiveStack } from "@/services/responsive";

export default function SignInPage() {
  /** hooks */
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isXSmall } = useResponsiveStack();
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading: isLoadingForm },
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const from = location.state?.from?.pathname || ROUTES.HOME;

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const loginResponse = await login(data).unwrap();
      dispatch(setCredentials(loginResponse.access_token));
      reset();
      navigate(from);
    } catch (err) {
      if (
        isFetchBaseQueryError(err) &&
        (err as FetchBaseQueryError).status === 401
      ) {
        setLoginError("Invalid username or password. Please try again.");
      } else if (
        isFetchBaseQueryError(err) &&
        (err as FetchBaseQueryError).status === 400
      ) {
        setLoginError("Bad Credential data.");
      } else {
        setLoginError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      overflow="hidden"
      position="relative"
      sx={{
        backgroundColor: "#4E9BFF",
      }}
    >
      <CssBaseline />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: { xs: "90%", sm: "80%", md: "60%" },
          zIndex: 1,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          mt={3}
          width={{ xs: "70%", sm: "60%", md: "50%" }}
        >
          <TextField
            error={Boolean(errors.username)}
            helperText={errors.username && errors.username.message}
            variant="filled"
            label="Student Code or Username"
            multiline={false}
            fullWidth
            rows={1}
            inputProps={{
              disableUnderline: true,
              sx: {
                borderRadius: 2,
                backgroundColor: "#F2F2F2",
                "&:hover": {
                  backgroundColor: "#F2F2F2",
                },
                "&.Mui-focused": {
                  backgroundColor: "#F2F2F2",
                },
              },
              ...register("username"),
            }}
          />

          <PasswordField
            error={Boolean(errors.password)}
            helperText={errors.password && errors.password.message}
            inputProps={{ ...register("password") }}
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            loading={isLoading || isLoadingForm}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#333333",
              borderRadius: 2,
              height: 45,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Sign In
          </LoadingButton>
          <Typography component="span" color="#d32f2f">
            {loginError}
          </Typography>
          <br />
          <Link style={{ color: "#ffffffff" }} to={ROUTES.AUTH_FORGET_PASSWORD}>
            Forgot your Password?
          </Link>
        </Box>
      </Stack>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: isXSmall ? "5%" : "40%",
          transform: "translate(-60%, -40%)",
          width: isXSmall ? 400 : 731,
          height: isXSmall ? 400 : 731,
          borderRadius: "50%",
          backgroundColor: "#A6C8FF",
          zIndex: 0,
          opacity: 0.5,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: isXSmall ? "80%" : "80%",
          left: "10%",
          right: "70%",
          transform: "translate(-80%, -0%)",
          width: 331,
          height: 331,
          borderRadius: "50%",
          backgroundColor: "#A6C8FF",
          zIndex: 0,
          opacity: 0.5,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: isXSmall ? "85%" : "70%",
          left: isXSmall ? "90%" : "100%",
          right: "10%",
          transform: "translate(-80%, -0%)",
          width: isXSmall ? 190 : 705,
          height: isXSmall ? 190 : 705,
          borderRadius: "50%",
          backgroundColor: "#A6C8FF",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: isXSmall ? "62%" : "20%",
          left: "100%",
          right: isXSmall ? "5%" : "10%",
          transform: "translate(-50%, 50%)",
          width: isXSmall ? 180 : 399,
          height: isXSmall ? 180 : 399,
          borderRadius: "50%",
          backgroundColor: "#A6C8FF",
          zIndex: 0,
        }}
      />
    </Stack>
  );
}
