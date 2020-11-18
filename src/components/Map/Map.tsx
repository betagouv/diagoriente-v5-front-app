import React from 'react';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Formation } from 'requests/types';
import 'leaflet-make-cluster-group/LeafletMakeCluster.css';
import './map.css';

interface props {
  lat?: number;
  lng?: number;
  name?: string;
  type?: string;
  className?: string;
  dataList?: any;
  handleClick?: (e: Leaflet.LeafletMouseEvent) => void;
}

const MapContainer = ({ lat, lng, name, type, className, handleClick, dataList }: props) => {
  console.log('type', type, dataList);
  return (
    <LeafletMap
      center={lat && lng ? [lat, lng] : [48.864716, 2.349014]}
      zoom={type !== 'formation' ? 15 : 6}
      attributionControl
      zoomControl
      doubleClickZoom
      dragging
      animate
      easeLinearity={0.35}
      className={className}
      onclick={handleClick}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {type !== 'formation' ? (
        <Marker position={lat && lng ? [lat, lng] : [48.864716, 2.349014]}>
          <Popup>{name}</Popup>
        </Marker>
      ) : (
        <>
          {dataList && dataList.length && (
            <MarkerClusterGroup>
              {dataList?.map((el: Formation) => {
                const { longitude } = el.place;
                const { latitude } = el.place;
                return (
                  <Marker key={el.title} position={[latitude, longitude]}>
                    <Popup>
                      <b>Institution: </b> {el.title}
                      <br />
                      <b>Adresse: </b> {el.place.fullAddress}
                    </Popup>
                  </Marker>
                );
              })}
          
            </MarkerClusterGroup>
          )}
        </>
      )}
    </LeafletMap>
  );
};
export default MapContainer;
