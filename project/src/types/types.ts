export type LocationType = {
  latitude: number,
  longitude: number,
  zoom: number,
};

export type OffersType = {
  bedrooms: number,
  city: {
    location: LocationType,
    name: string,
  },
  description: string,
  goods: string[],
  host: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string,
  },
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: LocationType,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type OfferServerType = {
  bedrooms: number,
  city: {
    location: LocationType,
    name: string,
  },
  description: string,
  goods: string[],
  host: {
    'avatar_url': string,
    id: number,
    'is_pro': boolean,
    name: string,
  },
  id: number,
  images: string[],
  'is_favorite': boolean,
  'is_premium': boolean,
  location: LocationType,
  'max_adults': number,
  'preview_image': string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type CommentsType = {
  comment: string,
  date: Date,
  id: number,
  rating: number,
  user: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string,
    },
};

export type FavoritesLocationOffersType = [string, OffersType[]];

export type RatingSettingsType = {
  value: string,
  title: string,
};

export type CitiesType = {
  PARIS: string,
  COLOGNE: string,
  BRUSSELS: string,
  AMSTERDAM: string,
  HAMBURG: string,
  DUSSELDORF: string,
};
