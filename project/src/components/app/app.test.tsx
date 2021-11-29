import {render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, defaultOffer } from '../../const';
import App from './app';
import { makeFakeComment, makeFakeOffer, makeFakeUser } from '../../utils/mock';
import { Cities } from '../../database';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { StateType } from '../../types/state';
import { Action } from 'redux';

const DEFAULT_CITY = Cities.PARIS;
const fakeOffer = makeFakeOffer();
const fakeOffers = [{...fakeOffer, city: {...fakeOffer.city, name: DEFAULT_CITY}}];
const fakeComments = [makeFakeComment()];
const fakeUser = makeFakeUser();

const initialStoreState = {
  DATA: {
    offers: fakeOffers,
    currentOffer: defaultOffer,
    offersFavorite: fakeOffers,
    comments: fakeComments,
    offersNearby: [fakeOffer],
    isDataLoaded: true,
    isCurrentOfferLoaded: true,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    currentUser: fakeUser,
  },
  INTERFACE: {
    city: DEFAULT_CITY,
  },
};

const history = createMemoryHistory();

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStoreWithMiddlewares = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
const storeWithMiddlewares = mockStoreWithMiddlewares(initialStoreState);
const fakeAppWithMiddlewares = (
  <Provider store={storeWithMiddlewares}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

const mockStore = configureMockStore();
const store = mockStore(initialStoreState);
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeAppWithMiddlewares);

    expect(screen.getByText(new RegExp(`${fakeOffers.length} places to stay in ${DEFAULT_CITY}`, 'i'))).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeApp);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/favorites and has AuthStatus "NO_AUTH"', () => {
    history.push(AppRoute.Favorites);
    render(fakeAppWithMiddlewares);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites and has AuthStatus "AUTH" but offersFavorite is empty', () => {
    history.push(AppRoute.Favorites);

    const storeWithMiddlewaresWithAuth = mockStoreWithMiddlewares({
      ...initialStoreState,
      DATA: {
        ...initialStoreState.DATA,
        offersFavorite: [],
      },
      USER: {
        ...initialStoreState.USER,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    const fakeAppWithMiddlewaresWithAuth = (
      <Provider store={storeWithMiddlewaresWithAuth}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    render(fakeAppWithMiddlewaresWithAuth);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites and has AuthStatus "AUTH"', () => {
    history.push(AppRoute.Favorites);

    const storeWithMiddlewaresWithAuth = mockStoreWithMiddlewares({
      ...initialStoreState,
      USER: {
        ...initialStoreState.USER,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    const fakeAppWithMiddlewaresWithAuth = (
      <Provider store={storeWithMiddlewaresWithAuth}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    render(fakeAppWithMiddlewaresWithAuth);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "PropertyPage" when user navigate to "/offer/:id"', () => {
    history.push(AppRoute.Room);

    render(fakeAppWithMiddlewares);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную страницу')).toBeInTheDocument();
  });
});
