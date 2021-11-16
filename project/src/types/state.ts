import { AuthorizationStatus } from '../const';
import { CommentsType, OffersType } from './types';

export type StateType = {
  city: string,
  offers: OffersType[],
  comments: CommentsType[],
  currentSort: string,
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
};
