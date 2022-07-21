import React from "react";
import { Marker } from "react-leaflet";
import { PlaceLocationIcon } from "./MarkerLocation";
import MarkerPopup from "./MarkerPopup";

const PlaceMarkers = props => {
  const { places } = props;
  const markers = places.map((place, i) => (
    <Marker key={i} position={place.geometry} icon={PlaceLocationIcon}>
      <MarkerPopup data={places} />
    </Marker>
  ));
  return markers;
};

export default PlaceMarkers;
