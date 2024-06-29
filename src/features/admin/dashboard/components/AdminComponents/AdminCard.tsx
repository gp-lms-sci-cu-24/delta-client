import { Box, Card, Typography } from "@mui/material";
import { ReactElement } from "react";
import { motion } from "framer-motion";
interface IProps {
  value: number;
  title: string;
  Icon: ReactElement;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  blur?: boolean;
}
function AdminCard({ value, title, Icon, blur, onMouseEnter, onMouseLeave }: IProps) {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.5,
      delay: 0.2,
      ease: [0, 0.71, 0.2, 1.01],
    }}
  >
    <Card
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 5,
        p: 1,
        width: "88%",
        justifyContent: "center",
        alignItems: "center",
        filter: blur ? "blur(4px)" : "none",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          zIndex: 1,
          width: "90%",
          backgroundColor: "#f5f5f5",
          transform: "scale(1.2)",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#A6C8FF",
          display: "flex",
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <motion.div
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {Icon}
        </motion.div>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", p: 1, flex: 1 }}>
        <Typography variant="subtitle2" sx={{ color: "#535353", fontWeight: "bold" }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: "#535353" }}>
          {title}
        </Typography>
      </Box>
    </Card>
    </motion.div>
  );
}

export default AdminCard;
