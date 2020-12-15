import React, {
 useState, useMemo, useEffect, useContext,
} from 'react';
import {
 Circle, Map as LeafletMap, Marker, Popup, TileLayer, LayersControl, LayerGroup,
} from 'react-leaflet';
import './map.css';
import L, { DivIcon } from 'leaflet';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CircularProgress, Backdrop } from '@material-ui/core';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { StructureWC2023, User } from '../../requests/types';
import logoCampus from '../../assets/images/diagorient-campus.png';
import 'react-leaflet-markercluster/dist/styles.min.css';
import UserContext from '../../contexts/UserContext';

const Livemap2023 = () => {
  const { user } = useContext(UserContext);
  const clubIcon = new DivIcon({ className: 'campus2023-icon club-icon' });
  const candidateIcon = new DivIcon({ className: 'campus2023-icon candidate-icon' });
  const eligibleIcon = new DivIcon({ className: 'campus2023-icon eligible-icon' });
  const invalidDataIcon = new DivIcon({ className: 'campus2023-icon invalid-data-icon' });
  const [perimeterView, setPerimeterView] = useState<{ user: string; lat: number; lng: number; radius: number } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const { data: candidateData, loading: loadingCandidates } = useQuery(
    gql`
      {
        allCandidates {
          id
          email
          validateCampus
          profile {
            firstName
            lastName
          }
          coordinates {
            lattitude
            longitude
          }
          wc2023 {
            formation
            degree
            perimeter
            birthdate
          }
        }
      }
    `,
    { pollInterval: 15000 },
  );

  const { data: clubData, loading: loadingClubs } = useQuery(
    gql`
      {
        allStructures {
          club_code
          name
          licensed_text
          city
          geolocation {
            lat
            lng
          }
        }
      }
    `,
  );

  const [fetchEligible, { data: eligibleData, loading: loadingEligible }] = useLazyQuery(
    gql`
      query($userId: ID!) {
        eligibleStructures(userId: $userId) {
          club_code
        }
      }
    `,
  );

  const eligibleClubCodes = useMemo(
    () => (perimeterView && eligibleData ? eligibleData.eligibleStructures.map((v: any) => v.club_code) : []),
    [eligibleData, perimeterView],
  );

  const handleMarkerMoouseHover = (e: any) => {
    e.target.openPopup();
  };

  const handleMarkerMouseOut = (e: any) => {
    e.target.closePopup();
  };

  const handleClickOnCandidateMarker = (c: User) => {
    setPerimeterView({
      user: c.id,
      lat: c.coordinates?.lattitude || 0,
      lng: c.coordinates?.longitude || 0,
      radius: (c.wc2023?.perimeter || 0) * 1000,
    });
    fetchEligible({ variables: { userId: c.id } });
  };

  const isValidUserData = (c: User) =>
    c.wc2023
    && c.wc2023.perimeter
    && c.wc2023.formation
    && c.wc2023.degree
    && c.wc2023.birthdate
    && c.coordinates
    && c.coordinates.longitude
    && c.coordinates.lattitude;

  const handleClickOnMap = () => {
    setPerimeterView(null);
  };

  useEffect(() => {
    setLoading(loadingCandidates || loadingEligible || loadingClubs);
  }, [loadingCandidates, loadingEligible, loadingClubs]);

  const iconCreateFunction = (cluster: any) =>
    L.divIcon({
      html: `<div><span>${cluster.getChildCount()}</span></div>`,
      className: 'marker-cluster-custom',
      iconSize: L.point(40, 40, true),
    });

  if (user?.role === 'admin' || (user?.role === 'advisor' && user?.email === 'drcampus2023@diagoriente.fr')) {
    console.log('utilisateur autorisé');
    
  } else {
    return <Redirect to="/login?from=%2Fcampus2023-livemap%2F" />;
  }

  return (
    <>
      <div className="logo-overlay">
        <a href={process.env.REACT_APP_PUBLIC_URL}>
          <img src={logoCampus} alt="Logo Diagoriente" width={432} height={38} />
        </a>
      </div>
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <LeafletMap
        center={[46.71109, 1.7191036]}
        zoom={6}
        zoomControl={false}
        attributionControl={false}
        doubleClickZoom
        dragging
        animate
        easeLinearity={0.35}
        onClick={handleClickOnMap}
      >
        <LayersControl position="topright">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
            // url="https://tile.jawg.io/dark//{z}/{x}/{y}.png?api-key=community"
          />
          <LayersControl.Overlay checked name="Candidats">
            <LayerGroup>
              {perimeterView && (
                <Circle center={[perimeterView.lat, perimeterView.lng]} radius={perimeterView.radius} />
              )}
              <MarkerClusterGroup showCoverageOnHover={false} iconCreateFunction={iconCreateFunction}>
                {candidateData
                  && candidateData.allCandidates.map((c: User) => (
                    <div key={c.id}>
                      {(!perimeterView || perimeterView?.user === c.id) && (
                        <Marker
                          position={[c.coordinates?.lattitude || 0, c.coordinates?.longitude || 0]}
                          icon={isValidUserData(c) ? candidateIcon : invalidDataIcon}
                          onMouseOver={handleMarkerMoouseHover}
                          onMouseOut={handleMarkerMouseOut}
                          onClick={() => handleClickOnCandidateMarker(c)}
                        >
                          <Popup>
                            <h3>{`${c.profile.firstName} ${c.profile.lastName.toUpperCase()}`}</h3>
                            <dl>
                              <dt>
                                <strong>Adresse email :</strong>
                              </dt>
                              <dd>{c.email}</dd>
                              <dt>
                                <strong>Date de naissance :</strong>
                              </dt>
                              <dd>{c.wc2023?.birthdate ? moment(c.wc2023?.birthdate).format('DD/MM/YYYY') : 'N/A'}</dd>
                              <dt>
                                <strong>Niveau de diplôme :</strong>
                              </dt>
                              <dd>{c.wc2023?.degree || 'N/A'}</dd>
                              <dt>
                                <strong>Formation visée :</strong>
                              </dt>
                              <dd>{c.wc2023?.formation || 'N/A'}</dd>
                              <dt>
                                <strong>Périmètre de recherche :</strong>
                              </dt>
                              <dd>{c.wc2023?.perimeter ? `${c.wc2023?.perimeter} km` : 'N/A'}</dd>
                              <dt>
                                <strong>Parcours validé :</strong>
                              </dt>
                              <dd>{c.validateCampus ? 'Oui' : 'Non'}</dd>
                            </dl>
                          </Popup>
                        </Marker>
                      )}
                    </div>
                  ))}
              </MarkerClusterGroup>
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Structures">
            <LayerGroup>
              {clubData
                && clubData.allStructures.map((c: StructureWC2023) => (
                  <Marker
                    key={c.club_code}
                    position={[c.geolocation.lat || 0, c.geolocation.lng || 0]}
                    icon={eligibleClubCodes.find((v: any) => v === c.club_code) ? eligibleIcon : clubIcon}
                    onMouseOver={handleMarkerMoouseHover}
                    onMouseOut={handleMarkerMouseOut}
                  >
                    <Popup>
                      <strong>{c.name}</strong>
                      <div>
                        <em>{c.licensed_text}</em>
                      </div>
                      <div>{c.city}</div>
                    </Popup>
                  </Marker>
                ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </LeafletMap>
    </>
  );
};

export default Livemap2023;
