import { APIRoute, AppRoute, AuthorizationStatus, SendingCommentStatus } from '../const';
import { adaptCommentsToClient, adaptOffersToClient, adaptUserAuthDataToClient } from '../services/adapter';
import { dropToken, saveToken } from '../services/token';
import { ThunkActionResult } from '../types/action';
import { AuthData, UserAuthDataServer } from '../types/auth-data';
import { CommentsDataType, CommentsServerType } from '../types/comment';
import { OfferServerType } from '../types/offer';
import { toast } from 'react-toastify';
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
  saveCurrentUser,
  dropCurrentUser
} from './action';

const ERROR_MESSAGE = 'An error has occurred. Try again later.';

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
    dispatch(changeSendingCommentStatus(SendingCommentStatus.Sending));
    try {
      await api.post(`${APIRoute.Comments}/${id}`, {comment, rating})
        .then(({data}) => dispatch(loadComments(data.map(adaptCommentsToClient))))
        .then(() => dispatch(changeSendingCommentStatus(SendingCommentStatus.Success)));
    } catch {
      dispatch(changeSendingCommentStatus(SendingCommentStatus.Fail));
      toast.error(ERROR_MESSAGE);
    }
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
      const {data} = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(saveCurrentUser(adaptUserAuthDataToClient(data)));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<UserAuthDataServer>(APIRoute.Login, {email, password});
      const {token} = data;
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(saveCurrentUser(adaptUserAuthDataToClient(data)));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      toast.error(ERROR_MESSAGE);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
    dispatch(dropCurrentUser());
  };

