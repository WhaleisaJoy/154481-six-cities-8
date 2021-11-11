import { OffersType } from './types';

export enum ActionType {
  ChooseCity = 'main/chooseCity',
  GetOffers = 'app/getOffers',
}

export type ChooseCityAction = {
  type: ActionType.ChooseCity,
  payload: string,
}

export type GetOffersAction = {
  type: ActionType.GetOffers,
  payload: OffersType[],
}

export type Actions =
  | ChooseCityAction
  | GetOffersAction;
