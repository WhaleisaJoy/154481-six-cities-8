import { AuthorizationStatus, SendingCommentStatus } from '../const';
import { RootStateType } from '../store/root-reducer';
import { CommentsType } from './comment';
import { OffersType } from './offer';

export type DataReducerType = {
  offers: OffersType[],
  currentOffer: OffersType,
  offersNearby: OffersType[],
  offersFavorite: OffersType[],
  comments: CommentsType[],
  isDataLoaded: boolean,
  isCurrentOfferLoaded: boolean,
  sendingCommentStatus: SendingCommentStatus,
};

export type UserReducerType = {
  authorizationStatus: AuthorizationStatus,
  login: string,
};

export type InterfaceReducerType = {
  city: string,
  currentSort: string,
};

export type StateType = RootStateType;
