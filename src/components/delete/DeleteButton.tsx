import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog, { DeleteDialogOnCloseState } from "./DeleteDialog";
import { useState } from "react";

export interface IDeleteButtonProps {
  onDelete: () => void;
  isLoading?: boolean;
}

export function DeleteButton(props: IDeleteButtonProps) {
  const { onDelete, isLoading } = props;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteAction = (state: DeleteDialogOnCloseState) => {
    if (state === "delete" && onDelete) onDelete();
    setDeleteDialogOpen(false);
  };
  return (
    <>
      <Tooltip placement="top" title="Delete">
        <IconButton
          color="error"
          onClick={() => setDeleteDialogOpen(true)}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress sx={{ color: "#1089d4" }} size={24} />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      </Tooltip>
      <DeleteDialog open={deleteDialogOpen} onClose={handleDeleteAction} />
    </>
  );
}
