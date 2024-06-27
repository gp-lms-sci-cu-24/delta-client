import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { InputField } from "@/components/inputs/InputField";

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
}

const EditDialog: React.FC<EditDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-dialog-title"
      fullWidth
    >
      <DialogTitle id="edit-dialog-title" sx={{ fontWeight: "bold", fontSize: 30 }}>{"Edit Department"}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "auto",
          }}
        >
          <Box sx={{ mb: 2, mt: 2 }}>
            <InputField label="Name" error={false} variant={undefined} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputField label="Info" error={false} variant={undefined} />
          </Box>
          <InputField label="Code" error={false} variant={undefined} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} autoFocus sx={{ color: "green" }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
