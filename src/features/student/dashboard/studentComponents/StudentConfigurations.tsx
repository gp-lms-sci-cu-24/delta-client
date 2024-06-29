import { Typography, Card, Box, CardActionArea } from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import BallotRoundedIcon from "@mui/icons-material/BallotRounded";
import { useNavigate } from "react-router-dom";
import { useResponsiveStack } from "@/services/responsive";

export default function StudentSummary() {
  const navigate = useNavigate();
  const { isXSmall } = useResponsiveStack();

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        borderRadius: 6,
        height: "100%",
      }}
    >
      <Box sx={{ padding: 2, backgroundColor: "#a7c8fe" }}>
        <Typography
          variant={isXSmall ? "body2" : "h5"}
          sx={{ color: "#333333" }}
        >
          Configurations
        </Typography>
      </Box>
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          marginTop: { xs: 0, sm: 0, md: 5, lg: 5 },
        }}
      >
        <CardActionArea
          sx={{
            borderRadius: 6,
          }}
          onClick={() => {
            navigate("/app/student/course-registration");
          }}
        >
          <Card
            sx={{
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CalendarTodayIcon sx={{ color: "#a7c8fe", marginRight: 1 }} />
            <Typography variant={isXSmall ? "caption" : "body1"}>
              Course Registration
            </Typography>
          </Card>
        </CardActionArea>

        <CardActionArea
          sx={{ borderRadius: 6 }}
          onClick={() => {
            navigate("/app/student/course-registration");
          }}
        >
          <Card
            sx={{
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <EventBusyIcon sx={{ color: "#a7c8fe", marginRight: 1 }} />
            <Typography variant={isXSmall ? "caption" : "body1"}>
              Course Deletion
            </Typography>
          </Card>
        </CardActionArea>

        <CardActionArea
          sx={{ borderRadius: 6 }}
          onClick={() => {
            alert("clicked");
          }}
        >
          <Card
            sx={{
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <BallotRoundedIcon sx={{ color: "#a7c8fe", marginRight: 1 }} />
            <Typography variant={isXSmall ? "caption" : "body1"}>
              Complaints and Suggestions
            </Typography>
          </Card>
        </CardActionArea>
      </Box>
    </Card>
  );
}
