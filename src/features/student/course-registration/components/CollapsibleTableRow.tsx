import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { Box, Button, Collapse, Typography } from "@mui/material";
import ConfirmDialog from "./ConfirmDialog";
import GroupsIcon from "@mui/icons-material/Groups";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
export function createData(
  name: string,
  timeTable: { Day: string; StartAt: string; EndAt: string; Type: string }[]
): {
  name: string;
  timeTable: { Day: string; StartAt: string; EndAt: string; Type: string }[];
} {
  return {
    name,
    timeTable,
  };
}

export default function CollapsibleRow(props: {
  row: ReturnType<typeof createData>;
}) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [available] = React.useState(true);
  const [, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

  const handleConfirm = () => {
    setConfirmDialogOpen(true);
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <TableRow>
        <TableCell width={50}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          align="left"
          component="th"
          scope="row"
          sx={{
            fontWeight: "bold",
          }}
        >
          {row.name}
        </TableCell>

        <TableCell width={30} align="right">
          <Box
            sx={{ display: "flex", flexDirection: "row-reverse", width: 100 }}
          >
            <GroupsIcon fontSize="small" sx={{ mr: 1, color: "gray" }} />
            <Typography sx={{ mr: 1 }}> 50/ 60</Typography>
          </Box>
        </TableCell>
        <TableCell width={30} align="right">
          {available ? (
            <LockOpenIcon fontSize="small" sx={{ color: "green" }} />
          ) : (
            <LockIcon fontSize="small" sx={{ color: "red" }} />
          )}
        </TableCell>

        <TableCell style={{ width: 170 }} align="right">
          <Button
            variant="outlined"
            onClick={handleConfirm}
            disabled={!available}
            sx={{
              "&:hover": {
                border: "1px solid #1089d4",
                backgroundColor: "#1089d4",
                color: "white",
              },
            }}
          >
            Select Group
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={7}
          size="medium"
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                TimeTables
              </Typography>
              <Table aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Start at</TableCell>
                    <TableCell>End at</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.timeTable.map((Row, index) => (
                    <TableRow key={index}>
                      <TableCell>{Row.Day}</TableCell>
                      <TableCell>{Row.StartAt}</TableCell>
                      <TableCell>{Row.EndAt}</TableCell>
                      <TableCell>{Row.Type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      />
    </React.Fragment>
  );
}
