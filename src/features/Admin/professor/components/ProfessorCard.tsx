import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface ProfessorCardProps {
  title: string;
  imageUrl: string;
  handleClick: () => void;
}

function ProfessorCard({ title, imageUrl,handleClick }: ProfessorCardProps) {

 

  return (
    <Card
      sx={{
        minWidth: 215,
        maxWidth: 355,
        height: "100%",
        borderRadius: 4,
      }}
      elevation={0}
      variant="outlined"
    >
      <CardMedia sx={{ height: 150 }} image={imageUrl} title="course image" />
      <CardContent>
        <Typography
          gutterBottom
          fontWeight={"bold"}
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            transition: "background-color .4s",
            "&:hover": {
              backgroundColor: "#1089d4",
              color: "white",
            },
          }}
          onClick={handleClick} // Call handleClick when button is clicked
        >
          open
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProfessorCard;
