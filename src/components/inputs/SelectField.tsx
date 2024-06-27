import React from "react";
import { InputBaseProps, MenuItem, TextField } from "@mui/material";

type SelectFieldProps = {
  label: string;
  error: boolean;
  helperText: string;
  value?: unknown;
  setValue?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  options: Array<{ value: string; label: string }>;
  type?: string;
  inputProps?: InputBaseProps["inputProps"];
  defaultValue?: unknown;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  error,
  helperText,
  value,
  setValue,
  options,
  inputProps,
  defaultValue,
}) => (
  <TextField
    select
    fullWidth
    label={label}
    error={error}
    helperText={helperText}
    inputProps={{ ...inputProps }}
    value={value}
    onChange={setValue}
    sx={{ flex: 1 }}
    defaultValue={defaultValue}
  >
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);
