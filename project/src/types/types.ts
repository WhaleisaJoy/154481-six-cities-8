import { OffersType } from './offer';

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
