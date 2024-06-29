import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { departmentColumns, departmentrows } from "./DepartmentMapsData";
import CustomDataGrid from "./components/CustomDataGrid";
import { useEffect, useState } from "react";
import { CumulativeResultDto } from "./type";
import { useGetDepartmentMapQuery } from "./departmentMapSlice";
interface Props {
  id?: string;
}
function DepartmentMap({ id }: Props) {
  const theme = useTheme();
  const check = useMediaQuery(theme.breakpoints.down("md"));
  const [semester, setSemester] = useState<CumulativeResultDto[][]>([]);
  console.log("id", id);
  const { data } = useGetDepartmentMapQuery(id || "__");
  useEffect(() => {
    if (data) {
      setSemester(data);
    }
  }, [data]);
  console.log("semester", semester[0]);
  return (
    <Box sx={{ p: 1, height: "100vh" }}>
      <Stack direction={check ? "column" : "row"} justifyContent={"space-between"}>
        <CustomDataGrid
          title={"First semester"}
          rows={semester[0]?.map((item) => ({ ...item, id: item?.courseCode })) || []}
          columns={departmentColumns}
        />
        <CustomDataGrid
          title={"Second semester"}
          rows={semester[1]?.map((item) => ({ ...item, id: item?.courseCode })) || []}
          columns={departmentColumns}
        />
      </Stack>

      <Stack direction={check ? "column" : "row"} justifyContent={"space-between"}>
        <CustomDataGrid
          title={"Third semester"}
          rows={semester[2]?.map((item) => ({ ...item, id: item?.courseCode })) || []}
          columns={departmentColumns}
        />
        <CustomDataGrid
          title={"Fourth semester"}
          rows={semester[3]?.map((item) => ({ ...item, id: item?.courseCode })) || []}
          columns={departmentColumns}
        />
      </Stack>
      <Stack direction={check ? "column" : "row"} justifyContent={"space-between"}>
        <CustomDataGrid
          title={"Fifth semester"}
          rows={semester[4]?.map((item) => ({ ...item, id: item?.courseCode })) || []}
          columns={departmentColumns}
        />
        <CustomDataGrid
          title={"Sixth semester"}
          rows={semester[5]?.map((item) => ({ ...item, id: item?.courseCode })) || []}
          columns={departmentColumns}
        />
      </Stack>
      <Stack direction={check ? "column" : "row"} justifyContent={"space-between"}>
        <CustomDataGrid
          title={"Seventh semester"}
          rows={semester[6]?.map((item) => ({ ...item, id: item?.courseCode })) || []}
          columns={departmentColumns}
        />
        <CustomDataGrid
          title={"Eighth semester"}
          rows={semester[7]?.map((item) => ({ ...item, id: item?.courseCode })) || []}
          columns={departmentColumns}
        />
      </Stack>
    </Box>
  );
}

export default DepartmentMap;
