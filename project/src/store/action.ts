import { ActionType } from '../types/action';
import { CommentsType, OffersType } from '../types/types';

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

export const loadOffers = (offers: OffersType[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const getComments = (comments: CommentsType[]) => ({
  type: ActionType.GetComments,
  payload: comments,
} as const);

export const changeSort = (sort: string) => ({
  type: ActionType.ChangeSort,
  payload: sort,
} as const);
