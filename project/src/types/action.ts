import { changeCity, changeSort, getComments, getOffers } from '../store/action';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  GetOffers = 'app/getOffers',
  GetComments = 'app/getComments',
  ChangeSort = 'main/changeSort',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof getOffers>
  | ReturnType<typeof getComments>
  | ReturnType<typeof changeSort>;
