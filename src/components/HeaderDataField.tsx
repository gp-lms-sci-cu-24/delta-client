import { Box, Typography } from "@mui/material";

interface IHeaderDataField {
  name: string;
  value: string;
}
export const HeaderDataField = ({ name, value }: IHeaderDataField) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{ color: "#333333", fontWeight: "bold", fontSize: "1.5em" }}
        variant="h4"
      >
        {name}
      </Typography>
      <Typography sx={{ padding: 0.5, color: "#666666" }} variant="body2">
        {value}
      </Typography>
    </Box>
  );
};

export default HeaderDataField;
