import React from "react";
import { FileUploadProps } from "./index.types";
import ImageUploading, {
} from "react-images-uploading";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import FileUploadAnimation from "../../assets/animations/FileUploaderAnimation.json";
import { useResponsiveStack } from "@/services/responsive";
const FileUpload: React.FC<FileUploadProps> = (props) => {
  const { isSmallDown, isSmall, isMedium } = useResponsiveStack();

  return (
    <ImageUploading
      multiple={false}
      value={props.value}
      onChange={props.onChange}
      dataURLKey="data_url"
      maxFileSize={2 * 1024 * 1024}
      inputProps={props.inputProps}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        isDragging,
        dragProps,
        errors,
      }) => (
        <Box
          sx={{
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            width: isSmallDown ? "100%" : "80%",
            height: "auto",
          }}
        >
          <Typography sx={{ textAlign: "left" }}>Upload Image</Typography>

          <Box
            sx={{
              backgroundColor: "transparent",
              color: "white",
              borderRadius: 2,
              border: "1px dashed gray",
              p: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              ...(isDragging && { opacity: 0.7 }),
            }}
            {...dragProps}
          >
            <Box sx={{ width: "50%" }}>
              <Lottie
                style={{
                  width: isMedium
                    ? 150
                    : isSmall
                    ? 120
                    : isSmallDown
                    ? 90
                    : 200,
                }}
                animationData={FileUploadAnimation}
              />
            </Box>
            {isDragging ? (
              <Typography color={"GrayText"} variant="h5">
                Drop Here
              </Typography>
            ) : (
              <Box sx={{ width: "50%" }}>
                <Typography
                  color={"GrayText"}
                  variant={
                    isSmall ? "subtitle1" : isSmallDown ? "subtitle1" : "h5"
                  }
                >
                  Drag Image
                </Typography>
                <Typography
                  textTransform={"uppercase"}
                  sx={{ my: 1 }}
                  color={"GrayText"}
                  variant={
                    isSmall ? "subtitle2" : isSmallDown ? "subtitle2" : "h6"
                  }
                >
                  or
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    width: isSmall ? "110px" : isSmallDown ? "90px" : "120px",
                    height: isSmallDown ? "35px" : "55px",
                    fontSize: isSmallDown ? "10px" : "14px",
                  }}
                  onClick={onImageUpload}
                >
                  Select File
                </Button>

                <Box>
                  {imageList.map((image, index) => (
                    <Box key={index}>
                      <Typography
                        fontSize={isSmallDown ? "10px" : "14px"}
                        color={"GrayText"}
                      >
                        {image.file?.name}
                      </Typography>
                      {imageList.length > 0 && (
                        <>
                          <Button
                            variant="outlined"
                            onClick={onImageRemoveAll}
                            sx={{
                              color: "#c55052",
                              borderColor: "#c55052",
                              fontSize: isSmallDown ? "10px" : "14px",
                              mt: 1, // Add some margin-top if needed
                              width: isSmallDown ? "90px" : "120px",
                              height: "75px",
                            }}
                          >
                            Remove selected image
                          </Button>
                        </>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
          {errors && (
            <Box>
              {errors.maxNumber && (
                <Typography color={"red"}>
                  Number of selected images exceed maxNumber
                </Typography>
              )}
              {errors.acceptType && (
                <Typography color={"red"}>
                  Your selected file type is not allow
                </Typography>
              )}
              {errors.maxFileSize && (
                <Typography color={"red"}>
                  Selected file size exceed 2 MB
                </Typography>
              )}
              {errors.resolution && (
                <Typography color={"red"}>
                  Selected file is not match your desired resolution
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </ImageUploading>
  );
};

export default FileUpload;
