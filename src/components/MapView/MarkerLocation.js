import L from "leaflet";

export const PlaceLocationIcon = L.icon({
  iconUrl: require("../../assets/place_icon.svg"),
  iconRetinaUrl: require("../../assets/place_icon.svg"),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});
