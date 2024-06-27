import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

interface IProps {
    length:number;


}
const  SkeletonCard =({length}:IProps) => {
  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
    {[...Array(length)].map((_, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={index}
        sx={{
          p: 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={150} />
          <CardContent sx={{ textAlign: "left", width: "100%" }}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
  )
}

export default SkeletonCard