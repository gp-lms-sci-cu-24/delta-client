import { Card, Box, Typography, Stack } from "@mui/material";
import { ProfileDataField } from "./ProfileDataField";
import { IEducationalInfo } from "../type";
import { useResponsiveStack } from "@/services/responsive";

const EducatinalInfoCard = ({
  level,
  department,
  gradePointAverage,
  degree,
  creditHours,
  creditHoursToGrad,
}: IEducationalInfo) => {
  const { isXSmall } = useResponsiveStack();
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        borderRadius: 6,
      }}
    >
      <Box sx={{ padding: 2, backgroundColor: "#a7c8fe", mb: 2 }}>
        <Typography fontSize={isXSmall ? "14px" : "18px"}>
          Educational Information
        </Typography>
      </Box>
      <Box sx={{ padding: 2 }}>
        {degree && <ProfileDataField name="Degree" value={degree} />}
        {level && <ProfileDataField name="Level" value={level} />}
        {(department || gradePointAverage) && (
          <Stack
            direction={"column"}
            justifyContent={isXSmall ? "space-between" : "flex-start"}
          >
            {department && (
              <ProfileDataField name="Department" value={department} />
            )}
            {gradePointAverage && (
              <ProfileDataField name="GPA" value={gradePointAverage} />
            )}
          </Stack>
        )}
        {(creditHours || creditHoursToGrad) && (
          <Stack direction={"column"}>
            {creditHours && (
              <ProfileDataField name="Credit Hours" value={creditHours} />
            )}
            {creditHoursToGrad && (
              <ProfileDataField
                name="Credit Hours To Gradaute"
                value={creditHoursToGrad}
              />
            )}
          </Stack>
        )}
      </Box>
    </Card>
  );
};
export default EducatinalInfoCard;
