import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Dayjs } from "dayjs";

interface TimePickerViewProps {
  label: string;
  onTimeChange: (time: Dayjs) => void;
}

export default function TimePickerViewRenderers({
  label,
  onTimeChange,
}: TimePickerViewProps) {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  const handleTimeChange = (newTime: Dayjs | null) => {
    setSelectedTime(newTime);
    if (newTime) {
      onTimeChange(newTime);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={selectedTime}
        onChange={handleTimeChange}
        orientation="landscape"
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
      />
    </LocalizationProvider>
  );
}
