import { useSearchProfessorsMutation } from "@features/admin/professor/professorApiSlice";
import { Autocomplete, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";

export interface IAutoCompleteProfessorProps {
  value: string;
  onChange: (value: string) => void;
}

export function AutoCompleteProffesor(props: IAutoCompleteProfessorProps) {
  const { value: Professor, onChange: setProfessor } = props;
   const [searchMutation, mutationState] = useSearchProfessorsMutation()
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const onInputChange = (_: SyntheticEvent<Element, Event>, value: string) => {
    setLoading(true);
    console.log(value);
    setOptions([value]);
    searchMutation(value) //need to update
      .unwrap()
      .then((res) =>
        setOptions(
          res.map((e) => {
            return e.username;
          })
        )
      )
      .finally(() => setLoading(false));
  };

  return (
    <Autocomplete
      id="tags-outlined"
      options={options}
      loading={loading}
      onInputChange={onInputChange}
      getOptionKey={(option) => option}
      getOptionLabel={(option) => `${option} `}
      value={Professor}
      onChange={(_, value) => setProfessor(value ?? "")}
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose professor"
          placeholder="Select the professor"
          inputProps={{
            ...params.inputProps,
            readOnly: Boolean(Professor),
          }}
        />
      )}
    />
  );
}
