import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { createAPI } from '../../../services/api';
import { StateType } from '../../../types/state';
import { makeFakeOffer, makeFakeUser } from '../../../utils/mock';
import { AuthorizationStatus } from '../../../const';
import Main from './main-page';
import { Cities } from '../../../database';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();

describe('Component: Main', () => {
  it('should render correctly when offers is not empty', () => {
    const offer = makeFakeOffer();
    const offers = [offer];
    const currentCity = offer.city.name;

    const store = mockStore({
      DATA: {
        offers: offers,
        isDataLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        currentUser: makeFakeUser(),
      },
      INTERFACE: {
        city: currentCity,
      },
    });
    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.header__logo-link')).toBeInTheDocument();
    expect(container.querySelector('.tabs')).toBeInTheDocument();
    expect(screen.getByText(`${offers.length} places to stay in ${currentCity}`)).toBeInTheDocument();
    expect(container.querySelectorAll('.place-card').length).toEqual(offers.length);
  });

  it('should render correctly when offers is empty', () => {
    const store = mockStore({
      DATA: {
        offers: [],
        isDataLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        currentUser: makeFakeUser(),
      },
      INTERFACE: {
        city: Cities.PARIS,
      },
    });
    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.header__logo-link')).toBeInTheDocument();
    expect(container.querySelector('.tabs')).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
