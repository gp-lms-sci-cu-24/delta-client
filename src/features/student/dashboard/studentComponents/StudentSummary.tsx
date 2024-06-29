import { useResponsiveStack } from "@/services/responsive";
import { Card, Typography } from "@mui/material";

interface StudentSummaryProps {
  title: string | number;
  value: string | number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  blur?: boolean;
}

const StudentSummary: React.FC<StudentSummaryProps> = ({ title, value , onMouseEnter , onMouseLeave , blur }) => {
  const { isXSmall } = useResponsiveStack();

  return (
    <Card
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        textAlign: "center",
        p: 2,
        backgroundColor: "#A6C8FF",
        borderRadius: 6,
        filter: blur ? "blur(4px)" : "none",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          zIndex: 1,
          width: "90%",
          backgroundColor: "#8aafff",
          color:"black",
          transform: "scale(1.2)",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        },
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
