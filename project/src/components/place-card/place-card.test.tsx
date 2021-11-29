import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { StateType } from '../../types/state';
import { Action } from 'redux';
import { makeFakeOffer } from '../../utils/mock';
import PlaceCard from './place-card';
import { AppRoute, cardType } from '../../const';
import { Route, Switch } from 'react-router-dom';

const CURRENT_CARD_TYPE = cardType.CITIES;

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
const store = mockStore();
const history = createMemoryHistory();

describe('Component: PlaceCard', () => {
  beforeEach(() => history.push(AppRoute.Root));
  it('should render correctly when isPremium is true', () => {
    const fakeOffer = {
      ...makeFakeOffer(),
      isPremium: true,
    };

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard offer={fakeOffer} currentCardType={CURRENT_CARD_TYPE} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(container.querySelector('.cities__place-card')).toBeInTheDocument();
    expect(container.querySelector('.cities__image-wrapper')).toBeInTheDocument();
    expect(container.querySelector('.place-card__type')?.textContent).toEqual(fakeOffer.type);
  });

  it('should render correctly when isPremium is not true', () => {
    const fakeOffer = {
      ...makeFakeOffer(),
      isPremium: false,
    };

    render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard offer={fakeOffer} currentCardType={CURRENT_CARD_TYPE} />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
  });

  it('should redirect to offer whem user clicks image', () => {
    const fakeOffer = makeFakeOffer();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Root}>
              <PlaceCard offer={fakeOffer} currentCardType={CURRENT_CARD_TYPE} />
            </Route>
            <Route exact path={`/offer/${fakeOffer.id}`}>
              <h1>This is Current Offer Page</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is Current Offer Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('place-card-image'));
    expect(screen.getByText(/This is Current Offer Page/i)).toBeInTheDocument();
  });

  it('should redirect to offer whem user clicks link', () => {
    const fakeOffer = makeFakeOffer();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Root}>
              <PlaceCard offer={fakeOffer} currentCardType={CURRENT_CARD_TYPE} />
            </Route>
            <Route exact path={`/offer/${fakeOffer.id}`}>
              <h1>This is Current Offer Page</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is Current Offer Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('place-card-link'));
    expect(screen.getByText(/This is Current Offer Page/i)).toBeInTheDocument();
  });
});
