import { Box, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {  Course, DepartmentCourse, UpdateCourseDto } from "./type";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useUploadCourseImageMutation,
} from "./courseApiSlice";
import { CourseDepartmentInput } from "./components/CourseDepartmentInput";
import { closeSnackbar, useSnackbar } from "notistack";
import { ImageListType } from "react-images-uploading";
import { useParams } from "react-router-dom";
import { isFetchBaseQueryError } from "@/app/api";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { InputField } from "@/components/inputs/InputField";
import FileUpload from "@/components/file-uploader";
import { useResponsiveStack } from "@/services/responsive";

export default function EditCourse() {
  const { courseCode } = useParams();
  console.log("courseCode", typeof courseCode);
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [creditHours, setCreditHours] = useState<number | null>();
  const [prerequisite, setPrerequisite] = useState<Course[]>([]);
  const [oldPrerequisite, setOldPrerequisite] = useState<string[]>([]);
  const [departments, setDepartments] = useState<DepartmentCourse[]>([]);
  const [image, setImage] = useState<ImageListType>([]);
const [updateCourse, { isLoading: updateCourseLoading }] = useEditCourseMutation();
  const [uploadCourseImage, uploadImageState] = useUploadCourseImageMutation();
  const { isSmallDown } = useResponsiveStack();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCourseDto>();
  const { enqueueSnackbar } = useSnackbar();
const {data ,isLoading}=useGetCourseByIdQuery(courseCode||"_")
  const resetForm = () => {
    setName("");
    setCode("");
    setInfo("");
    setCreditHours(0);
    setPrerequisite([]);
    setDepartments([]);
    setImage([]);
    setOldPrerequisite([]);
  };
useEffect(() => {
  if(data){
    console.log("datas",data)
    setCode(data.code)
    setName(data.name)
    setInfo(data.info)
    setCreditHours(data.creditHours)
    setOldPrerequisite(data.coursePrerequisites);
    console.log("coursePrerequisites",data.coursePrerequisites)
    setDepartments(data.departments)
    setImage([])
  }
},[data])


  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    console.log("imagelist", imageList[0]?.file);
    setImage(imageList);
  };
  const onSubmit: SubmitHandler<UpdateCourseDto> = async () => {
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
      const mergedPrerequisites = [...new Set([...oldPrerequisite, ...prerequisite.map(c => c.code)])];
      const updateCourseBody: UpdateCourseDto = {
         courseCode: courseCode||"_",
        data:{
          code,
          name,
          info,
          creditHours:1,
          image: "",
          coursePrerequisites: mergedPrerequisites,
          departments: departments
        }
        };
     
      
      console.log("newCourseBody", updateCourseBody);
      const course = await updateCourse(updateCourseBody).unwrap();

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
if(isLoading){
  return <Loading/>
}
  return (
    <Box sx={{ p: 2 }}>
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
              inputProps={register("data.name", {
                required: true,
                minLength: 3,
              })}
              defaultValue={name}
              error={Boolean(errors.data?.name)}
              helperText={Boolean(errors.data?.name) === true ? "Required" : " "}
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
              inputProps={register("data.code", {
                required: true,
                minLength: 3,
              })}
              defaultValue={code}
              error={Boolean(errors.data?.code)}
              helperText={Boolean(errors.data?.code) === true ? "Required" : " "}
              setValue={(e) => setCode(e.target.value)}
              variant={"outlined"}
            />
            <TextField
              inputProps={{
                ...register("data.creditHours", {
                  required: true,
                  minLength: 2,
                  valueAsNumber: true,
                  min: 1,
                }),
                type: "number",
                min: 1,
              }}
              defaultValue={creditHours}
              error={Boolean(errors.data?.creditHours)}
              helperText={
                errors.data?.creditHours?.type === "required"
                  ? "Required"
                  : errors.data?.creditHours?.type === "min"
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
              inputProps={register("data.info", {
                required: true,
                minLength: 3,
              })}
              defaultValue={info}
              error={Boolean(errors.data?.info)}
              helperText={Boolean(errors.data?.info) === true ? "Required" : " "}
              value={info}
              setValue={(e) => setInfo(e.target.value)}
              variant={"outlined"}
            />
          </Stack>

          {/* <Stack>
            <CoursePrerequisiteInput
              value={prerequisite}
              onChange={setPrerequisite}
            />
          </Stack> */}
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
            loading={updateCourseLoading || uploadImageState?.isLoading}
          >
            Edit Course
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}
