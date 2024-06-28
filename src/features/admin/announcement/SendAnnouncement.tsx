import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { AnnouncementType, CreateAnnouncementDto } from "./type";
import { useSendAnnouncementMutation } from "./AnnouncementApiSlice";
import { useResponsiveStack } from "@/services/responsive";
import Header from "@/components/Header";
import { InputField } from "@/components/inputs/InputField";
import { SelectField } from "@/components/inputs/SelectField";

const SendAnnouncement: React.FC = () => {
  const { isSmallDown } = useResponsiveStack();
  const [sendAnnouncement, { isLoading }] = useSendAnnouncementMutation();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateAnnouncementDto>();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };
  const [user, setUser] = useState<string>("");
  const onSubmit = async (data: CreateAnnouncementDto) => {
    console.log("data", data);
    await sendAnnouncement(data)
      .then((result) => {
        console.log("result", result);
        enqueueSnackbar("Announcement sent successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Announcement send failed", {
          variant: "error",
        });
      });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Header pageName={"Add Announcement"} message="" />

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 5,
        }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              width: isSmallDown ? "100%" : "75%",
              mx: "auto",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack>
              <SelectField
                label="User Type"
                inputProps={{
                  ...register("type", { required: true, onChange: onChange }),
                }}
                error={Boolean(errors.type)}
                helperText={Boolean(errors.type) === true ? "Required" : " "}
                options={AnnouncementType}
              />
            </Stack>
            {user === "SPECIFIC_USER" && (
              <Stack>
                <InputField
                  label={"User Name"}
                  inputProps={register("userName", { required: true })}
                  error={Boolean(errors.userName)}
                  helperText={
                    Boolean(errors.userName) === true ? "Required" : " "
                  }
                  variant="outlined"
                />
              </Stack>
            )}

            <Stack
              direction={isSmallDown ? "column" : "row"}
              sx={{ gap: isSmallDown ? 0 : 2 }}
              spacing={2}
            >
              <InputField
                label="Announcement Title"
                inputProps={register("title", {
                  required: true,
                  minLength: 3,
                })}
                error={Boolean(errors.title)}
                helperText={Boolean(errors.title) === true ? "Required" : " "}
                variant={"outlined"}
              />
            </Stack>

            <Stack
              direction={isSmallDown ? "column" : "row"}
              sx={{ gap: 2 }}
              spacing={2}
            >
              <InputField
                label="Announcement Description"
                inputProps={register("description", {
                  required: true,
                  minLength: 3,
                })}
                error={Boolean(errors.description)}
                helperText={
                  Boolean(errors.description) === true ? "Required" : " "
                }
                variant={"outlined"}
                multiline
                rows={4}
              />
            </Stack>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <LoadingButton
            type="submit"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            loading={isLoading}
          >
            Add Announcement
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SendAnnouncement;
