import { Card, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ProfileDataField } from "./ProfileDataField";
import { IProfileInfoCard } from "../type";
import { useResponsiveStack } from "@/services/responsive";

const ProfileInfoCard = ({
  userName,
  email,
  phoneNumber,
  address,
  nationalId,
  handleClick,
  gender,
}: IProfileInfoCard) => {
  const { isXSmall } = useResponsiveStack();

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        backgroundColor: "#f5f5f5",
        mb: 2,
      }}
    >
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#a7c8fe",
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize={isXSmall ? "14px" : "18px"}>
          Personal Information
        </Typography>
        <IconButton size={isXSmall ? "small" : "medium"} onClick={handleClick}>
          <EditIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: 2 }}>
        {email && <ProfileDataField name="Email" value={email} />}
        {phoneNumber && (
          <ProfileDataField name="Phone Number" value={phoneNumber} />
        )}

        <ProfileDataField name="User Name" value={userName} />
        {nationalId && (
          <ProfileDataField name="National ID" value={nationalId} />
        )}
        {address && <ProfileDataField name="Address" value={address} />}
        {gender && <ProfileDataField name="Gender" value={gender} />}
      </Box>
    </Card>
  );
};

export default ProfileInfoCard;
