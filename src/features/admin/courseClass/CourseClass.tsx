import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { useGetAllCourseClassesQuery } from "./courseClassApiSlice";
import StatesCheakBox from "./components/StatesCheakBox";
import Typography from "@mui/material/Typography";
import { CourseClassState } from "./type";
import SkeletonCard from "@/components/SkeletonCard";
import CustomButton from "@/components/buttons/CustomButton";
import Header from "@/components/Header";
import { EmptyPage } from "@/components/empty/EmptyPage";
import emptyList from "../../../assets/animations/emptyList.json";
import CourseClassCard from "./components/CourseClassCard";
export default function CourseClass() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [states, setStates] = useState<CourseClassState[]>([]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const { data, isLoading, isFetching } = useGetAllCourseClassesQuery({
    pageNo: page - 1,
    pageSize: 20,
    states,
  });

  const coursesClassesData = data?.content || [];
  const totalPages = data?.totalPages || 0;

  console.log("el data", coursesClassesData);

  if (isLoading || isFetching) {
    return <SkeletonCard length={8} />;
  }

  return (
    <Box
      sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingBottom: 2,
        }}
      >
        <Header pageName="Courses Classes" />
        <CustomButton
          title="Add New Class"
          variant={"contained"}
          disableElevation
          onClick={() => navigate("./add")}
          customSx={{
            height: "40px",
            textTransform: "capitalize",
            width: "120px",
          }}
          disableRipple
          size="small"
        ></CustomButton>
      </Box>
      <Grid>
        {coursesClassesData?.length === 0 ? (
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{}}>
            <Box sx={{ my: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filter classes
              </Typography>
              <Box sx={{ width: "100%" }}>
                <StatesCheakBox value={states} onChange={setStates} />
              </Box>
            </Box>
            <EmptyPage messege="No classes found" animationFile={emptyList} />
          </Grid>
        ) : (
          <>
            <Box sx={{ my: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filter classes
              </Typography>
              <Box sx={{ width: "100%" }}>
                <StatesCheakBox value={states} onChange={setStates} />
              </Box>
            </Box>
            <Grid container spacing={2}>
              {coursesClassesData.map((courseClass, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  sx={{
                    p: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <CourseClassCard
                    // title={courseClass.title}
                    // imageUrl={course.imageUrl}
                    // proffessor={course.professor}
                    // maxCapacity={course.maxCapacity}
                    // totalStudents={course.totalStudents}
                    // courseState={course.courseState}
                    // year={course.year}
                    courseClass={courseClass}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Grid>
      <Box sx={{ flex: 1 }} />
      {
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            page={page}
            onChange={handlePageChange}
            count={totalPages}
            boundaryCount={2}
            color="primary"
            hidden={coursesClassesData.length === 0}
          />
        </Box>
      }
    </Box>
  );
}
