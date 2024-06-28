import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">{"Delete Group"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          by delete this timetable you will delete all it is timetables related to this course.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onClose} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
