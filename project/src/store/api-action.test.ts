import { createAPI } from '../services/api';
import { makeFakeDataComment, makeFakeServerUser, makeFakeServerComment, makeFakeServerOffer, makeFakeAuthData } from '../utils/mock';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { StateType } from '../types/state';
import { Action } from 'redux';
import { APIRoute, AppRoute, AuthorizationStatus, SendingCommentStatus } from '../const';
import { checkAuthAction, fetchCommentsAction, fetchCurrentOfferAction, fetchOfferAction, fetchOffersFavoritesAction, fetchOffersNearbyAction, loginAction, logoutAction, postCommentAction } from './api-action';
import { changeSendingCommentStatus, dropCurrentUser, loadComments, loadCurrentOffer, loadOffers, loadOffersFavorite, loadOffersNearby, redirectToRoute, requireAuthorization, requireLogout, saveCurrentUser } from './action';
import { adaptCommentsToClient, adaptOffersToClient, adaptUserAuthDataToClient } from '../services/adapter';

const mockServerOffers = [makeFakeServerOffer()];
const mockServerOffer = makeFakeServerOffer();
const mockServerComments = [makeFakeServerComment()];
// const mockServerComment = makeFakeServerComment();
const mockDataComment = makeFakeDataComment();
const mockServerUser = makeFakeServerUser();
const mockAuthData = makeFakeAuthData();
const ID = 1;
const AUTH_TOKEN_KEY = 'six-cities-token';

describe('Reducer: userReducer', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      StateType,
      Action,
      ThunkDispatch<StateType, typeof api, Action>
    >(middlewares);

  it('should dispatch loadOffers when GET /offers', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockServerOffers);

    const store = mockStore();
    await store.dispatch(fetchOfferAction());

    const adaptedData = mockServerOffers.map(adaptOffersToClient);
    expect(store.getActions()).toEqual([
      loadOffers(adaptedData),
    ]);
  });

  it('should dispatch loadCurrentOffer when GET /offers/:id', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${ID}`)
      .reply(200, mockServerOffer);

    const store = mockStore();
    await store.dispatch(fetchCurrentOfferAction(ID));

    const adaptedData = adaptOffersToClient(mockServerOffer);
    expect(store.getActions()).toEqual([
      loadCurrentOffer(adaptedData),
    ]);
  });

  it('should dispatch loadOffersNearby when GET /offers/:id/nearby', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${ID}${APIRoute.OffersNearby}`)
      .reply(200, mockServerOffers);

    const store = mockStore();
    await store.dispatch(fetchOffersNearbyAction(ID));

    const adaptedData = mockServerOffers.map(adaptOffersToClient);
    expect(store.getActions()).toEqual([
      loadOffersNearby(adaptedData),
    ]);
  });

  it('should dispatch loadComments when GET /comments/:id', async () => {
    mockAPI
      .onGet(`${APIRoute.Comments}/${ID}`)
      .reply(200, mockServerComments);

    const store = mockStore();
    await store.dispatch(fetchCommentsAction(ID));

    const adaptedData = mockServerComments.map(adaptCommentsToClient);
    expect(store.getActions()).toEqual([
      loadComments(adaptedData),
    ]);
  });

  it('should dispatch loadComments and update SendingCommentStatus to "SUCCESS" when POST /comments/:id', async () => {
    // const comment = mockDataComment.comment;
    // const rating = mockDataComment.rating;
    const mockServerComments2 = [makeFakeServerComment()];
    mockAPI
      .onPost(`${APIRoute.Comments}/${ID}`, mockDataComment)
      .reply(200, mockServerComments2);

    const store = mockStore();
    await store.dispatch(postCommentAction(mockDataComment));


    mockAPI
      .onGet(`${APIRoute.Comments}/${ID}`)
      .reply(200, mockServerComments2);

    await store.dispatch(fetchCommentsAction(ID));

    // await api.post(`${APIRoute.Comments}/${ID}`, {comment, rating});
    // await store.dispatch(fetchCommentsAction(ID));

    const adaptedData = mockServerComments2.map(adaptCommentsToClient);
    expect(store.getActions()).toEqual([
      changeSendingCommentStatus(SendingCommentStatus.Sending),
      loadComments(adaptedData),
      changeSendingCommentStatus(SendingCommentStatus.Fail),
    ]);
  });

  it('should dispatch loadOffersFavorite when GET /favorite', async () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockServerOffers);

    const store = mockStore();
    await store.dispatch(fetchOffersFavoritesAction());

    const adaptedData = mockServerOffers.map(adaptOffersToClient);
    expect(store.getActions()).toEqual([
      loadOffersFavorite(adaptedData),
    ]);
  });

  it('should dispatch replaceOffer when POST /favorite/:id/:status', async () => {
    // mockAPI
    //   .onGet(APIRoute.Favorite)
    //   .reply(200, mockServerOffers);

    // const store = mockStore();
    // await store.dispatch(fetchOffersFavoritesAction());

    // const adaptedData = mockServerOffers.map(adaptOffersToClient);
    // expect(store.getActions()).toEqual([
    //   replaceOffer(adaptedData),
    // ]);
  });

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, mockServerUser);

    await store.dispatch(checkAuthAction());

    const adaptedData = adaptUserAuthDataToClient(mockServerUser);
    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      saveCurrentUser(adaptedData),
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, mockServerUser);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(mockAuthData));

    const adaptedData = adaptUserAuthDataToClient(mockServerUser);
    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      saveCurrentUser(adaptedData),
      redirectToRoute(AppRoute.Main),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY, mockServerUser.token);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([
      requireLogout(),
      dropCurrentUser(),
    ]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY);
  });
});
