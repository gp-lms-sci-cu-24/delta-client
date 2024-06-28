import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { departmentColumns, departmentrows } from "./DepartmentMapsData";
import CustomDataGrid from "./components/CustomDataGrid";
interface Props {
  id?: string;
}
function DepartmentMap({ id }: Props) {
  const theme = useTheme();
  const check = useMediaQuery(theme.breakpoints.down("md"));
  console.log("id", id);

  return (
    <Box>
      <Stack
        direction={check ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <CustomDataGrid
          title={"First semester"}
          rows={departmentrows}
          columns={departmentColumns}
        />
        <CustomDataGrid
          title={"Second semester"}
          rows={departmentrows}
          columns={departmentColumns}
        />
      </Stack>

      <Stack
        direction={check ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <CustomDataGrid
          title={"Third semester"}
          rows={departmentrows}
          columns={departmentColumns}
        />
        <CustomDataGrid
          title={"Fourth semester"}
          rows={departmentrows}
          columns={departmentColumns}
        />
      </Stack>
      <Stack
        direction={check ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <CustomDataGrid
          title={"Fifth semester"}
          rows={departmentrows}
          columns={departmentColumns}
        />
        <CustomDataGrid
          title={"Sixth semester"}
          rows={departmentrows}
          columns={departmentColumns}
        />
      </Stack>
      <Stack
        direction={check ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <CustomDataGrid
          title={"Seventh semester"}
          rows={departmentrows}
          columns={departmentColumns}
        />
        <CustomDataGrid
          title={"Eighth semester"}
          rows={departmentrows}
          columns={departmentColumns}
        />
      </Stack>
    </Box>
  );
}

export default DepartmentMap;
