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
  header: string;
}

const CustomDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  header,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose("cancel")}
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle id="delete-dialog-title">{header}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete?
        </DialogContentText>
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

export default CustomDialog;
