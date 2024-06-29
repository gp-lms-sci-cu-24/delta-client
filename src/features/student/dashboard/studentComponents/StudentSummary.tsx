import { useResponsiveStack } from "@/services/responsive";
import { Card, Typography } from "@mui/material";

interface StudentSummaryProps {
  title: string;
  value: string;
}

const StudentSummary: React.FC<StudentSummaryProps> = ({ title, value }) => {
  const { isXSmall } = useResponsiveStack();

  return (
    <Card
      sx={{
        textAlign: "center",
        p: 2,
        backgroundColor: "#A6C8FF",
        borderRadius: 6,
      }}
    >
      <Typography
        sx={{
          mt: 2,
          color: "#333333",
          maxLines: 1,
          width: "100%",
          fontSize: isXSmall ? "1em" : "2em",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          mt: 1,
          color: "#ffffff",
          maxLines: 1,
          mx: "auto",
          fontSize: isXSmall ? "12px" : "16px",
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};

export default StudentSummary;
