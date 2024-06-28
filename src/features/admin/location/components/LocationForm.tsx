import React from "react";
import { ImageListType } from "react-images-uploading";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { LocationDto } from "../types";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import {
  useAddLocationMutation,
  useUploadLocationImageMutation,
} from "../locationApiSlice";
import { useResponsiveStack } from "@/services/responsive";
import { isFetchBaseQueryError } from "@/app/api";
import { InputField } from "@/components/inputs/InputField";
import FileUpload from "@/components/file-uploader";

const LocationForm: React.FC = () => {
  const { isSmallDown } = useResponsiveStack();
  const [image, setImage] = React.useState<ImageListType>([]);
  const [addLocation, { isLoading }] = useAddLocationMutation();
  const [uploadLoctionImage, uploadImageState] =
    useUploadLocationImageMutation();
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    console.log("imageList", imageList[0]?.file);
    setImage(imageList);
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationDto>();

  const onSubmit = async (data: LocationDto) => {
    try {
      const location = await addLocation(data).unwrap();
      enqueueSnackbar(`Location ${location.name} created successfully`, {
        variant: "success",
      });

      if (image[0]?.file) {
        enqueueSnackbar(`Uploading Location image...`, {
          variant: "info",
          // persist: uploadImageState.isLoading,
          autoHideDuration: null,
          key: "uploading-image-toast",
        });

        const formData = new FormData();
        formData.append("image", image[0].file);
        await uploadLoctionImage({
          id: location.id,
          formData,
        }).unwrap();

        closeSnackbar("uploading-image-toast");
        console.log(`Image for location ${location.id} uploaded successfully`);
        enqueueSnackbar(
          `Image for location ${location.name} uploaded successfully`,
          {
            variant: "success",
          },
        );
      }
    } catch (error) {
      if (isFetchBaseQueryError(error) && error?.status === 409) {
        const data = error.data as { message?: string };

        enqueueSnackbar(`Conflict :${data.message}`, {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Error in create Location", {
          variant: "error",
        });
      }
      console.log(error);
    } finally {
      closeSnackbar("uploading-image-toast");
    }
  };

  return (
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
          <Stack
            direction={isSmallDown ? "column" : "row"}
            sx={{ gap: isSmallDown ? 0 : 2 }}
            spacing={2}
          >
            <InputField
              label="location Name"
              inputProps={register("name", {
                required: true,
                minLength: 3,
              })}
              error={Boolean(errors.name)}
              helperText={Boolean(errors.name) === true ? "Required" : " "}
              variant={"outlined"}
            />
            <InputField
              label="path"
              inputProps={register("path", {
                required: true,
                minLength: 3,
              })}
              error={Boolean(errors.path)}
              helperText={Boolean(errors.path) === true ? "Required" : " "}
              variant={"outlined"}
            />
          </Stack>
          <Stack
            direction={isSmallDown ? "column" : "row"}
            sx={{ gap: 2 }}
            spacing={2}
          >
            <InputField
              label="max capacity"
              inputProps={register("maxCapacity", {
                required: true,
                valueAsNumber: true,
              })}
              error={Boolean(errors.maxCapacity)}
              helperText={
                Boolean(errors.maxCapacity) === true ? "Required" : " "
              }
              variant={"outlined"}
            />
          </Stack>
          <Stack
            direction={isSmallDown ? "column" : "row"}
            sx={{ gap: 2 }}
            spacing={2}
          >
            <InputField
              label="location Info"
              inputProps={register("info", {
                required: true,
                minLength: 3,
              })}
              error={Boolean(errors.info)}
              helperText={Boolean(errors.info) === true ? "Required" : " "}
              variant={"outlined"}
              multiline
              rows={2}
            />
          </Stack>
        </Box>
        <Stack
          sx={{ width: isSmallDown ? "100%" : "85%", mb: 2, mx: "auto" }}
          direction={"column"}
        >
          <FileUpload onChange={onChange} value={image} />
        </Stack>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          type="submit"
          sx={{ textTransform: "capitalize" }}
          variant="contained"
          loading={isLoading}
        >
          Create Location
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default LocationForm;
