import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import emptyList from "@assets/animations/emptyList.json";
import { EmptyPage } from "@/components/empty/EmptyPage";
import { CourseClass } from "@features/shared";
import { DeleteButton } from "@components/delete/DeleteButton";

export interface IReigsteredClassesTableProps {
  courseClasses?: CourseClass[];
  isLoading?: boolean;
  isRemoving?: boolean;
  removeCourseClassRegistration?: (courseClass: CourseClass) => void;
}

export default function ReigsteredClassesTable({
  courseClasses = [],
  removeCourseClassRegistration,
  isLoading,
  isRemoving,
}: IReigsteredClassesTableProps) {
  const dataPre = courseClasses.map((courseClass) =>
    courseClass?.timings?.map((time) => ({
      time: time,
      courseClass: courseClass,
      remove: () => removeCourseClassRegistration?.(courseClass),
    })),
  );

  const data =
    dataPre
      ?.filter((d) => d !== undefined)
      .flat()
      ?.sort((a, b) => {
        if (a?.time.day > b?.time.day) return 1;
        if (a?.time.day < b?.time.day) return -1;
        if (a?.time.startTime > b?.time.startTime) return 1;
        if (a?.time.startTime < b?.time.startTime) return -1;
        return 0;
      }) ?? [];
  // const handleDeleteClick = () => {
  //   setDeleteDialogOpen(true);
  // };

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
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <EmptyPage messege="No Course registered" animationFile={emptyList} />
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => (
              <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.time.day}
                </TableCell>
                <TableCell align="center">{row.courseClass.groupNumber}</TableCell>
                <TableCell align="center">
                  {row.courseClass.course.name} ({row.courseClass.course.code})
                </TableCell>
                <TableCell align="center">{row.time.startTime}</TableCell>
                <TableCell align="center">{row.time.endTime}</TableCell>
                <TableCell align="center">{row.time.location.name}</TableCell>
                <TableCell align="center">
                  <DeleteButton
                    isLoading={isRemoving}
                    onDelete={row.remove}
                    dialogText="Are you sure? , You want to remove registration?"
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
