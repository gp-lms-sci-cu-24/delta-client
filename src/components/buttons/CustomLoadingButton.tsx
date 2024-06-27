import LoadingButton from '@mui/lab/LoadingButton';
import { CircularProgress } from '@mui/material';
import { MouseEventHandler, ReactNode } from "react";

interface IProps {
  title?: string;
  loading: boolean;
  full?: boolean;
  variant?: "text" | "outlined" | "contained";
  loadingIndicator ?: ReactNode
  loadingPosition ?: "center" | "end" | "start" | undefined
  customSx?: React.CSSProperties;
  icon?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  size?: "small" | "medium" | "large";


}
const CustomLoadingButton = ({
  title,
  loading,
  variant = "contained",
  loadingPosition="center",
  customSx = {},
  full = false,
  icon = null,
  size = "medium",
  onClick = () => {},
}: IProps) => {
  return (
    <LoadingButton size={size} startIcon={icon} disabled={loading} onClick={onClick} fullWidth={full}  sx={customSx} loadingPosition={loadingPosition} loadingIndicator={	<CircularProgress color="info" size={16} />} loading={loading} variant={variant}>
      {title}
    </LoadingButton>
  );
};

export default CustomLoadingButton;
