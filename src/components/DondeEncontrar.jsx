
import React from 'react';
import { Button, Grid } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Markers from "./MapView/PlaceMarkers";
import "../Styles/StyleMap.css";
import L from "leaflet";
import icon from "../assets/place_icon.svg";
import useGeoLocation from "../hooks/useGeoLocation";
import "leaflet/dist/leaflet.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DondeEncontrar = () => {
  const location = useGeoLocation();
  const PlaceLocationIcon = L.icon({
    iconUrl: icon,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
  });
  return (
       <Grid
            margin='80px 0'
        >

            <Grid paddingBottom='50px' textAlign='center'>
                <TitleC>Donde Encontrar...</TitleC>
            </Grid>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
            >
                <Grid
                    display='flex'
                    flexDirection='column'
                    marginRight='20px'
                    justifyContent='center'
                >

                    <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                        Veterinarias
                    </Button>
                    <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                        Pets Shop
                    </Button>
                    <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                        Centros de entrenamiento
                    </Button>

                </Grid>
                <Grid

                >
        <Grid sx={6}>
          aca ba el mapa
          {location.loaded ? (
            <MapContainer center={location.coordinates} zoom={14}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={location.coordinates} icon={PlaceLocationIcon}>
                <Popup>You're here</Popup>
              </Marker>
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
