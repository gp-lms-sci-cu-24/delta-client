import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useGetAllDepartmentQuery } from "./departmentsApiSlice";
import Skeleton from "@mui/material/Skeleton";
import DepartmentCard from "./components/DepartmentCard";
import CustomButton from "@/components/buttons/CustomButton";
import { EmptyPage } from "@/components/empty/EmptyPage";
import emptyList from "../../../assets/animations/emptyList.json";
import { Department } from "./types";
import { useNavigate } from "react-router-dom";
import Header from "@components/Header";

export default function Departments() {
  const navigate = useNavigate();
  // const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetAllDepartmentQuery();
  const departmentsData = data || [];
  // const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };
  if (isLoading) {
    return (
      <Grid container spacing={2} sx={{ p: 3 }}>
        {[...Array(4)].map((_, index) => (
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
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={150} />
              <CardContent sx={{ textAlign: "left", width: "100%" }}>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
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
        <Header pageName="Departments" />
        <CustomButton
          title="Add Department"
          variant={"contained"}
          disableElevation
          onClick={() => navigate("/app/admin/departments/add")}
          customSx={{ height: "40px", textTransform: "capitalize" }}
          disableRipple
          size="small"
        ></CustomButton>
      </Box>
      <Grid >
        {departmentsData?.length === 0 ? (
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{}}>
            <EmptyPage messege="No Departments found" animationFile={emptyList} />
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {departmentsData.map((dept:Department, index: number) => (
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
                <DepartmentCard
                  name={dept.name}
                  image={dept.image || ""}
                  info={dept.info || "no info"}
                  code={dept.code || ""}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Box sx={{flex:1}}/>
    </Box>
  );
}
