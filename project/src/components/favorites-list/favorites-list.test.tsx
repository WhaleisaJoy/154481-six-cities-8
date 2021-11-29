import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createAPI } from '../../services/api';
import { makeFakeOffer } from '../../utils/mock';
import FavoritesList from './favorites-list';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state';
import { Action } from 'redux';

const fakeOffers = [makeFakeOffer()];

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

describe('Component: FavoritesList', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesList offers={fakeOffers} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(container.querySelectorAll('.favorites__locations-items').length).toEqual(fakeOffers.length);
  });
});
