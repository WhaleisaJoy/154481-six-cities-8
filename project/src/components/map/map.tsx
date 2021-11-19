import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { OffersType } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, MAP_HEIGHT_MAIN_PAGE } from '../../const';

type MapProps = {
  activePlaceCard: number | null;
  offers: OffersType[];
  height?: number;
}

function Map({activePlaceCard, offers, height = MAP_HEIGHT_MAIN_PAGE}: MapProps): JSX.Element {
  const cityLocation = offers[0].city.location;

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);

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
      map.flyTo(
        L.latLng(cityLocation.latitude, cityLocation.longitude),
        cityLocation.zoom,
      );

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
      style={{height: `${height}px`}}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
