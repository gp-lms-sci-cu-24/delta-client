import { Button } from "@mui/material";
import { AriaRole, MouseEventHandler } from "react";

interface IProps {
  variant: "outlined" |"contained" |  "text";
  disabled?: boolean;
  disableElevation?: boolean;
  customSx?: React.CSSProperties;
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  role?: AriaRole | undefined
  disableRipple?: boolean;
  full?: boolean;
  title: string;
  type?: "button" | "submit" | "reset";
  disableFocusRipple?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}
const CustomButton = ({
  variant = "contained",
  disabled = false,
  disableElevation = false,
  customSx ={},
  size = "medium",
  role = "button",
  icon = null,
  disableRipple = false,
  full = false,
  title,
  type = "button",
  disableFocusRipple = false,
  href = "",
  onClick= () => {},
}: IProps) => {
  return (
    <Button
      variant={variant}
      disabled={disabled}
      disableElevation={disableElevation}
      onClick={onClick}
      sx={customSx}
      size={size}
      startIcon={icon}
      role={role}
      disableRipple={disableRipple}
      fullWidth={full}
      type={type}
      disableFocusRipple={disableFocusRipple}
      href={href}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
