import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Custom hook to determine stack direction and gap based on screen size
export function useResponsiveStack() {
  const theme = useTheme();

  const isSmallDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumDown = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeDown = useMediaQuery(theme.breakpoints.down("lg"));
  const isXLargeDown = useMediaQuery(theme.breakpoints.down("xl"));
  const isXSmallUp = useMediaQuery(theme.breakpoints.up("xs"));
  const isSmallUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isXSmall = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.only("md"));
  const isLarge = useMediaQuery(theme.breakpoints.only("lg"));
  const isXLarge = useMediaQuery(theme.breakpoints.only("xl"));
  return {
    isSmallDown,
    isMediumDown,
    isLargeDown,
    isXLargeDown,
    isXSmallUp,
    isSmallUp,
    isMediumUp,
    isLargeUp,
    isXSmall,
    isSmall,
    isMedium,
    isLarge,
    isXLarge,
  };
}
