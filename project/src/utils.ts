import { MAX_RATING } from './const';
import { OffersType } from './types/types';

export const toPercent = (num: number): number => Math.round(num) / MAX_RATING * 100;

export const getOffersByCity = (city: string, offers: OffersType[]): OffersType[] => offers.filter((offer) => offer.city.name === city);
