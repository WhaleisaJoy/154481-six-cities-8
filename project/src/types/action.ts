import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StateType } from './state';
import { Action } from 'redux';

export enum ActionType {
  LoadOffers = 'data/loadOffers',
  LoadCurrentOffer = 'data/loadCurrentOffer',
  LoadOffersNearby = 'data/loadOffersNearby',
  LoadComments = 'data/loadComments',
  LoadOffersFavorite = 'data/loadOffersFavorite',
  ReplaceOffer = 'data/replaceOffer',
  ChangeSendingCommentStatus = 'data/changeSendingCommentStatus',
  RequireAuthorization = 'user/requireAuthorization',
  SaveLogin = 'user/saveLogin',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'app/redirectToRoute',
  ChangeCity = 'app/changeCity',
  ChangeSort = 'app/changeSort',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateType, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<StateType, AxiosInstance, Action>;
