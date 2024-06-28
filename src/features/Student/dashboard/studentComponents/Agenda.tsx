import { Card, Box, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
export default function Agenda() {
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        borderRadius: 6,
      }}
    >
      <Box
        sx={{
          padding: 2,
          display: "flex",
          backgroundColor: "#a7c8fe",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Agenda</Typography>
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </Box>
    </Card>
  );
}
