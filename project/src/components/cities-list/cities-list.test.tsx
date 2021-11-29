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
import { Cities } from '../../database';
import CitiesList from './cities-list';
import * as Redux from 'react-redux';
import { ActionType } from '../../types/action';

const CURRENT_CITY = Cities.PARIS;

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
  },
});
const history = createMemoryHistory();

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesList city={CURRENT_CITY} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(CURRENT_CITY).parentElement).toHaveClass('tabs__item--active');
    expect(container.querySelectorAll('.locations__item').length).toEqual(Object.values(Cities).length);
  });

  it('should dispatch changeCity when user click tab', () => {
    const notCurrentCity = Cities.AMSTERDAM;

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesList city={CURRENT_CITY} />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(notCurrentCity));

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(
      1,
      {
        type: ActionType.ChangeCity,
        payload: notCurrentCity,
      },
    );
  });
});
