import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import StudentInfo from './StudentInfo';
import DepartmentMap from './DepartmentMap';
import { useLocation } from 'react-router-dom';
import Results from './Results';
function StudentAcdemicRecord() {
  const [value, setValue] = React.useState('1');
  const {state} = useLocation();
  const { code } = state;


  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' , }}>
      <TabContext   value={value}>
      <Box sx={{  borderColor: 'divider' }}>
        <TabList  variant='fullWidth' onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Student Table" value="1" />
          <Tab label="Department Map" value="2" /> 
          <Tab label="Results " value="3" /> 
        </TabList>
      </Box>
      {value === '1' && <StudentInfo id={code} />}
      {value === '2' && <DepartmentMap id={code} />}
      {value === '3' && <Results id={code} />}
    </TabContext>
  </Box>
  );
}

export default StudentAcdemicRecord;
