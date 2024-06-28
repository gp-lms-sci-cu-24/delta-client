import { Avatar, Box, Typography } from "@mui/material";

interface IProfessorDataField {
  alt: string;
  src: string;
  name: string;
  value: string;
  subValue: string;
}

export const ProfessorDataField = ({
  alt,
  src,
  name,
  value,
  subValue,
}: IProfessorDataField) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        backgroundColor: "#4E9BFF",
      }}
    >
      <Avatar
        alt={alt}
        src={src}
        sx={{
          width: 63,
          height: 63,
          border: "2px solid white",
          marginRight: "10px",
        }}
      />
      <Box>
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "1.1em",
            textAlign: "left",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "1em",
            textAlign: "left",
          }}
        >
          {value}
        </Typography>
        <Typography sx={{ color: "white", fontSize: "0.8em" }}>
          {subValue}
        </Typography>
      </Box>
      
    </Box>
  );
};
