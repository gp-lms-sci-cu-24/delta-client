import { Grid, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import emptyList from "../../../assets/animations/emptyList.json";
import { useNavigate } from "react-router-dom";
import { useGetAllCoursesQuery } from "./courseApiSlice";
import { useState } from "react";
import CourseCard from "./components/CourseCard";
import { Course } from "./type";
import SkeletonCard from "@/components/SkeletonCard";
import CustomButton from "@/components/buttons/CustomButton";
import Header from "@/components/Header";
import { EmptyPage } from "@/components/empty/EmptyPage";

export default function Courses() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isFetching } = useGetAllCoursesQuery({
    pageNo: page - 1,
    pageSize: 10,
  });
  const coursesData = data?.content || [];
  const totalPages = data?.totalPages || 0;
  console.log("coursesData", coursesData);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading || isFetching) {
    return <SkeletonCard length={8} />;
  }

  return (
    <Box
      sx={{ p: 1, height: "100%", display: "flex", flexDirection: "column" }}
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
        <Header pageName="Courses" message="" />
        <CustomButton
          title="Add course"
          variant={"contained"}
          disableElevation
          onClick={() => navigate("/app/courses/add")}
          customSx={{ height: "40px", textTransform: "capitalize" }}
          disableRipple
          size="small"
        />
      </Box>
      <Grid >
        {coursesData.length === 0 ? (
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{}}>
            <EmptyPage messege="No Courses found" animationFile={emptyList} />
          </Grid>
        ) : (
          <Grid container sx={{ mx: "auto" }} spacing={2}>
            {coursesData.map((course: Course) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={course.code}
                sx={{
                  p: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Box sx={{flex:1}}/>
      <Box sx={{ display: "flex" , justifyContent: "center" }}>
        <Pagination
          page={page}
          onChange={handleChange}
          count={totalPages}
          boundaryCount={2}
          color="primary"
          hidden={coursesData.length === 0}
        />
      </Box>
    </Box>
  );
}
