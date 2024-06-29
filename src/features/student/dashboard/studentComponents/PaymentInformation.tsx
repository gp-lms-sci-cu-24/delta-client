import { Typography, Card, Box } from "@mui/material";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { useResponsiveStack } from "@/services/responsive";
import { PaymentInformationData } from "../data/StudentDashboard";

interface PaymentInformationProps {
  paymentCode: string;
  paymentStatus: string;
  paymentDate: string;
}

export default function PaymentInformation({
  paymentCode,
  paymentDate,
}: PaymentInformationProps) {
  const isPaid = PaymentInformationData.paymentStatus === "paid";
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
          sx={{ color: "#33333" }}
        >
          Payment Information
        </Typography>
      </Box>

      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1, sm: 1, md: 1, lg: 8 },
          marginTop: { lg: 0 },
        }}
      >
        <Typography variant={isXSmall ? "body2" : "h6"}>
          Payment Code:
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={isXSmall ? "h5" : "h3"}
            sx={{
              color: "#a1caf1",
              fontWeight: "bold",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {paymentCode}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 1,
          marginTop: { lg: 10 },
        }}
      >
        {isPaid ? (
          <>
            <CheckCircleOutline
              sx={{
                color: "green",
                marginRight: 1,
              }}
            />
            <Typography variant="body1" sx={{ color: "green" }}>
              Paid
            </Typography>
          </>
        ) : (
          <>
            <HighlightOff
              sx={{
                color: "red",
                marginRight: 1,
                flexDirection: "column",
                display: "flex",
              }}
            />
            <Typography variant="body1" sx={{ color: "red" }}>
              Not Paid
            </Typography>
          </>
        )}
      </Box>
      {isPaid && (
        <Box sx={{ display: "flex", marginLeft: 1 }}>
          <Typography variant={isXSmall ? "subtitle2" : "body1"} sx={{}}>
            Paid On: {paymentDate}
          </Typography>
        </Box>
      )}
    </Card>
  );
}
