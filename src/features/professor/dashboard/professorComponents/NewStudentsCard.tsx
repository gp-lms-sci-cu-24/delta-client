import { useTheme, Box, Card, Typography } from "@mui/material";

interface NewStudentsCard {
  header: string;
  number: GLfloat;
  percentage: string;
}

export const NewStudentsCard = ({
  header,
  number,
  percentage,
}: NewStudentsCard) => {
  const theme = useTheme();
  return (
    <Card
      component={Box}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: { xs: "0vh", sm: "15vh", md: "15vh", lg: "0vh" },
        backgroundColor: theme.palette.mode === "light" ? "#fff" : "#282c34",
        borderRadius: 7,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#A6C8FF",
          p: "5%",
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
          {header}{" "}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{
          flexGrow: 1,
          textAlign: "left",
          fontSize: { xs: "1.5em", sm: "2em" },
          padding: { xs: "5%", sm: "2.5%" },
          color: "#333333",
        }}
      >
        {number}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          fontSize: { xs: "0.9em", sm: "1.1em" },
          padding: "4%",
          color: "#33333",
        }}
      >
        {percentage}
      </Typography>
    </Card>
  )};

export default NewStudentsCard;
