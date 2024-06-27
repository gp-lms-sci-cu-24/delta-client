import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Fade from "@mui/material/Fade";
import CustomDialog, { DeleteDialogOnCloseState } from "./CustomDialog";

interface FadeMenuProps {
  onDelete?: () => void;
  onUpdate?: () => void;
  header: string;
}

const CustomFadeMenu: React.FC<FadeMenuProps> = ({
  onDelete,
  onUpdate,
  header,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    // setEditDialogOpen(true);
    if (onUpdate) onUpdate();
  };

  const handleDelete = () => {
    setAnchorEl(null);
    setDeleteDialogOpen(true);
  };
  const handleDeleteAction = (state: DeleteDialogOnCloseState) => {
    if (state === "delete" && onDelete) onDelete();
    setDeleteDialogOpen(false);
  };

  return (
    <Box>
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleEdit} sx={{ color: "#1976d2" }}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
          Delete
        </MenuItem>
      </Menu>

      <CustomDialog
        open={deleteDialogOpen}
        onClose={handleDeleteAction}
        header={header}
      />
    </Box>
  );
};

export default CustomFadeMenu;
