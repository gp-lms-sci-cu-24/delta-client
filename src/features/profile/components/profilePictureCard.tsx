import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useRef, useState } from "react";
import { useUploadProfileImageMutation } from "../ProfileApiSlice";
import { useSnackbar } from "notistack";
import { IProfilePictureCard } from "../type";

const ProfilePictureCard = ({
  imageUrl,
  userName,
  handelLogout,
}: IProfilePictureCard) => {
  const navigation = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<FileList | null>(null);
  const [uploadProfileImage] = useUploadProfileImageMutation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showSave, setShowSave] = useState<boolean>(true);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setShowSave(true);
      console.log("Selected file:", files[0]);
      setImage(files);
    }
  };

  const handleUpload = async () => {
    if (image) {
      enqueueSnackbar(`Uploading Profile image...`, {
        variant: "info",
        autoHideDuration: null,
        key: "uploading-image-toast",
      });

      const formData = new FormData();
      formData.append("image", image[0]);
      await uploadProfileImage({
        formData,
      })
        .unwrap()
        .then((result) => {
          console.log("result", result);
          setImage(null);
          console.log("oimage", image);
        })
        .catch((err) => {
          console.log("err", err);
        });

      closeSnackbar("uploading-image-toast");
      console.log(`Image for Profile uploaded successfully`);
      enqueueSnackbar(`Image for Profile uploaded successfully`, {
        variant: "success",
      });
      setShowSave(false);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        p: 1,
        backgroundColor: "#4d9bff",
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Box>
          <Button
            sx={{
              width: 175,
              height: 175,
              mb: 2,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              mt: 1.25,
            }}
            disableRipple
            onClick={handleButtonClick}
          >
            {imageUrl || image ? (
              <Avatar
                alt={userName}
                src={
                  (image && image.length > 0
                    ? URL.createObjectURL(image[0])
                    : "") || imageUrl
                }
                sx={{ objectFit: "cover", width: 170, height: 170, my: "auto" }}
              />
            ) : (
              <Box
                sx={{
                  width: 170,
                  height: 170,
                  mb: 2,
                  borderRadius: 99999,
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: 0.7,
                }}
              >
                <Box
                  sx={{
                    height: 100,
                    width: 100,
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    my: "auto",
                  }}
                >
                  <CameraAltIcon
                    sx={{
                      fontSize: 35,
                      color: "black",
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Box>
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*" // Accept images only
            style={{ display: "none" }} // Hide the file input
            onChange={handleFileChange}
          />
        </Box>
        {image && image.length > 0 && showSave && (
          <Button
            onClick={handleUpload}
            variant="text"
            sx={{
              color: "white",
              textTransform: "capitalize",
              fontWeight: "bold",
              textAlign: "center",
              p: 1,
            }}
          >
            Save
          </Button>
        )}
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "white", mt: 1, mb: 12 }}
          color="#000000"
        >
          {userName}
        </Typography>
        <Box sx={{ mt: "auto", width: "100%" }}>
          {/* <Button
            onClick={() => console.log("change password")}
            variant="text"
            fullWidth
            sx={{
              color: "white",
              textTransform: "capitalize",
              fontWeight: "bold",
              textAlign: "center",
              p: 1,
            }}
          >
            Change Password
          </Button> */}
          <Button
            variant="text"
            fullWidth
            onClick={() => navigation("./../viewschedule")}
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
              textAlign: "center",
              p: 1,
              color: "white",
            }}
          >
            View Schedule
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={handelLogout}
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
              textAlign: "center",
              p: 1,
              color: "white",
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfilePictureCard;
