import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const menuItems = [
  { value: "Artificial Intelligence" },
  { value: "Software Engineering" },
  { value: "Data Science" },
  { value: "Cyber Security" },
  { value: "Computer Science" },
  { value: "Computer Engineering" },
  { value: "Electrical Engineering" },
];

export default function ControlledOpenSelect() {
  const [course, setCourse] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const handleChange = (event: SelectChangeEvent<typeof course>) => {
    setCourse(event.target.value);
    setIsButtonDisabled(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleButtonClick = () => {
    console.log("Selected course:", course);
  };

  return (
    <Box sx={{ flexDirection: "row", display: "flex", pl:1}}>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-controlled-open-select-label">course</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={course}
          label="Course"
          onChange={handleChange}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ p: 2 }}>
        <Button disabled={isButtonDisabled} onClick={handleButtonClick}>
          Show groups
        </Button>
      </Box>
    </Box>
  );
}
