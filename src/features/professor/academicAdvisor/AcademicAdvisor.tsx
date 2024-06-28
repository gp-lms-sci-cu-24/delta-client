import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { columns, rows } from "./AcdemicAdvisorData";
import { Box } from "@mui/material";
import React from "react";
import Header from "@/components/Header";
import ControlledAccordion from "@/components/ControlledAccordion";
import { columnsLevel, rowsLevelOne } from "./Levels";
import FullDialog from "@/components/FullDialog";
function AcademicAdvisor() {
  const pageSize = [20, 40, 60, 80, 100];
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Header
        pageName="Academic Advisor"
        message="Welcome to Academic Advisor"
      />
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        checkboxSelection
        loading={false}
        pageSizeOptions={pageSize}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        onCellDoubleClick={handleClickOpen}
      />
      <FullDialog
        open={open}
        handleClose={handleClose}
        Children={
          <Box
            sx={{
              padding: 1,
            }}
          >
            <ControlledAccordion
              expanded={expanded}
              handleChange={handleChange}
              panel="panel1"
              title="Level one"
              children={
                <DataGrid
                  rows={rowsLevelOne}
                  columns={columnsLevel}
                  loading={false}
                />
              }
            />
            <ControlledAccordion
              expanded={expanded}
              handleChange={handleChange}
              panel="panel2"
              title="Level Two"
              children={
                <DataGrid
                  rows={rowsLevelOne}
                  columns={columnsLevel}
                  loading={false}
                />
              }
            />
            <ControlledAccordion
              expanded={expanded}
              handleChange={handleChange}
              panel="panel3"
              title="Level Three"
              children={
                <DataGrid
                  rows={rowsLevelOne}
                  columns={columnsLevel}
                  loading={false}
                />
              }
            />
            <ControlledAccordion
              expanded={expanded}
              handleChange={handleChange}
              panel="panel4"
              title="Level Four"
              children={
                <DataGrid
                  rows={rowsLevelOne}
                  columns={columnsLevel}
                  loading={false}
                />
              }
            />
          </Box>
        }
      />
    </Box>
  );
}

export default AcademicAdvisor;
