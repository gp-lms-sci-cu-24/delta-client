import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import DeleteDialog from "./DeleteDialog";
import emptyList from "../../../../assets/animations/emptyList.json";
import { EmptyPage } from "@/components/empty/EmptyPage";

function createData(
  day: string,
  group: string,
  course: string,
  startAt: string,
  endAt: string,
  location: string
) {
  return { day, group, course, startAt, endAt, location };
}
const rows: ReturnType<typeof createData>[] = [
  createData("Sunday", "1", "CS", "8 am", "10 am", "modarg 10"),
  createData("Sunday", "1", "CS", "8 am", "10 am", "modarg 10"),
  createData("Sunday", "1", "CS", "8 am", "10 am", "modarg 10"),
  createData("monday", "1", "CS", "8 am", "10 am", "modarg 10"),
  createData("monday", "1", "CS", "8 am", "10 am", "modarg 10"),
  createData("monday", "1", "CS", "8 am", "10 am", "modarg 10"),
];

export default function CurrentTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={12}>
              <Typography variant="body1" align="center" sx={{ fontWeight: "bold" }}>
                Current timetable
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell align="center">Group</TableCell>
            <TableCell align="center">Course</TableCell>
            <TableCell align="center">Start at</TableCell>
            <TableCell align="center">End at</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <EmptyPage
                  messege="No timetable found"
                  animationFile={emptyList}
                />
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.day}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.day}
                </TableCell>
                <TableCell align="center">{row.group}</TableCell>
                <TableCell align="center">{row.course}</TableCell>
                <TableCell align="center">{row.startAt}</TableCell>
                <TableCell align="center">{row.endAt}</TableCell>
                <TableCell align="center">{row.location}</TableCell>
                <TableCell align="center">
                  <IconButton sx={{ color: "red" }} onClick={handleDeleteClick}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </TableContainer>
  );
}
