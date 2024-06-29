import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface IHeaderDataField {
  name: string;
  value: string;
}
export const HeaderDataField = ({ name, value }: IHeaderDataField) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ color: "#333333", fontWeight: "bold", fontSize: "1.5em" }} variant="h4">
        {name.split(" ").map((el: string, i: number) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.35,
              delay: i / 10,
            }}
            key={i}
          >
            {el}{" "}
          </motion.span>
        ))}
      </Typography>
      <Typography sx={{ padding: 0.5, color: "#666666" }} variant="body2">
        {value.split(" ").map((el: string, i: number) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.125,
              delay: i / 5,
            }}
            key={i}
          >
            {el}{" "}
          </motion.span>
        ))}
      </Typography>
    </Box>
  );
};

export default HeaderDataField;
