import { ActionType, ChooseCityAction, GetOffersAction } from '../types/action';
import { OffersType } from '../types/types';

export const chooseCity = (city: string): ChooseCityAction => ({
  type: ActionType.ChooseCity,
  payload: city,
});

export const getOffers = (offers: OffersType[]): GetOffersAction => ({
  type: ActionType.GetOffers,
  payload: offers,
});
