import { Box } from "@mui/material";
import LocationForm from "./components/LocationForm";
import Header from "@/components/Header";

function AddLocation() {
  return (
    <Box sx={{ p: 1 }}>
      <Header pageName={"Add Location"} message="" />
      <LocationForm />
    </Box>
  );
}

export default AddLocation;
