import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { changeCity, changeSort, getComments, loadOffers, redirectToRoute, requireAuthorization, requireLogout } from '../store/action';
import { StateType } from './state';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  LoadOffers = 'data/loadOffers',
  GetComments = 'app/getComments',
  ChangeSort = 'main/changeSort',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'app/redirectToRoute',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof getComments>
  | ReturnType<typeof changeSort>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateType, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<StateType, AxiosInstance, Actions>;
