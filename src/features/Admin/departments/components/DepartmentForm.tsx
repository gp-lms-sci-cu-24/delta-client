import React from "react";
import { ImageListType } from "react-images-uploading";
import { Box, Stack,  } from "@mui/material";
import {  useForm } from "react-hook-form";
import { Department } from "../types";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import {
  useAddDepartmentMutation,
  useUploadDepartmentImageMutation,
} from "../departmentsApiSlice";
import { useResponsiveStack } from "@/services/responsive";
import { isFetchBaseQueryError } from "@/app/api";
import { InputField } from "@/components/inputs/InputField";
import FileUpload from "@/components/file-uploader";

const DepartmentForm: React.FC = () => {
  const [image, setImage] = React.useState<ImageListType>([]);
  const { isSmallDown } = useResponsiveStack();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [addDepartmant, { isLoading }] = useAddDepartmentMutation();
  const [uploadDepartmentImage, uploadImageState] =
    useUploadDepartmentImageMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Department>();

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    console.log("imagelist", imageList[0]?.file);
    setImage(imageList);
  };
  const onSubmit = async (data: Department) => {
    try {
      const department = await addDepartmant(data).unwrap();
      enqueueSnackbar(`Department ${department.name} created successfully`, {
        variant: "success",
      });

      if (image[0]?.file) {
        enqueueSnackbar(`Uploading Department image...`, {
          variant: "info",
          // persist: uploadImageState.isLoading,
          autoHideDuration: null,
          key: "uploading-image-toast",
        });

        const formData = new FormData();
        formData.append("image", image[0].file);
        await uploadDepartmentImage({
          code: department.code,
          formData,
        }).unwrap();

        closeSnackbar("uploading-image-toast");
        console.log(
          `Image for department ${department.code} uploaded succffully`
        );
        enqueueSnackbar(
          `Image for department ${department.name} uploaded successfully`,
          {
            variant: "success",
          }
        );
      }
    } catch (error) {
      if (isFetchBaseQueryError(error) && error?.status === 409) {
        const data = error.data as { message?: string };

        enqueueSnackbar(`Conflict :${data.message}`, {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Error in create Department", {
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
            gap={isSmallDown ? 1 : 2}
            direction={isSmallDown ? "column" : "row"}
          >
            <InputField
              label="Department Name"
              inputProps={register("name", { required: true, minLength: 1 })}
              error={Boolean(errors.name)}
              helperText={Boolean(errors.name) === true ? "Required" : " "}
              variant={"outlined"}
            />
            <InputField
              label="Department Code"
              inputProps={register("code", { required: true, minLength: 1 })}
              error={Boolean(errors.code)}
              helperText={Boolean(errors.code) === true ? "Required" : " "}
              variant={"outlined"}
            />
          </Stack>
          <Stack direction={isSmallDown ? "column" : "row"}>
            <InputField
              label="Department Info"
              inputProps={register("info", { required: true, minLength: 1 })}
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
          Create Department
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default DepartmentForm;
