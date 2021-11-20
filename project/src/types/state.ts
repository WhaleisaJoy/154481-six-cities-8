import { AuthorizationStatus, SendingCommentStatus } from '../const';
import { CommentsType } from './comment';
import { OffersType } from './offer';

export type StateType = {
  offers: OffersType[],
  currentOffer: OffersType,
  offersNearby: OffersType[],
  comments: CommentsType[],
  isDataLoaded: boolean,
  isCurrentOfferLoaded: boolean,
  sendingCommentStatus: SendingCommentStatus,
  authorizationStatus: AuthorizationStatus,
  city: string,
  currentSort: string,
};
