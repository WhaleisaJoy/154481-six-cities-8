import { APIRoute, AppRoute, AuthorizationStatus, SendingCommentStatus } from '../const';
import { adaptCommentsToClient, adaptOffersToClient } from '../services/adapter';
import { dropToken, saveToken, Token } from '../services/token';
import { ThunkActionResult } from '../types/action';
import { AuthData } from '../types/auth-data';
import { CommentsDataType, CommentsServerType } from '../types/comment';
import { OfferServerType } from '../types/offer';
import {
  changeSendingCommentStatus,
  loadComments,
  loadCurrentOffer,
  loadOffersFavorite,
  loadOffers,
  loadOffersNearby,
  redirectToRoute,
  replaceOffer,
  requireAuthorization,
  requireLogout,
  saveLogin
} from './action';

export const fetchOfferAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferServerType[]>(APIRoute.Offers);
    const adaptedData = data.map(adaptOffersToClient);

    dispatch(loadOffers(adaptedData));
  };

export const fetchCurrentOfferAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<OfferServerType>(`${APIRoute.Offers}/${id}`);
      const adaptedData = adaptOffersToClient(data);
      dispatch(loadCurrentOffer(adaptedData));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  };

export const fetchOffersNearbyAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferServerType[]>(`${APIRoute.Offers}/${id}${APIRoute.OffersNearby}`);
    const adaptedData = data.map(adaptOffersToClient);

    dispatch(loadOffersNearby(adaptedData));
  };

export const fetchCommentsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<CommentsServerType[]>(`${APIRoute.Comments}/${id}`);
    const adaptedData = data.map(adaptCommentsToClient);

    dispatch(loadComments(adaptedData));
  };

export const postCommentAction = ({id, comment, rating}: CommentsDataType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.post(`${APIRoute.Comments}/${id}`, {comment, rating})
      .then(({data}) => dispatch(loadComments(data.map(adaptCommentsToClient))))
      .then(() => dispatch(changeSendingCommentStatus(SendingCommentStatus.Sent)));
  };

export const fetchOffersFavoritesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferServerType[]>(`${APIRoute.Favorite}`);
    dispatch(loadOffersFavorite(data.map(adaptOffersToClient)));
  };

export const changeFavoriteStatusAction = (id: number, status: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post(`${APIRoute.Favorite}/${id}/${status}`, {id, status})
        .then(({data}) => {
          dispatch(replaceOffer(adaptOffersToClient(data)));
        });
    } catch {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(saveLogin(email));
    dispatch(redirectToRoute(AppRoute.Main));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };

