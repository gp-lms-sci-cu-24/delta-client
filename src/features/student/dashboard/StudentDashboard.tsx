import { Level, StudentDto } from "@features/admin/student/type";
import { Box, useTheme, Grid } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import StudentSammary from "./studentComponents/StudentSummary";
import { useEffect, useState } from "react";
import LoadingSkeletonGrids from "./studentComponents/LoadingSkeletonGrids";
import { getReadableLeveL } from "@features/admin/student/utils";
import PaymentInformation from "./studentComponents/PaymentInformation";
import { PaymentInformationData } from "./data/StudentDashboard";
import Agenda from "./studentComponents/Agenda";
import StudentConfigurations from "./studentComponents/StudentConfigurations";
import { useUserStateQuery } from "@features/auth/authApiSlice";
import HeaderDataField from "@components/HeaderDataField";

{
  /*@author hazemmuuhammed*/
}

export default function StudentDashboard() {
  const theme = useTheme();
  const { data, isLoading } = useUserStateQuery();
  const [student, setStudent] = useState<StudentDto>();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (data) setStudent(data as StudentDto);
  }, [data]);

  console.log("student", data);
  if (isLoading) return <LoadingSkeletonGrids />;
  const cards = [
    {
      title: "Overall GPA",
      value: student?.gpa || "0",
    },
    {
      title: "Credit Hours",
      value: student?.creditHours || "0",
    },
    {
      title: "Registered Credit Hours",
      value: student?.creditHoursSemester || "0",
    },
    {
      title: "Credit Hours To Graduate",
      value: (student?.department.graduationCreditHours ?? 146) - (student?.creditHours ?? 0),
    },
    {
      title: "Level",
      value: getReadableLeveL(student?.level as Level),
    },
    {
      title: "Specialization",
      value: student?.department.code || "N/A",
    },
  ];
  return (
    <Grid2
      sx={{
        backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "",
        p: 3,
      }}
    >
      <Box sx={{ pb: 2 }}>
        <HeaderDataField
          name={`Welcome Back, ${student?.firstName + " " + student?.fatherName}`}
          value={""}
        />
      </Box>

      {/* student summary */}

      <Grid container spacing={1}>
        <Grid container spacing={1}>
          {cards.map((card, index) => (
            <Grid item xs={6} sm={6} md={4} lg={2}>
              <StudentSammary
                key={index}
                title={card.title}
                value={card.value}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                blur={hoveredCard !== null && hoveredCard !== index}
              />
            </Grid>
          ))}
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
        {/* <Grid item xs={12} sm={12} md={12} lg={12}>
          <OverallPerformance gpaData={[3.2, 2.9, 3.3, 3.5]} />
        </Grid> */}
      </Grid>
    </Grid2>
  );
}
