import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import forgetPassword from "@assets/forgetPassword.png";
// import FileUpload from "react-mui-fileuploader";

function ForgotPasswordPage() {
  const navigate = useNavigate();

  return (
    <Container sx={{ pt: 5 }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} textAlign="center">
          <img
            src={forgetPassword}
            alt="forget password"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ pt: 5 }}>
          <Typography variant="h4" sx={{ mt: 5 }}>
            Forgot
            <br />
            Your Password
          </Typography>
          <TextField
            label="Enter Your E-mail"
            variant="standard"
            fullWidth
            sx={{ mt: 5, mb: 5 }}
          />
          {/* <FileUpload
            sx={{ backgroundColor: "#f5f5f5" }}
            getBase64={false}
            title="upload file"
            header="Drag to drop"
            imageSrc={""}
            multiFile={false}
            showPlaceholderImage={false}
            maxUploadFiles={1}
            disabled={false}
            buttonRemoveLabel="Remove"
            BannerProps={{ elevation: 0 }}
          /> */}

          <Grid container sx={{ mt: 5 }}>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" sx={{ mt: 5 }}>
                Reset
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ pt: 5 }}>
              <Typography
                variant="body1"
                onClick={() => {
                  navigate(-1);
                }}
                sx={{
                  cursor: "pointer",
                }}
              >
                Back To Login
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ForgotPasswordPage;
