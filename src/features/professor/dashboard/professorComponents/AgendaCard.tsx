import { Card, Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

interface IAgendaCard {
  header: string;
}

export const AgendaCard = ({ header }: IAgendaCard) => {
  return (
    <Card
      component={Box}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fffff",
        borderRadius: 7,
        
        
        
      }}
    >
      <Box
        sx={{
          backgroundColor: "#A6C8FF",
          p: "4%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "left",
            color: "#333333",
            fontSize: 20,
          }}
        >
          {header}
        </Typography>
      </Box>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}>
        <DateCalendar sx={{width: "100%", height: "100%"}} />
      </LocalizationProvider>
    </Card>
  );
};

export default AgendaCard;
