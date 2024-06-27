import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Stack } from "@mui/material";
import { announcementsColumns } from "./Data";
import { useGetAllAnnouncementsQuery } from "./AnnouncementApiSlice";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserPayload } from "@/features/auth/authSlice";
import { useResponsiveStack } from "@/services/responsive";
import Header from "@/components/Header";
import CustomButton from "@/components/buttons/CustomButton";
import { Role } from "@/features/auth/types";
import { EmptyDataGrid } from "@/components/empty/EmptyDataGrid";

function Announcement() {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const currentUser = useSelector(selectCurrentUserPayload);

  const navigate = useNavigate();
  const { isSmallDown } = useResponsiveStack();
  const { data, isLoading, isFetching } =
    useGetAllAnnouncementsQuery(paginationModel);
  const rows = data?.content || [];
  const rowCount = data?.totalElements || 0;
  return (
    <Box sx={{ p:1, height: "100vh" }}>
      <Stack direction="row" justifyContent="space-between">
        <Header pageName={"Announcements"} message="" />
        {!currentUser?.roles.includes(Role.STUDENT) && (
          <CustomButton
            onClick={() => navigate("/app/admin/announcements/add")}
            variant="contained"
            customSx={{
              height: isSmallDown ? "30px" : "40px",
              textTransform: "capitalize",
              fontSize: isSmallDown ? "8px" : "14px",
              width: isSmallDown ? "100px" : "180px",
            }}
            title="Add Announcement"
          />
        )}
      </Stack>
      <DataGrid
        rows={rows}
        columns={announcementsColumns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        slots={{
          noRowsOverlay: EmptyDataGrid,
          toolbar: isSmallDown ? null : GridToolbar,
        }}
        pagination
        disableRowSelectionOnClick
        paginationMode="server"
        loading={isLoading || isFetching}
        checkboxSelection={false}
        rowCount={rowCount}
        sx={{
          "--DataGrid-overlayHeight": "300px",
          "& .MuiDataGrid-cell:focus ,& .MuiDataGrid-columnHeader:focus ,& .MuiDataGrid-cell:focus-within":
            {
              outline: " none",
            },
          mt: 2,
        }}
      />
    </Box>
  );
}

export default Announcement;
