import { AuthorizationStatus, MAX_RATING, sortType } from './const';
import { CommentsType } from './types/comment';
import { OffersType } from './types/offer';

export const toPercent = (num: number): number => Math.round(num) / MAX_RATING * 100;

export const getOffersByCity = (city: string, offers: OffersType[]): OffersType[] => offers.filter((offer) => offer.city.name === city);

export const sortOffers = (offers: OffersType[], sort: string): OffersType[] => {
  switch (sort) {
    case sortType.PRICE_TO_HIGH:
      return [...offers].sort(sortByPriceToHigh);
    case sortType.PRICE_TO_LOW:
      return [...offers].sort(sortByPriceToLow);
    case sortType.TOP_RATED_FIRST:
      return [...offers].sort(sortByRatingToLow);
    default:
      return offers;
  }
};

export const sortByPriceToHigh = (a: OffersType, b: OffersType): number => a.price - b.price;
export const sortByPriceToLow = (a: OffersType, b: OffersType): number => b.price - a.price;
export const sortByRatingToLow = (a: OffersType, b: OffersType): number => b.rating - a.rating;

export const sortCommentsByDate = (a: CommentsType, b: CommentsType): number => new Date(b.date).getTime() - new Date(a.date).getTime();

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Unknown;

export const getRandomInteger = (a = 0, b = 1): number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
