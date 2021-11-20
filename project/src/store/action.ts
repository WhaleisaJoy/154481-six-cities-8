import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, SendingCommentStatus } from '../const';
import { ActionType } from '../types/action';
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

export const loadOffersNearby = createAction(
  ActionType.LoadOffersNearby,
  (offers: OffersType[]) => ({
    payload: offers,
  }),
);

export const loadComments = createAction(
  ActionType.LoadComments,
  (comments: CommentsType[]) => ({
    payload: comments,
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


// export const loadOffers = (offers: OffersType[]) => ({
//   type: ActionType.LoadOffers,
//   payload: offers,
// } as const);

// export const loadCurrentOffer = (currentOffer: OffersType) => ({
//   type: ActionType.LoadCurrentOffer,
//   payload: currentOffer,
// } as const);

// export const loadOffersNearby = (offers: OffersType[]) => ({
//   type: ActionType.LoadOffersNearby,
//   payload: offers,
// } as const);

// export const loadComments = (comments: CommentsType[]) => ({
//   type: ActionType.LoadComments,
//   payload: comments,
// } as const);

// export const changeSendingCommentStatus = (sendingCommentStatus: SendingCommentStatus) => ({
//   type: ActionType.ChangeSendingCommentStatus,
//   payload: sendingCommentStatus,
// } as const);

// export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
//   type: ActionType.RequireAuthorization,
//   payload: authStatus,
// } as const);

// export const requireLogout = () => ({
//   type: ActionType.RequireLogout,
// } as const);

// export const redirectToRoute = (url: AppRoute) => ({
//   type: ActionType.RedirectToRoute,
//   payload: url,
// } as const);

// export const changeCity = (city: string) => ({
//   type: ActionType.ChangeCity,
//   payload: city,
// } as const);

// export const changeSort = (sort: string) => ({
//   type: ActionType.ChangeSort,
//   payload: sort,
// } as const);
