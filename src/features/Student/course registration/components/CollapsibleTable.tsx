import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CollapsibleRow from "./CollapsibleTableRow";
import emptyList from "../../../../assets/animations/emptyList.json";
import { timingrow } from "../types";
import { EmptyPage } from "@/components/empty/EmptyPage";

interface props {
  rows: timingrow[];
}
export default function CollapsibleTable(data: props) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={6}>
              <Typography
                variant="body1"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                Available Groups
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <EmptyPage
                  messege="No groups found"
                  animationFile={emptyList}
                />
              </TableCell>
            </TableRow>
          ) : (
            data.rows?.map((row) => <CollapsibleRow key={row.name} row={row} />)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
