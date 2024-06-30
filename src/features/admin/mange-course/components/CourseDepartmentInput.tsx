import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  Button,
  FormControlLabel,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useState } from "react";
import { useGetAllDepartmentQuery } from "../../departments/departmentsApiSlice";
import { Department } from "../../departments/types";
import { DepartmentCourse, DepartmentSemester } from "../type";
import { Add, Delete } from "@mui/icons-material";
import { useResponsiveStack } from "@/services/responsive";

export interface ICourseDepartmentInputProps {
  value?: DepartmentCourse[];
  onChange?: (
    value: DepartmentCourse[] | ((v: DepartmentCourse[]) => DepartmentCourse[])
  ) => void;
}

export function CourseDepartmentInput(props: ICourseDepartmentInputProps) {
  const {
    value: departmentsCourse = [],
    onChange: setDepartmentsCourse = () => {},
  } = props;
  const departmentQuery = useGetAllDepartmentQuery();

  const [department, setDepartment] = useState<string | undefined>();
  const [semester, setSemester] = useState<string | undefined>();
  const [mandatory, setMandatory] = useState<boolean>(false);
  const { isMediumDown } = useResponsiveStack();
  const handleAdd = () => {
    if (!department || !semester) {
      return;
    }
    if (
      departmentsCourse.find(
        (s) => s.department.code === JSON.parse(department).code
      )
    ) {
      return;
    }

    setDepartmentsCourse([
      ...departmentsCourse,
      {
        department: JSON.parse(department) as Department,
        semester: Object.values(DepartmentSemester).find(
          (s) => s === semester
        ) as DepartmentSemester,
        mandatory,
      },
    ]);
    handleClose();
  };
  const [open, setOpen] = useState(false);
  const reset = () => {
    setDepartment(undefined);
    setSemester(undefined);
    setMandatory(false);
  };
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleClickOpen = () => {
    reset();
    setOpen(true);
  };
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>department</TableCell>
              <TableCell align="center">semester</TableCell>
              <TableCell align="center">mandatory</TableCell>
              <TableCell align="center">Remove</TableCell>
              <TableCell align="center">
                
                <IconButton color="primary" onClick={handleClickOpen}>
                  <Add />
                </IconButton>
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departmentsCourse.length === 0 ? (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={4}
                  size="medium"
                  sx={{ fontWeight: "bold" }}
                >
                  No Department added yet 😥
                </TableCell>
              </TableRow>
            ) : (
              departmentsCourse.map((d: DepartmentCourse) => (
                <TableRow
                  key={d.department.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {d.department.name}
                  </TableCell>
                  <TableCell align="center">{d.semester}</TableCell>
                  <TableCell align="center">
                    {d.mandatory ? "✔" : "❌"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="error"
                      onClick={() =>
                        setDepartmentsCourse((dc) =>
                          dc.filter(
                            (e) => e.department.code !== d.department.code
                          )
                        )
                      }
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: isMediumDown ? "column" : "row",
          py: 2,
          pt: 3,
        }}
        gap={2}
      >
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Add Department</DialogTitle>
          <DialogContent sx={{ width: "500px", maxWidth: "100%", mx: "auto" }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="department-select-label" size="normal">
                {departmentQuery.isLoading ? "loading.." : "Department"}
              </InputLabel>
              <Select
                labelId="department-select-label"
                label="Department"
                id="department-select"
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                size="medium"
              >
                {departmentQuery.data
                  ?.filter(
                    (d) =>
                      !departmentsCourse.find(
                        (s) => s.department.code === d.code
                      )
                  )
                  .map((department) => (
                    <MenuItem
                      value={JSON.stringify(department)}
                      key={department.code}
                    >
                      {department.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="semester-select-label" size="normal">
                Semester
              </InputLabel>
              <Select
                labelId="semester-select-label"
                id="semester-select"
                label="Semester"
                value={semester}
                onChange={(event) => setSemester(event.target.value)}
                size="medium"
              >
                {Object.values(DepartmentSemester)
                  .filter((s) => isNaN(Number(s)))
                  .map((s) => (
                    <MenuItem value={s} key={s}>
                      {s}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={mandatory}
                  onChange={(_, checked) => setMandatory(checked)}
                />
              }
              label="Mandatory"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button color="primary" size="medium" onClick={handleAdd}>
              Add Department
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
