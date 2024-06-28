//import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useGetAllLocationQuery } from "../location/locationApiSlice";
import emptyList from "../../../assets/animations/emptyList.json";
import Header from "@/components/Header";
import CustomButton from "@/components/buttons/CustomButton";
import { EmptyPage } from "@/components/empty/EmptyPage";
import SkeletonCard from "@/components/SkeletonCard";
import LocationCard from "./components/LocationCard";

export default function Locations() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllLocationQuery();
  const locationsData = data || [];

  if (isLoading) {
    return <SkeletonCard length={8} />;
  }

  const handleOnUpdate = (id: number) => {
    navigate(`/app/admin/locations/update/${id}`);
  };

  return (
    <Box sx={{ p: 1, height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingBottom: 2,
        }}
      >
        <Header pageName="Locations" />
        <CustomButton
          title="Add Location"
          variant={"contained"}
          disableElevation
          onClick={() => navigate("/app/admin/locations/add")}
          customSx={{ height: "40px", textTransform: "capitalize" }}
          disableRipple
          size="small"
        ></CustomButton>
      </Box>
      <Grid>
        {locationsData.length === 0 ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: { md: 10, xs: 5 },
            }}
          >
            <EmptyPage messege="No locations found" animationFile={emptyList} />
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {locationsData.map((location, index) => (
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
                <LocationCard
                  name={location.name}
                  info={location.info}
                  image={location.image}
                  maxCapacity={location.maxCapacity}
                  id={location.id}
                  handleOnUpdate={() => handleOnUpdate(location.id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Box sx={{ flex: 1 }} />
    </Box>
  );
}
