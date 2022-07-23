import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import icon from "../../assets/place_icon.svg";

const MapView = () => {
  const PlaceLocationIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
  });
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return position === null ? null : (
    <Marker position={position} icon={PlaceLocationIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default MapView;
