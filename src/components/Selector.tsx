import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface ISelectorProps {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  options: string[];
  title: string;
  label: string;
}

const Selector: React.FC<ISelectorProps> = ({
  value,
  setValue,
  options,
  title,
  label,
}) => {
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
      >
        {options.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
