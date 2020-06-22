import React from 'react';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import './map.css';


interface props {
  lat: number;
  lng: number;
  name: string;
}

const MapContainer = ({ lat, lng, name }: props) => (
  <LeafletMap
    center={[lat, lng]}
    zoom={14}
    attributionControl
    zoomControl
    doubleClickZoom
    dragging
    animate
    easeLinearity={0.35}
  >
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[lat, lng]}>
      <Popup>{name}</Popup>
    </Marker>
  </LeafletMap>
);
export default MapContainer;
