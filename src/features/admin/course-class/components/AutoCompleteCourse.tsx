import { Autocomplete, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useSearchMutation } from "@features/admin/mange-course/courseApiSlice";

export interface IAutoCompleteCourseProps {
  value: string;
  onChange: (value: string) => void;
}

export function AutoCompleteCourse(props: IAutoCompleteCourseProps) {
  const { value: course, onChange: setCourse } = props;
  const [searchMutation, mutationState] = useSearchMutation();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const onInputChange = (_: SyntheticEvent<Element, Event>, value: string) => {
    setLoading(true);
    searchMutation(value)
      .unwrap()
      .then((res) =>
        setOptions(
          res.map((e) => {
            return e.code;
          })
        )
      )
      .finally(() => setLoading(false));
  };

  return (
    <Autocomplete
      id="tags-outlined"
      options={options}
      loading={mutationState.isLoading || loading}
      onInputChange={onInputChange}
      getOptionKey={(option) => option}
      getOptionLabel={(option) => `${option}`}
      value={course}
      onChange={(_, value) => setCourse(value ?? "")}
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose the Course"
          placeholder="Select the course"
          inputProps={{
            ...params.inputProps,
            readOnly: Boolean(course),
          }}
        />
      )}
    />
  );
}
