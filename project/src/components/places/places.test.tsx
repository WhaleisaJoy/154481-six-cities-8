import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createAPI } from '../../services/api';
import { makeFakeOffer } from '../../utils/mock';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state';
import { Action } from 'redux';
import Places from './places';
import { Cities } from '../../database';
import { sortType } from '../../const';

const fakeOffers = [makeFakeOffer()];
const CURRENT_CITY = Cities.PARIS;
const CURRENT_SORT = sortType.POPULAR;

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
const store = mockStore({
  INTERFACE: {
    city: CURRENT_CITY,
    currentSort: CURRENT_SORT,
  },
});
const history = createMemoryHistory();

describe('Component: Places', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Places offers={fakeOffers} city={CURRENT_CITY} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(`${fakeOffers.length} places to stay in ${CURRENT_CITY}`)).toBeInTheDocument();
    expect(container.querySelector('.places__sorting')).toBeInTheDocument();
    expect(container.querySelectorAll('.place-card').length).toEqual(fakeOffers.length);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
