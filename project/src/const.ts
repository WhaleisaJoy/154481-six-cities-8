import { OffersType } from './types/offer';

export const MAX_RATING = 5;

export const MAX_REVIEWS_LENGTH = 10;

export const mapHeight = {
  MAIN_PAGE: 752,
  PROPERTY_PAGE: 579,
};

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
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SendingCommentStatus {
  Initial = 'INITIAL',
  Sending = 'SENDING',
  Success = 'SUCCESS',
  Fail = 'FAIL',
}

export const cardType = {
  CITIES: 'cities',
  NEAR_PLACES: 'near-places',
  FAVORITES: 'favorites',
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

type bookmarkType = {
  [bookmarkInfo: string]: {
    width: string;
    height: string;
  }
}

export const defaultUser = {
  avatarUrl: '',
  email: '',
  id: 0,
  isPro: false,
  name: '',
  token: '',
};

export const bookmarkInfo: bookmarkType = {
  'place-card': {
    width: '18',
    height: '19',
  },
  'property': {
    width: '31',
    height: '33',
  },
};

