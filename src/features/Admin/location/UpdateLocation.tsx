import { Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  useGetLocationQuery,
  useUpdateLocationMutation,
  useUploadLocationImageMutation,
} from "./locationApiSlice";
import { LocationDto } from "./types";
import { useParams } from "react-router-dom";
import { ImageListType } from "react-images-uploading";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { isFetchBaseQueryError } from "@/app/api";
import NotFound from "@/components/NotFound";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { InputField } from "@/components/inputs/InputField";
import { useResponsiveStack } from "@/services/responsive";
import FileUpload from "@/components/file-uploader";
import { error } from "console";

function UpdateLocation() {
  const { id } = useParams();
  const [image, setImage] = useState<ImageListType>([]);
  const locationQuery = useGetLocationQuery(Number(id) || 0);
  const [updateLocation, { isLoading }] = useUpdateLocationMutation();
  const [uploadLocationImage, uploadImageState] =
    useUploadLocationImageMutation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { isSmallDown } = useResponsiveStack();
console.log("locationid", id);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LocationDto>();

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    console.log("imageList", imageList[0]?.file);
    setImage(imageList);
  };
  useEffect(() => {
    setValue("name", locationQuery.data?.name ?? "");
    setValue("info", locationQuery.data?.info ?? "");
    setValue("path", locationQuery.data?.path ?? "");
    setValue("maxCapacity", locationQuery.data?.maxCapacity ?? 0);
  }, [locationQuery.data, setValue]);
  const onSubmit = async (data: LocationDto) => {
    try {
      const location = await updateLocation({
        id: Number(id),
        data,
      }).unwrap();

      enqueueSnackbar(`Location ${location.name} updated successfully`, {
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
        await uploadLocationImage({
          id: location.id,
          formData,
        }).unwrap();

        closeSnackbar("uploading-image-toast");
        console.log(`Image for Location ${location.id} uploaded successfully`);
        enqueueSnackbar(
          `Image for Location ${location.name} uploaded successfully`,
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
        enqueueSnackbar("Error in update Location", {
          variant: "error",
        });
      }
      console.log(error);
    } finally {
      closeSnackbar("uploading-image-toast");
    }
  };
  if (!id || locationQuery.isError) {
    return <NotFound home="/app" />;
  }
  if (locationQuery.isLoading) {
    return <Loading />;
  }
  return (
    <Box sx={{ p: 1 }}>
      <Header pageName={"Update Location"} message="" margin-bot="1" />
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
            Update Location
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}

export default UpdateLocation;
