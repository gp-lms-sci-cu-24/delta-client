import { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  FormControl,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import TimePickerViewRenderers from "./TimePickerViewRenderers";
import Add from "@mui/icons-material/Add";
import { useGetAllLocationQuery } from "../../location/locationApiSlice";
import { ClassType, CreateCourseClassTimingDto } from "../type";
import { Dayjs } from "dayjs";
import Selector from "@/components/Selector";
import { DayOfWeek } from "@/utils";

export interface IScheduleInputProps {
  value?: CreateCourseClassTimingDto[];
  onChange?: (
    value:
      | CreateCourseClassTimingDto[]
      | ((v: CreateCourseClassTimingDto[]) => CreateCourseClassTimingDto[])
  ) => void;
}
export function ScheduleInput(props: IScheduleInputProps) {
  const { value: schedules = [], onChange: setSchedules = () => {} } = props;
  const { data } = useGetAllLocationQuery({
    pageNo: 0,
    pageSize: 5,
  }); // TO-DO use find later

  const locations = data?.content;
  const [type, setType] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const staticDays = Object.values(DayOfWeek);
  const staticTypes = Object.values(ClassType);

  const handleStartTimeChange = (newTime: Dayjs) => {
    const originalDate = newTime.toDate();

    const hours = originalDate.getHours().toString().padStart(2, "0");
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");
    const sec = originalDate.getSeconds().toString().padStart(2, "0");

    setStartTime(`${hours}:${minutes}:${sec}`);
  };

  const handleEndTimeChange = (newTime: Dayjs) => {
    const originalDate = newTime.toDate();

    const hours = originalDate.getHours().toString().padStart(2, "0");
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");
    const sec = originalDate.getSeconds().toString().padStart(2, "0");

    setEndTime(`${hours}:${minutes}:${sec}`);
  };

  const handleAdd = () => {
    if (!type || !day || !startTime || !endTime || !location) {
      return;
    }

    const newSchedule: CreateCourseClassTimingDto = {
      day: day,
      locationId: Number(location ?? "0"),
      type: type,
      startTime: startTime,
      endTime: endTime,
    };
    console.log("sc", newSchedule);
    setSchedules([...schedules, newSchedule]);
    handleClose();
  };

  const handleClickOpen = () => {
    setType(ClassType.LABORATORY_SECTION);
    setDay(DayOfWeek.FRIDAY);
    setStartTime("00:00:00");
    setEndTime("00:00:00");
    setLocation("0");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="center">Day</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Remove</TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={handleClickOpen}>
                  <Add />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.length === 0 ? (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={7}
                  size="medium"
                  sx={{ fontWeight: "bold" }}
                >
                  No Schedule added yet 😥
                </TableCell>
              </TableRow>
            ) : (
              schedules.map((s, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {s.type}
                  </TableCell>
                  <TableCell align="center">{s.day}</TableCell>
                  <TableCell align="center">{s.startTime}</TableCell>
                  <TableCell align="center">{s.endTime}</TableCell>
                  <TableCell align="center">{s.locationId}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="error"
                      onClick={() =>
                        setSchedules((sc) => sc.filter((_, i) => i !== index))
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Schedule</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <Selector
              label="type"
              value={type}
              setValue={setType}
              options={staticTypes}
              title="Choose Type"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Selector
              label="day"
              value={day}
              setValue={setDay}
              options={staticDays}
              title="Choose Day"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Selector
              label="Location"
              value={location}
              setValue={setLocation}
              options={
                locations?.map((e) => {
                  return e.id.toString();
                }) ?? []
              }
              title="Choose Location"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TimePickerViewRenderers
              label="Start at"
              onTimeChange={handleStartTimeChange}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TimePickerViewRenderers
              label="End at"
              onTimeChange={handleEndTimeChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
