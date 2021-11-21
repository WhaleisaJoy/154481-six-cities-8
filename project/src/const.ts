import { OffersType } from './types/offer';

export const MAX_RATING = 5;

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const MAP_HEIGHT_MAIN_PAGE = 752;
export const MAP_HEIGHT_PROPERTY_PAGE = 579;

export enum AppRoute {
  Root = '/',
  Main = '/main',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '/not-found',
}

export enum APIRoute {
  Offers = '/hotels',
  OffersNearby = '/nearby',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SendingCommentStatus {
  Sent = 'SENT',
  NotSent = 'NOT_SENT',
}

export const cardType = {
  CITIES: 'cities',
  NEAR_PLACES: 'near-places',
};

export const sortType = {
  POPULAR: 'Popular',
  PRICE_TO_HIGH: 'Price: low to high',
  PRICE_TO_LOW: 'Price: high to low',
  TOP_RATED_FIRST: 'Top rated first',
};

export const defaultOffer: OffersType = {
  bedrooms: 0,
  city: {
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    name: '',
  },
  description: '',
  goods: [''],
  host: {
    avatarUrl: '',
    id: 0,
    isPro: false,
    name: '',
  },
  id: 0,
  images: [''],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0,
  },
  maxAdults: 0,
  previewImage: '',
  price: 0,
  rating: 0,
  title: '',
  type: '',
};
