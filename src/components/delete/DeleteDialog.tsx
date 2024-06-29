import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export type DeleteDialogOnCloseState = "delete" | "cancel";
export interface DeleteDialogProps {
  open: boolean;
  onClose: (state: DeleteDialogOnCloseState) => void;
  title?: string;
  text?: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  title = "Delete Confirmation",
  text = "Are you sure you want to delete?",
}) => {
  return (
    <Dialog open={open} onClose={() => onClose("cancel")} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose("cancel")}>Cancel</Button>
        <Button color="error" onClick={() => onClose("delete")} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
