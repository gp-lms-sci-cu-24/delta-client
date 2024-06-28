import { Box } from "@mui/material";
import DepartmentForm from "./components/DepartmentForm";
import Header from "@/components/Header";

function AddDepartment() {
  return (
    <Box sx={{p:1 }}>
      <Header pageName={"Add Departments"} message="" />
      <DepartmentForm />
    </Box>
  );
}

export default AddDepartment;
