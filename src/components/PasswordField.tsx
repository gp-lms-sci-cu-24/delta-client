import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FC, useState } from "react";

export type PasswordFieldProps = TextFieldProps;

const PasswordField: FC<PasswordFieldProps> = (props: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    id = "password",
    label = "Password",
    margin = "normal",
    required = true,
    fullWidth = true,
    variant = "filled",
    autoComplete = "current-password",
    style,
    ...otherProps
  } = props;

  return (
    <TextField
      id={id}
      label={label}
      margin={margin}
      required={required}
      fullWidth={fullWidth}
      variant={variant}
      autoComplete={autoComplete}
      type={showPassword ? "text" : "password"}
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((p) => !p)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
        style: { borderRadius: 8, backgroundColor: "#F2F2F2", ...style },
      }}
      {...otherProps}
    />
  );
};

export default PasswordField;
