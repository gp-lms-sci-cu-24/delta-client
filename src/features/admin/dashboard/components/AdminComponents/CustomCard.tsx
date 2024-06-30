import { Box, Typography,Card } from '@mui/material';
import { useResponsiveStack } from '@services/responsive';
import * as React from 'react';
import Chart from 'react-google-charts';
import { ReactElement } from 'react';

export interface IProps {
    header: string;
    children: ReactElement
}

export default function CustomCard (props: IProps) {
    const { isXSmall}=useResponsiveStack ();
  return (
    <Card
    elevation={0}
    sx={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
      borderRadius: 6,
      height: "100%",
      mt: 5,  
    }}
  >
    <Box sx={{ padding: 2, backgroundColor: "#a7c8fe" }}>
      <Typography
        variant={isXSmall ? "body2" : "h5"}
        sx={{ color: "#333333" }}
      >
       {props.header}
      </Typography>
    </Box>
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        marginTop: { xs: 0, sm: 0, md: 5, lg: 5 },
      }}
    >
      {props.children}
    </Box>
  </Card>
  );
}
