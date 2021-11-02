import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { OffersType } from '../../types/types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

type MapProps = {
  activePlaceCard: string;
  offers: OffersType[];
}

function Map({activePlaceCard, offers}: MapProps): JSX.Element {
  const firstOffer = offers[0];

  const mapRef = useRef(null);
  const map = useMap(mapRef, firstOffer);

  const defaultMarker = L.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  const currentMarker = L.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  useEffect(() => {
    if(map) {
      offers.forEach((offer) => {
        const { location } = offer;
        const markerIcon = offer.id === activePlaceCard ? currentMarker : defaultMarker;

        L
          .marker(
            [
              location.latitude,
              location.longitude,
            ],
            {
              icon: markerIcon,
            },
          )
          .addTo(map);
      });
    }
  }, [map, offers, activePlaceCard]);

  return (
    <section
      className="cities__map map"
      style={{height: '752px'}}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
