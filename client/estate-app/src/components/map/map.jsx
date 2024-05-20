import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "../pin/pin";
import "./map.scss";
import 'leaflet/dist/leaflet.css';

const position = [51.505, -0.09];

const map = ({items}) => {
  return (
    <MapContainer center={position} zoom={7} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
    </MapContainer>
  );
};

export default map;
