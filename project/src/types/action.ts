import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StateType } from './state';
import {
  changeCity,
  changeSendingCommentStatus,
  changeSort,
  loadComments,
  loadCurrentOffer,
  loadOffers,
  loadOffersNearby,
  redirectToRoute,
  requireAuthorization,
  requireLogout
} from '../store/action';

export enum ActionType {
  LoadOffers = 'data/loadOffers',
  LoadCurrentOffer = 'data/loadCurrentOffer',
  LoadOffersNearby = 'data/loadOffersNearby',
  LoadComments = 'data/loadComments',
  ChangeSendingCommentStatus = 'data/changeSendingCommentStatus',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'app/redirectToRoute',
  ChangeCity = 'main/changeCity',
  ChangeSort = 'main/changeSort',
}

export type Actions =
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof loadCurrentOffer>
  | ReturnType<typeof loadOffersNearby>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof changeSendingCommentStatus>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof changeCity>
  | ReturnType<typeof changeSort>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateType, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<StateType, AxiosInstance, Actions>;
