import { AppRoute, AuthorizationStatus, SendingCommentStatus } from '../const';
import { ActionType } from '../types/action';
import { CommentsType } from '../types/comment';
import { OffersType } from '../types/offer';

export const loadOffers = (offers: OffersType[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const loadCurrentOffer = (currentOffer: OffersType) => ({
  type: ActionType.LoadCurrentOffer,
  payload: currentOffer,
} as const);

export const loadOffersNearby = (offers: OffersType[]) => ({
  type: ActionType.LoadOffersNearby,
  payload: offers,
} as const);

export const loadComments = (comments: CommentsType[]) => ({
  type: ActionType.LoadComments,
  payload: comments,
} as const);

export const changeSendingCommentStatus = (sendingCommentStatus: SendingCommentStatus) => ({
  type: ActionType.ChangeSendingCommentStatus,
  payload: sendingCommentStatus,
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

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

export const changeSort = (sort: string) => ({
  type: ActionType.ChangeSort,
  payload: sort,
} as const);
