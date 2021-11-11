import { CommentsType, OffersType } from './types';

export type StateType = {
  city: string,
  offers: OffersType[],
  comments: CommentsType[],
};
