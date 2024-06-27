import { Box, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
type Props = { messege: string,
  animationFile: unknown,};

export const EmptyPage = ({ messege ,animationFile}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack  >
        <Lottie style={{ width: 300, }} animationData={animationFile} />
        <Box sx={{ textAlign: "center"}}>
          <Typography textTransform={"capitalize"}  variant="h5">{messege}</Typography>
        </Box>
        </Stack>
      </Box>
   
  );
};
