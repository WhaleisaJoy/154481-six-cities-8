import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import Favorites from './favorites-page';
import { createAPI } from '../../../services/api';
import { StateType } from '../../../types/state';
import { makeFakeOffer, makeFakeUser } from '../../../utils/mock';
import { AuthorizationStatus } from '../../../const';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();

describe('Component: Favorites', () => {
  it('should render correctly when offersFavorite is not empty', () => {
    const offersFavorite = [makeFakeOffer()];
    const store = mockStore({
      DATA: {
        offersFavorite,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        currentUser: makeFakeUser(),
      },
    });
    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.header__logo-link')).toBeInTheDocument();
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(container.querySelectorAll('.header__logo-link').length).toEqual(offersFavorite.length);
  });

  it('should render correctly when offersFavorite is empty', () => {
    const store = mockStore({
      DATA: {
        offersFavorite: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        currentUser: makeFakeUser(),
      },
    });
    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.header__logo-link')).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
