import React from 'react';
import * as Leaflet from 'leaflet';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import './map.css';

interface props {
  lat?: number;
  lng?: number;
  name?: string;
  className?: string;
  handleClick?: (e: Leaflet.LeafletMouseEvent) => void;
}

const MapContainer = ({ lat, lng, name, className, handleClick }: props) => (
  <LeafletMap
    center={lat && lng ? [lat, lng] : [51.505, -0.09]}
    zoom={14}
    attributionControl
    zoomControl
    doubleClickZoom
    onClick={handleClick}
    dragging
    animate
    easeLinearity={0.35}
    className={className}
  >
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={lat && lng ? [lat, lng] : [51.505, -0.09]}>
      <Popup>{name || ''}</Popup>
    </Marker>
  </LeafletMap>
);
export default MapContainer;
