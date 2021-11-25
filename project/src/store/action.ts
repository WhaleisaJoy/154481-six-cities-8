import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, SendingCommentStatus } from '../const';
import { ActionType } from '../types/action';
import { UserAuthData } from '../types/auth-data';
import { CommentsType } from '../types/comment';
import { OffersType } from '../types/offer';

export const loadOffers = createAction(
  ActionType.LoadOffers,
  (offers: OffersType[]) => ({
    payload: offers,
  }),
);

export const loadCurrentOffer = createAction(
  ActionType.LoadCurrentOffer,
  (currentOffer: OffersType) => ({
    payload: currentOffer,
  }),
);

export const dropCurrentOffer = createAction(ActionType.DropCurrentOffer);

export const loadOffersNearby = createAction(
  ActionType.LoadOffersNearby,
  (offers: OffersType[]) => ({
    payload: offers,
  }),
);

export const dropOffersNearby = createAction(ActionType.DropOffersNearby);

export const loadComments = createAction(
  ActionType.LoadComments,
  (comments: CommentsType[]) => ({
    payload: comments,
  }),
);

export const loadOffersFavorite = createAction(
  ActionType.LoadOffersFavorite,
  (offers: OffersType[]) => ({
    payload: offers,
  }),
);

export const replaceOffer = createAction(
  ActionType.ReplaceOffer,
  (offer: OffersType) => ({
    payload: offer,
  }),
);

export const changeSendingCommentStatus = createAction(
  ActionType.ChangeSendingCommentStatus,
  (sendingCommentStatus: SendingCommentStatus) => ({
    payload: sendingCommentStatus,
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const saveCurrentUser = createAction(
  ActionType.SaveCurrentUser,
  (user: UserAuthData) => ({
    payload: user,
  }),
);

export const dropCurrentUser = createAction(ActionType.DropCurrentUser);

export const requireLogout = createAction(ActionType.RequireLogout);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export const changeCity = createAction(
  ActionType.ChangeCity,
  (city: string) => ({
    payload: city,
  }),
);

export const changeSort = createAction(
  ActionType.ChangeSort,
  (sort: string) => ({
    payload: sort,
  }),
);
