import { AppRoute, AuthorizationStatus } from '../const';
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

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);
