import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createAPI } from '../../services/api';
import { makeFakeOffer } from '../../utils/mock';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state';
import { Action } from 'redux';
import PlacesList from './places-list';
import { cardType } from '../../const';

const fakeOffers = [makeFakeOffer()];
const CARD_TYPE = cardType.NEAR_PLACES;

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

describe('Component: PlacesList', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <PlacesList offers={fakeOffers} currentCardType={CARD_TYPE} onActivePlaceCardMouseEnter={jest.fn()} onActivePlaceCardMouseLeave={jest.fn()} />
        </Router>
      </Provider>,
    );

    expect(container.querySelectorAll('.place-card').length).toEqual(fakeOffers.length);
  });
});
