import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CourseClassState } from "../type";
import { useState } from "react";
import { getEnumNumberValues } from "@/utils";

export interface StatesCheakBoxProps {
  value?: CourseClassState[];
  onChange?: (value: CourseClassState[]) => void;
}

export default function StatesCheakBox({
  value,
  onChange,
}: StatesCheakBoxProps) {
  const [states, setStates] = useState<CourseClassState[]>(value || []);
  const handleChange = (_: any, newValue: CourseClassState[]) => {
    setStates(newValue);
    onChange && onChange(newValue);
  };
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      value={states}
      onChange={handleChange}
      options={getEnumNumberValues(CourseClassState).map(
        (s) => CourseClassState[s] as unknown as CourseClassState
      )}
      getOptionLabel={(option) => option.toString()}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.toString()}>
          <Checkbox
            style={{ marginRight: 8, maxLines: 1, maxHeight: 20 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      style={{ minWidth: 200, maxWidth: 600, maxLines: 1 }}
      renderInput={(params) => (
        <TextField {...params} label="states" placeholder="choose states" />
      )}
    />
  );
}
