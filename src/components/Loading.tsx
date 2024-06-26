import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import loading from "@assets/animations/loading.json";

type Props = { visible?: boolean };

const Loading = ({ visible = true }: Props) => {
  return visible ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        flexDirection: "column",
      }}
    >
      <Box sx={{ justifyContent: "center", alignItems: "center" }}>
        <Lottie style={{ marginBottom: -50 }} animationData={loading} />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5">LOADING...</Typography>
        </Box>
      </Box>
    </Box>
  ) : null;
};

export default Loading;
