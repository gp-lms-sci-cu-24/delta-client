import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import emptyList from "../../../../assets/animations/emptyList.json";
import { EmptyPage } from "@/components/empty/EmptyPage";
import { CircularProgress } from "@mui/material";
import { CourseClass } from "@features/shared";
import CollapsibleRow from "./CollapsibleTableRow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface props {
  data?: CourseClass[];
  isLoading?: boolean;
  isRegistered?: boolean;
  isRegistering?: boolean;
  handleRegister?: (courseClass: CourseClass) => void;
}
export default function CollapsibleTable({
  isRegistered = false,
  isLoading = false,
  isRegistering,
  data,
  handleRegister,
}: props) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={6}>
              <Typography variant="body1" align="center" sx={{ fontWeight: "bold" }}>
                Available Groups
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow sx={{ height: "270px" }}>
              <TableCell colSpan={6} align="center">
                <CircularProgress />
                <Typography variant="body1" align="center" sx={{ fontWeight: "bold" }}>
                  loading groups...
                </Typography>
              </TableCell>
            </TableRow>
          ) : isRegistered ? (
            <TableRow sx={{ height: "270px" }}>
              <TableCell colSpan={6} align="center">
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: "6rem" }} />
                <Typography variant="body1" align="center" sx={{ fontWeight: "bold" }}>
                  Course Is Already Registered
                </Typography>
              </TableCell>
            </TableRow>
          ) : !data || data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <EmptyPage messege="No groups" animationFile={emptyList} />
              </TableCell>
            </TableRow>
          ) : (
            data?.map((courseClass, idx) => (
              <CollapsibleRow
                isLoading={isRegistering}
                key={idx}
                courseClass={courseClass}
                handleAddCourseClass={() => handleRegister?.(courseClass)}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
