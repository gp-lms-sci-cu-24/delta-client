import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SxProps,
  Theme,
  CircularProgress,
} from "@mui/material";

interface ISelectorProps {
  value: string | null;
  setValue: (value: string | null) => void;
  options: string[] | { option: string; text: string }[];
  title: string;
  label: string;
  selectorComponentStyle?: SxProps<Theme>;
  isLoading?: boolean;
}

const Selector: React.FC<ISelectorProps> = ({
  value,
  setValue,
  options,
  title,
  label,
  selectorComponentStyle,
  isLoading = false,
}) => {
  const getOption = (option: string | { option: string; text: string }) =>
    typeof option === "string" ? option : option.option;
  const getText = (option: string | { option: string; text: string }) =>
    typeof option === "string" ? option : option.text;

  return (
    <FormControl sx={{ flex: 1 }}>
      <InputLabel id={`${title.toLowerCase()}-select-label`} size="normal">
        {label}
      </InputLabel>
      <Select
        labelId={`${title.toLowerCase()}-select-label`}
        id={`${title.toLowerCase()}-select`}
        label={label}
        value={value}
        onChange={(event) => setValue(event.target.value as string)}
        size="medium"
        sx={{
          ...selectorComponentStyle,
          // "& .MuiSelect-icon": { color: "black", p: 0, m: 0, height: "100%" },
        }}
        // IconComponent={CircularProgress}
      >
        {isLoading ? (
          <MenuItem disabled sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
            <span style={{ width: "15px" }} />
            Loading Data...
          </MenuItem>
        ) : (
          options.map((option) => (
            <MenuItem value={getOption(option)} key={getOption(option)}>
              {getText(option)}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default Selector;
