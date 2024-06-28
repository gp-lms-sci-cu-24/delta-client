import { Box, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { AddCourseDto, Course, DepartmentCourse } from "./type";
import {
  useAddCourseMutation,
  useUploadCourseImageMutation,
} from "./courseApiSlice";
import { CoursePrerequisiteInput } from "./components/CoursePrerequisiteInput";
import { CourseDepartmentInput } from "./components/CourseDepartmentInput";
import { closeSnackbar, useSnackbar } from "notistack";
import { ImageListType } from "react-images-uploading";
import Header from "@/components/Header";
import { InputField } from "@/components/inputs/InputField";
import { useResponsiveStack } from "@/services/responsive";
import { isFetchBaseQueryError } from "@/app/api";
import FileUpload from "@/components/file-uploader";

export default function AddCourse() {
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [creditHours, setCreditHours] = useState<number | null>();
  const [prerequisite, setPrerequisite] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<DepartmentCourse[]>([]);
  const [image, setImage] = useState<ImageListType>([]);
  const [addCourse, { isLoading }] = useAddCourseMutation();
  const [uploadCourseImage, uploadImageState] = useUploadCourseImageMutation();
  const { isSmallDown } = useResponsiveStack();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCourseDto>();
  const { enqueueSnackbar } = useSnackbar();

  const resetForm = () => {
    setName("");
    setCode("");
    setInfo("");
    setCreditHours(0);
    setDepartments([]);
    setImage([]);
  };
console.log("departments",prerequisite)
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    console.log("imagelist", imageList[0]?.file);
    setImage(imageList);
  };
  const onSubmit: SubmitHandler<AddCourseDto> = async () => {
    if (departments.length === 0) {
      enqueueSnackbar("Please select at least one department", {
        variant: "error",
      });
      return;
    }

    if (!creditHours || creditHours < 1) {
      enqueueSnackbar("CreditHours is required and must be positive!", {
        variant: "error",
      });
      return;
    }

    try {
      const newCourseBody: AddCourseDto = {
        code,
        name,
        info,
        creditHours,
        image: "",
        coursePrerequisites: prerequisite.map((c) => c.code),
        departments: departments.map((d) => ({
          departmentCode: d.department.code,
          mandatory: d.mandatory,
          semester: d.semester,
        })),
      };
      console.log("newCourseBody", newCourseBody);
      const course = await addCourse(newCourseBody).unwrap();

      enqueueSnackbar(`Course  added successfully`, {
        variant: "success",
      });
      if (image[0]?.file) {
        enqueueSnackbar(`Uploading Course image...`, {
          variant: "info",
          // persist: uploadImageState.isLoading,
          autoHideDuration: null,
          key: "uploading-image-toast",
        });

        const formData = new FormData();
        formData.append("image", image[0].file);
        await uploadCourseImage({
          code: course.code,
          formData,
        }).unwrap();

        closeSnackbar("uploading-image-toast");
        console.log(`Image for course ${course.code} uploaded successfully`);
        enqueueSnackbar(
          `Image for course ${course.name} uploaded successfully`,
          {
            variant: "success",
          }
        );
      }
      resetForm();
    } catch (error) {
      if (isFetchBaseQueryError(error) && error?.status === 409) {
        const data = error.data as { message?: string };
        enqueueSnackbar(`Conflict :${data.message}`, {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Error in add course", {
          variant: "error",
        });
      }
      console.log(error);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Header pageName={"Add Course"} message="" />
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            width: isSmallDown ? "100%" : "75%",
            mx: "auto",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            mt: isSmallDown ? 2 : 5,
          }}
        >
          <Stack
            direction={isSmallDown ? "column" : "row"}
            sx={{ gap: isSmallDown ? 0 : 2 }}
          >
            <InputField
              label="Course Name"
              inputProps={register("name", {
                required: true,
                minLength: 3,
              })}
              error={Boolean(errors.name)}
              helperText={Boolean(errors.name) === true ? "Required" : " "}
              value={name}
              setValue={(e) => setName(e.target.value)}
              variant={"outlined"}
            />
          </Stack>
          <Stack
            direction={isSmallDown ? "column" : "row"}
            sx={{ gap: isSmallDown ? 0 : 2 }}
          >
            <InputField
              label="Course Code"
              value={code}
              inputProps={register("code", {
                required: true,
                minLength: 3,
              })}
              error={Boolean(errors.code)}
              helperText={Boolean(errors.code) === true ? "Required" : " "}
              setValue={(e) => setCode(e.target.value)}
              variant={"outlined"}
            />
            <TextField
              inputProps={{
                ...register("creditHours", {
                  required: true,
                  minLength: 2,
                  valueAsNumber: true,
                  min: 1,
                }),
                type: "number",
                min: 1,
              }}
              error={Boolean(errors.creditHours)}
              helperText={
                errors.creditHours?.type === "required"
                  ? "Required"
                  : errors.creditHours?.type === "min"
                  ? "Minimum value is 1"
                  : " "
              }
              sx={{ width: isSmallDown ? "100%" : "30%" }}
              label="Credit Hours"
              variant={"outlined"}
              value={creditHours}
              rows={1}
              onChange={(e) => setCreditHours(Number(e.target.value))}
            />
          </Stack>
          <Stack>
            <InputField
              label="Course Info"
              inputProps={register("info", {
                required: true,
                minLength: 3,
              })}
              error={Boolean(errors.info)}
              helperText={Boolean(errors.info) === true ? "Required" : " "}
              value={info}
              setValue={(e) => setInfo(e.target.value)}
              variant={"outlined"}
            />
          </Stack>

          <Stack>
            <CoursePrerequisiteInput
              value={prerequisite}
              onChange={setPrerequisite}
            />
          </Stack>
          <Stack sx={{mt:2}}>
            <CourseDepartmentInput
              value={departments}
              onChange={setDepartments}
            />
          </Stack>
          <Stack
            sx={{ width: isSmallDown ? "100%" : "85%", mb: 2, mx: "auto" }}
            direction={"column"}
          >
            <FileUpload onChange={onChange} value={image} />
          </Stack>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            loading={isLoading || uploadImageState?.isLoading}
          >
            add Course
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}
