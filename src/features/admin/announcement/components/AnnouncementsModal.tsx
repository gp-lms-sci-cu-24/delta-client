import React from "react";
import { IProps } from "../type";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useDeleteAnnouncementMutation } from "../AnnouncementApiSlice";
import { useSnackbar } from "notistack";
import { useResponsiveStack } from "@/services/responsive";
import CustomFadeMenu from "@/components/CustomFadeMenu";

function AnnouncementsModal({ id, title, description, createdAt }: IProps) {
  const [deleteAnnouncement, { isLoading }] = useDeleteAnnouncementMutation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isMediumDown } = useResponsiveStack();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    await deleteAnnouncement(id)
      .unwrap()
      .then((result) => {
        console.log("result", result);
        enqueueSnackbar("Announcement deleted successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Announcement delete failed", {
          variant: "error",
        });
      });
  };
  return (
    <Box
      sx={{
        p: "5px",
        textTransform: "none",
      }}
    >
      <Button
        onClick={handleOpen}
        disableElevation
        sx={{
          p: "4px",
          width: "50px",
          borderRadius: "5px",
          textAlign: "center",
          textTransform: "none",
          fontSize: "14px",
        }}
        variant="outlined"
      >
        Details
      </Button>
      <Modal
        open={open}
        onClose={!isLoading ? handleClose : undefined}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          pointerEvents: isLoading ? "none" : "auto", // Disable pointer events when loading
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMediumDown ? "70%" : "50%",
            height: isMediumDown ? "30vh" : "35vh",
            maxHeight: "60vh",
            bgcolor: "white",
            border: "2px solid #ffff",
            boxShadow: 24,
            borderRadius: "10px",
            p: 3,
            overflow: "hidden",
            overflowY: "scroll",
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          {isLoading && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Box>
              <Typography
                id="modal-modal-title"
                sx={{
                  textTransform: "capitalize",
                  color: "#03a9f4",
                  fontWeight: "bold",
                }}
                variant="h6"
                component="h2"
              >
                {title}
              </Typography>
              <Typography sx={{ fontSize: "10px", ml: 1 }}>
                {createdAt?.slice(0, 10) + " " + createdAt?.slice(11, 16)}
              </Typography>
            </Box>
            <CustomFadeMenu
              onDelete={handleDelete}
              onUpdate={() => {}}
              header="Delete Announcement"
            />
          </Box>
          <Box sx={{ mt: 1, p: 1 }}>
            <Typography sx={{ fontSize: "14px", textTransform: "capitalize" }}>
              {description}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default AnnouncementsModal;
