import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { StateType } from '../../types/state';
import { Action } from 'redux';
import NavLogout from './nav-logout';
import { makeFakeUser } from '../../utils/mock';
import * as Redux from 'react-redux';
import * as ApiActions from '../../store/api-action';
import { AppRoute } from '../../const';

const fakeUser = makeFakeUser();

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
const store = mockStore({
  USER: {
    currentUser: fakeUser,
  },
});
const history = createMemoryHistory();

describe('Component: NavLogout', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <NavLogout />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(fakeUser.email, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should dispatch logoutAction when user click sign out', () => {
    history.push(AppRoute.Room);
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const logoutAction = jest.spyOn(ApiActions, 'logoutAction');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Room}>
              <NavLogout />
            </Route>
            <Route exact path={AppRoute.Root}>
              <h1>This is Main Page</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is Main Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Sign out/i));
    expect(screen.getByText(/This is Main Page/i)).toBeInTheDocument();

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(1);
    expect(logoutAction).toBeCalledWith();
  });
});
