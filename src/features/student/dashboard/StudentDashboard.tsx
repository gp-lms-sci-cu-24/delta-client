import { Level, StudentDto } from "@features/admin/student/type";
import { useUserStateQuery } from "@/features/auth/authApiSlice";
import { useResponsiveStack } from "@/services/responsive";
import { Box, Typography, useTheme, Grid } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import StudentSammary from "./studentComponents/StudentSummary";
import { useEffect, useState } from "react";
import LoadingSkeletonGrids from "./studentComponents/LoadingSkeletonGrids";
import { getReadableLeveL } from "@features/admin/student/utils";
import PaymentInformation from "./studentComponents/PaymentInformation";
import { PaymentInformationData } from "./data/StudentDashboard";
import Agenda from "./studentComponents/Agenda";
import StudentConfigurations from "./studentComponents/StudentConfigurations";
import OverallPerformance from "./studentComponents/OverallPerformance";

{
  /*@author hazemmuuhammed*/
}

export default function StudentDashboard() {
  const theme = useTheme();
  const { data, isLoading } = useUserStateQuery();
  const { isXSmall } = useResponsiveStack();

  const [student, setStudent] = useState<StudentDto>();

  useEffect(() => {
    setStudent(data as StudentDto);
  }, [data]);

  if (isLoading) return <LoadingSkeletonGrids />;

  return (
    <Grid2
      sx={{
        backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "",
        p: 3,
      }}
    >
      <Box sx={{ pb: 2 }}>
        <Typography
          sx={{
            color: "#333333",
            fontWeight: "bold",
            fontSize: isXSmall ? "1.2em" : "1.5em",
          }}
          variant={isXSmall ? "body2" : "h4"}
        >
          Welcome Back, {student?.firstName + " " + student?.fatherName}
        </Typography>
      </Box>

      {/* student summary */}

      <Grid container spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6} md={4} lg={2}>
            <StudentSammary
              title="Overall GPA"
              value={student?.gpa.toString() || "0"}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4} lg={2}>
            <StudentSammary
              title="Credit Hours"
              value={student?.creditHours.toString() || "0"}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4} lg={2}>
            <StudentSammary
              title="Registered Credit Hours"
              value={student?.creditHoursSemester.toString() ?? "0"}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={2}>
            <StudentSammary
              title="Credit Hours To Graduate"
              value={
                (
                  (student?.department.graduationCreditHours ?? 146) -
                  (student?.creditHours ?? 0)
                ).toString() ?? "0"
              }
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={2}>
            <StudentSammary
              title="Level"
              value={getReadableLeveL(student?.level ?? Level.LEVEL_1)}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4} lg={2}>
            <StudentSammary
              title="Specialization"
              value={student?.department.name || "N/A"}
            />
          </Grid>
        </Grid>

        {/* payment information */}
        <Grid item xs={12} md={12} lg={4}>
          <PaymentInformation
            paymentCode={PaymentInformationData.paymentCode}
            paymentStatus={PaymentInformationData.paymentStatus}
            paymentDate={PaymentInformationData.paymentDate}
          />
        </Grid>

        {/* Configurations Card */}
        <Grid item xs={12} md={6} lg={4}>
          <StudentConfigurations />
        </Grid>

        {/* Agenda */}
        <Grid item xs={12} md={6} lg={4}>
          <Agenda />
        </Grid>

        {/* Overall performance card */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <OverallPerformance gpaData={[3.2, 2.9, 3.3, 3.5]} />
        </Grid>
      </Grid>
    </Grid2>
  );
}
