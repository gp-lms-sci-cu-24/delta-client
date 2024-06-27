import { Box, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import AnnouncementsModal from "./components/AnnouncementsModal";

const announcementsColumns: GridColDef[] = [
  {
    field: "createdAt",
    headerName: "Date",
    align: "left",
    headerAlign: "center",
    flex: 1,
    minWidth: 130,
    renderCell: ({ row: { createdAt } }) => {
      return (
        <Box
          sx={{
            p: "5px",
            textTransform: "none",
          }}
        >
          <Stack>
            <Typography variant="caption">{createdAt.slice(0, 10)}</Typography>
            <Typography variant="caption" color={"grey"}>
              At: {createdAt.slice(11, 16)}
            </Typography>
          </Stack>
        </Box>
      );
    },
  },
  {
    field: "title",
    headerName: "Announcements",
    flex: 7,
    description: "Announcements",
    sortable: false,
    minWidth: 100,
    renderCell: ({ row: { title, description } }) => {
      return (
        <Stack flexGrow={1} alignItems="left">
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="caption" color={"grey"}>
            {description.length > 50
              ? description.slice(0, 50) + "..."
              : description}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: "details",
    headerName: "",
    align: "center",
    headerAlign: "center",
    flex: 1,
    minWidth: 80,
    sortable: false,
    disableColumnMenu: true,

    renderCell: ({ row: { id, title, description, editedAt, createdAt } }) => {
      return (
        <AnnouncementsModal
          id={id}
          title={title}
          description={description}
          editedAt={editedAt}
          createdAt={createdAt}
        />
      );
    },
  },
];
export { announcementsColumns };
