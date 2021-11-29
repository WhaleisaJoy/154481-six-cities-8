import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import * as ApiActions from '../../../store/api-action';
import Login from './login-page';
import { AuthorizationStatus, defaultUser } from '../../../const';

const EMAIL = 'test@test.ru';
const PASSWORD = '1234';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Login', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        currentUser: defaultUser,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('login__submit');
  });

  it('should dispatch loginAction when user submit form', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        currentUser: defaultUser,
      },
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const loginAction = jest.spyOn(ApiActions, 'loginAction');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByPlaceholderText(/Email/i), EMAIL);
    userEvent.type(screen.getByPlaceholderText(/Password/i), PASSWORD);

    userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

    expect(loginAction).toBeCalledWith({
      login: EMAIL,
      password: PASSWORD,
    });
  });
});
