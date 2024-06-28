import { Box, Card, Typography } from "@mui/material";
import { ProfessorDataField } from "./ProfessorDataField";

interface IProfessorCard {
  percentage: string;
  text: string;
}

export const ProfessorCard = ({ percentage, text }: IProfessorCard) => {
  return (
    <Card
      sx={{
        borderRadius: 7,
        marginRight: 2,
      }}
    >
      {/*avatar box*/}
      <ProfessorDataField
        alt="Hossam"
        src="https://material-ui.com/static/images/avatar/9.jpg"
        name="Prof. Hossam"
        value="70% of students "
        subValue="STAT 201"
      />
      <Box sx={{ backgroundColor: "#A6C8FF" }}>
        <Box sx={{ px: 2, py: 2 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: "1.5em",
              textAlign: "flex-end",
            }}
          >
            {percentage}
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: "1em",
            }}
          >
            {text} <br></br>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfessorCard;
