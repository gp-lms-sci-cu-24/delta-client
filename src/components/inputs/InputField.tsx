import React from "react";
import { InputBaseProps, TextField, TextFieldProps } from "@mui/material";
type TextFieldVariants = TextFieldProps["variant"];

type InputFieldProps = {
  label: string;
  error: boolean;
  helperText?: string;
  type?: string;
  value?: unknown
  setValue?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  customSx?: React.CSSProperties;
  variant: TextFieldVariants;
  CustomInputProps?: TextFieldProps["InputProps"];
  inputProps?: InputBaseProps["inputProps"];
  multiline?: boolean;
  rows?: number;
  defaultValue?: unknown
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText = "",
  type = "text",
  value,
  setValue,
  CustomInputProps,
  customSx,
  variant,
  inputProps,
  multiline = false,
  rows =1,
  defaultValue = "",
}) => (
  <TextField
    fullWidth
    label={label}
    error={error}
    helperText={helperText}
    inputProps={{
      ...inputProps,
    }}
    InputProps={{
      ...CustomInputProps,
    }}
    type={type}
    value={value}
    variant={variant}
    onChange={setValue}
    sx={{ flex: 1, ...(customSx || {}) }}
    autoComplete="off"
    multiline={multiline}
    rows={rows}
    defaultValue={defaultValue}
  />
);
