import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

interface IProps {
  pageName: string;
  message?: string;
}
const Header = ({ pageName, message }: IProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isXLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <Box sx={{ mb: isXLargeScreen ? 2 : 0 }}>
      <Typography
        sx={{ color: theme.palette.info.light, fontWeight: "bold" }}
        variant={isSmallScreen ? "subtitle2" : "h5"}
      >
        {pageName}
      </Typography>
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
};

export default Header;
