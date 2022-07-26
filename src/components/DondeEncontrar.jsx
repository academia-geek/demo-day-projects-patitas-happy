import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../Styles/StyleMap.css";
import L from "leaflet";
import icon from "../assets/place_icon.svg";
import useGeoLocation from "../hooks/useGeoLocation";
import "leaflet/dist/leaflet.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { TitleC } from "../Styles/StyleInfo";
import data from "../assets/data.json";

const DondeEncontrar = () => {
  const [view, setView] = useState(false);
  function dataset(array) {
    return array.map((position, id) => (
      <Marker key={position?.id} position={position?.geometry} icon={greenIcon}>
        <Popup>{position?.name}</Popup>
      </Marker>
    ));
  }
  const [database, setDatabase] = useState([]);
  const location = useGeoLocation();
  const PlaceLocationIcon = L.icon({
    iconUrl: icon,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
  });
  const greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    iconSize: [25, 35],
  });
  const { veterinaries, petshops, animaltraining } = data;
  return (
    <Grid margin="80px 0"
    justifyContent='center'
    alignItems='center'
    >
      <Grid paddingBottom="50px" textAlign="center">
        <TitleC>Donde Encontrar...</TitleC>
      </Grid>
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
      justifyContent='center'
      >
        <Grid
          display="flex"
          flexDirection="column"
          marginRight="20px"
          justifyContent="center"
        >
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIosIcon />}
            onClick={() => {
              setDatabase(dataset(veterinaries));
              setView(true);
            }}
          >
            Veterinarias
          </Button>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIosIcon />}
            onClick={() => {
              setDatabase(dataset(petshops));
              setView(true);
            }}
          >
            Pets Shop
          </Button>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIosIcon />}
            onClick={() => {
              setDatabase(dataset(animaltraining));
              setView(true);
            }}
          >
            Centros de entrenamiento
          </Button>
        </Grid>
        <Grid>
          <Grid sx={6}
          style={{background:'red', width:'100%'}}
          >
            {location.loaded ? (
              <MapContainer center={location.coordinates} zoom={12}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={location.coordinates}
                  icon={PlaceLocationIcon}
                >
                  <Popup>You're here</Popup>
                </Marker>
                {view ? database : ""}
              </MapContainer>
            ) : (
              "Location data not available yet."
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DondeEncontrar;
