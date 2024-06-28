import { useTheme, Card, Box, Typography } from "@mui/material";

interface TotalStudentsCard {
  header: string;
  number: GLfloat;
  percentage: string;
}

export const NewStudentsCard = ({
  header,
  number,
  percentage,
}: TotalStudentsCard) => {
  const theme = useTheme();
  return (
    <Card
      component={Box}
      sx={{
        display: "flex",
        height: {sm: "100%"},
        flexDirection: "column",
        backgroundColor: theme.palette.mode === "light" ? "#fff" : "#282c34",
        borderRadius: 7,
      }}
    >
      {/* Baby blue tip */}
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
          pt: 2,
        }}
      >
        {number}{" "}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          fontSize: { xs: "0.9em", sm: "1.1em" },
          padding: "4%",
          color: "#333333", // Fix color code here
        }}
      >
        {percentage}{" "}
      </Typography>
    </Card>
  );
};

export default NewStudentsCard;
