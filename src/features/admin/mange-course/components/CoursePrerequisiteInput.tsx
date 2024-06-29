import { Autocomplete, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useSearchMutation } from "../courseApiSlice";
import { Course } from "../type";

export interface CoursePrerequisiteInputProps {
  value: Course[];
  onChange: (value: Course[]) => void;
}

export function CoursePrerequisiteInput(props: CoursePrerequisiteInputProps) {
  const { value: prerequisite, onChange: setPrerequisite } = props;
  const [searchMutation, mutationState] = useSearchMutation();
  const [loading, setLoading] = useState(false);
  // const [prerequisite, setPrerequisite] = useState<Course[]>();
  const [options, setOptions] = useState<Course[]>([]);

  const onInputChange = (_: SyntheticEvent<Element, Event>, value: string) => {
    setLoading(true);
    searchMutation(value)
      .unwrap()
      .then((res) => setOptions(res))
      .finally(() => setLoading(false));
  };

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={options}
      loading={mutationState.isLoading || loading}
      onInputChange={onInputChange}
      getOptionKey={(option) => option.code}
      getOptionLabel={(option) => `${option.code} - ${option.name}`}
      value={prerequisite}
      onChange={(_, value) => setPrerequisite(value)}
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option.code === value.code}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Prerequisite Courses"
          placeholder="Write prerequisite courses"
        />
      )}
    />
  );
}
