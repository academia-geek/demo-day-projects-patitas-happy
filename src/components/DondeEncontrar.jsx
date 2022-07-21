import { Grid } from "@mui/material";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Markers from "./MapView/PlaceMarkers";
import "../Styles/StyleMap.css";
import L from "leaflet";
import icon from "../assets/place_icon.svg";
import useGeoLocation from "../hooks/useGeoLocation";
import "leaflet/dist/leaflet.css";

const DondeEncontrar = () => {
  const location = useGeoLocation();
  const PlaceLocationIcon = L.icon({
    iconUrl: icon,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
  });
  return (
    <Grid>
      <h1>Donde Encontrar...</h1>
      <Grid container columns={{ sx: 4, sm: 8, md: 12 }}>
        <Grid sx={6} display="flex" flexDirection="column">
          <button>Veterinarias</button>
          <button>Pets Shop</button>
          <button>Centros de entrenamiento</button>
        </Grid>
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
  );
};

export default DondeEncontrar;
