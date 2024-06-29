import { Card, Typography, Box, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useRef, useEffect } from "react";

interface OverallPerformanceProps {
  gpaData: number[];
}

export default function OverallPerformance({ gpaData }: OverallPerformanceProps) {
  const theme = useTheme();
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        const { width } = chartContainerRef.current.getBoundingClientRect();
        chartContainerRef.current.style.height = `${width * 0.3}px`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate GPA improvement
  const improvementData = gpaData.map((gpa: number, index: number) => {
    if (index === 0) {
      return 0; 
    } else {
      return gpa - gpaData[index - 1];
    }
  });

  return (
    <Card
      component={Box}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.mode === "light" ? "#fff" : "#282c34",
        borderRadius: 7,
        padding: theme.spacing(2),
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "left", color: "#333333" }}>
        Overall performance
      </Typography>
      <Box ref={chartContainerRef} sx={{ width: "100%", height: "auto" }}>
        <LineChart
          colors={["#a1caf1"]}
          xAxis={[{ data: gpaData.map((_, index) => index + 1) }]}
          series={[
            {
              data: improvementData,
            },
          ]}
        />
      </Box>
    </Card>
  );
}
