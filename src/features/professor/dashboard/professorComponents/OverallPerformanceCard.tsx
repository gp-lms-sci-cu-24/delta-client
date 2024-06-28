import { useTheme, Card, Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useRef, useEffect } from "react";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];
interface IOverallPerformanceCard {
  header: string;
  text: string;
}

export const OverallPerformanceCard: React.FC<IOverallPerformanceCard> = ({
  header,
  text,
}: IOverallPerformanceCard) => {
  const theme = useTheme();
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        const { width } = chartContainerRef.current.getBoundingClientRect();
        chartContainerRef.current.style.height = `${width * 0.4}px`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <Typography
        variant="h5"
        sx={{ textAlign: "left", color: "#333333", fontSize: 20 }}
      >
        {header}
      </Typography>
      {text}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          ref={chartContainerRef}
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "auto",
          }}
        >
          <LineChart
            colors={["#a1caf1"]}
            series={[{ data: uData, label: "uv", area: true, showMark: false }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            sx={{
              ".MuiLineElement-root": {
                display: "none",
              },
            }}
          />
        </div>
      </Box>
    </Card>
  );
};
