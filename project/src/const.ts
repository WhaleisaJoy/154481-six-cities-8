export enum AppRoute {
  Root = '/',
  Main = '/main',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MAX_RATING = 5;

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const MAP_HEIGHT_MAIN_PAGE = 752;

export const MAP_HEIGHT_PROPERTY_PAGE = 579;

export const cardType = {
  CITIES: 'cities',
  NEAR_PLACES: 'near-places',
};
