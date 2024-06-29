import React, { ReactElement } from "react";
import { Box, Typography } from "@mui/material";

interface ViewerExtraComponentProps {
  handleClick: () => void;
  icon: ReactElement;
  title: string;
}

const ViewerExtraComponent: React.FC<ViewerExtraComponentProps> = ({
  handleClick,
  icon,
  title,
}) => (
  <Box
    style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    onClick={handleClick}
  >
    {React.cloneElement(icon, {
      style: {
        marginRight: "5px",
        color: "#666666",
        fontSize: "25px",
      },
    })}
    <Typography
      sx={{ color: "#666666", fontSize: "12px", fontWeight: "lighter" }}
    >
      {title}
    </Typography>
  </Box>
);

export default ViewerExtraComponent;
