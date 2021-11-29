import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state';
import { Action } from 'redux';
import { Cities } from '../../database';
import CitiesList from './cities-list';

const DEFAULT_CITY = Cities.PARIS;

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

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesList city={DEFAULT_CITY} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(DEFAULT_CITY).parentElement).toHaveClass('tabs__item--active');
    expect(container.querySelectorAll('.locations__item').length).toEqual(Object.values(Cities).length);
  });
});
