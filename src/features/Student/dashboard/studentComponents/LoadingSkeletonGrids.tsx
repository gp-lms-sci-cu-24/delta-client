import { Box, Typography, Grid, Card } from "@mui/material";

import Skeleton from "@mui/material/Skeleton";

export default function LoadingSkeletonGrids() {
  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      {[...Array(6)].map((_, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={2}
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
              textAlign: "center",
              p: 2,
              borderRadius: 6,
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={25} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
          </Card>
        </Grid>
      ))}

      {[...Array(3)].map((_, index) => (
        <Grid
          item
          xs={12}
          md={12}
          lg={4}
          key={index}
          sx={{
            p: 4,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            alignSelf: "center",
            height: "100%",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f5f5f5",
              borderRadius: 6,
              height: "100%",
              width: "100%",
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={70} />
            <Box sx={{ padding: 2, height: "100%" }}>
              <Typography variant="h5"></Typography>
            </Box>

            <Box
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                gap: { xs: 1, sm: 1, md: 1, lg: 8 },
                marginTop: { lg: 0 },
              }}
            >
              <Typography variant="h6"></Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "#a1caf1",
                    fontWeight: "bold",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: 1,
                marginTop: { lg: 10 },
              }}
            ></Box>
          </Card>
        </Grid>
      ))}

      {[...Array(1)].map((_, index) => (
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          key={index}
          sx={{
            p: 4,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            alignSelf: "center",
            height: "100%",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f5f5f5",
              borderRadius: 6,
              height: "100%",
              width: "100%",
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={70} />
            <Box sx={{ padding: 2, height: "100%" }}>
              <Typography variant="h5"></Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
