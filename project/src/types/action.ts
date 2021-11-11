import { changeCity, getComments, getOffers } from '../store/action';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  GetOffers = 'app/getOffers',
  GetComments = 'app/getComments',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof getOffers>
  | ReturnType<typeof getComments>;
