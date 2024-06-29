import { useState, Fragment } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { Box, Button, Collapse, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { CourseClass } from "@features/shared";
import { viewTimeWithoutSeconds } from "@utils/types/time";
import ConfirmDialog from "@components/ConfirmDialog";

export interface ICollapsibleRowProps {
  courseClass: CourseClass;
  handleAddCourseClass?: () => void;
}

export default function CollapsibleRow({
  courseClass,
  handleAddCourseClass,
}: ICollapsibleRowProps) {
  const available = courseClass.numberOfStudentsRegistered < courseClass.maxCapacity;
  const almostAvailable = courseClass.numberOfStudentsRegistered > courseClass.maxCapacity * 0.8;
  const [open, setOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleConfirm = (state: "confirm" | "cancel") => {
    setConfirmDialogOpen(false);
    if (state === "confirm" && handleAddCourseClass) {
      handleAddCourseClass();
    }
  };
  return (
    <Fragment>
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
          Group {courseClass.groupNumber}
        </TableCell>

        <TableCell width={30} align="right">
          <Box sx={{ display: "flex", flexDirection: "row-reverse", width: 100 }}>
            <GroupsIcon fontSize="small" sx={{ mr: 1, color: "gray" }} />
            <Typography sx={{ mr: 1 }}>
              {" "}
              {courseClass.numberOfStudentsRegistered}/{courseClass.maxCapacity}
            </Typography>
          </Box>
        </TableCell>
        <TableCell width={30} align="right">
          {available ? (
            <LockOpenIcon fontSize="small" sx={{ color: almostAvailable ? "yellow" : "green" }} />
          ) : (
            <LockIcon fontSize="small" sx={{ color: "red" }} />
          )}
        </TableCell>

        <TableCell style={{ width: 170 }} align="right">
          <Button
            variant="outlined"
            onClick={() => setConfirmDialogOpen(true)}
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7} size="medium">
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
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
                  {courseClass?.timings?.map((t, i) => (
                    <TableRow key={i}>
                      <TableCell>{t.day}</TableCell>
                      <TableCell>{viewTimeWithoutSeconds(t.startTime)}</TableCell>
                      <TableCell>{viewTimeWithoutSeconds(t.endTime)}</TableCell>
                      <TableCell>{t.type}</TableCell>
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
        onClose={handleConfirm}
        text="By confirm this group you will add all its timetable."
        title="Confirm Group Selection"
      />
    </Fragment>
  );
}
