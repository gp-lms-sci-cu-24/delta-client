import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
  useUploadDepartmentImageMutation,
} from "./departmentsApiSlice";
import { Department } from "./types";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ImageListType } from "react-images-uploading";
import LoadingButton from "@mui/lab/LoadingButton";
import { useResponsiveStack } from "@/services/responsive";
import Loading from "@/components/Loading";
import { isFetchBaseQueryError } from "@/app/api";
import NotFound from "@/components/NotFound";
import Header from "@/components/Header";
import { InputField } from "@/components/inputs/InputField";
import FileUpload from "@/components/file-uploader";

function UpdateDepartment() {
  // ---- hooks -------
  const { departmentCode } = useParams();
  const [image, setImage] = useState<ImageListType>([]);
  const departmentQuery = useGetDepartmentQuery(departmentCode || "__");
  const { isSmallDown } = useResponsiveStack();
  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation();
  const [uploadDepartmentImage, uploadImageState] =
    useUploadDepartmentImageMutation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    setValue("name", departmentQuery.data?.name ?? "");
    setValue("info", departmentQuery.data?.info ?? "");
    setValue("code", departmentQuery.data?.code ?? "");
  }, [departmentQuery.data, setValue]);

  if (!departmentCode || departmentQuery.isError) {
    return <NotFound home="/app" />;
  }

  if (departmentQuery.isLoading) {
    return  <Loading />;
  }

  const onSubmit = async (data: Department) => {
    try {
      const department = await updateDepartment({
        code: departmentCode,
        data,
      }).unwrap();

      enqueueSnackbar(`Department ${department.name} updated successfully`, {
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
          `Image for department ${department.code} uploaded successfully`
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
    <Box>
      <Header pageName={"Update Department"} message="" />
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
    </Box>
  );
}

export default UpdateDepartment;
