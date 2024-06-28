import { Box, Grid, Typography } from "@mui/material";
import { IProfileDataField } from "../type";
import { useResponsiveStack } from "@/services/responsive";

export const ProfileDataField = ({ name, value }: IProfileDataField) => {
  const { isXSmall } = useResponsiveStack();
  return (
    <Box sx={{ display: "flex", mb: 2 }}>
      <Grid container>
        <Grid item xs={6} md={3} sm={3}>
          <Typography sx={{ fontWeight: "italic" }} variant="body1">
            {name}
          </Typography>
        </Grid>
        <Grid item xs={8} md={6} sm={9}>
          <Typography fontSize={isXSmall ? "12px" : "18px"}>{value}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
