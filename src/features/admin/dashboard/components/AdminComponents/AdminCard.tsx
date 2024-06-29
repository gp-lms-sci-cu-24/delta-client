import { Box, Card, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
interface IProps {
  value: number;
  title: string;
}
function AdminCard({ value, title }: IProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 5,
        p:1,
        width:"90%"
        ,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Box
          sx={{
            backgroundColor: "#A6C8FF",
            display: "flex",
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            
          }}
        >
          <PersonIcon fontSize="large" sx={{ color: "white" }} />
        
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", p: 1 ,flex:1 }}
      >
        <Typography  variant="subtitle2" sx={{color:"#535353" ,fontWeight:"bold"}}>{value}</Typography>
        <Typography variant="body2"  sx={{color:"#535353"}}>{title}</Typography>
      </Box>
    </Card>
  );
}

export default AdminCard;
