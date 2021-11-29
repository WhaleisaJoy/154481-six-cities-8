import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import NotFoundPage from './not-found-page';
import { createAPI } from '../../../services/api';
import { StateType } from '../../../types/state';
import { makeFakeUser } from '../../../utils/mock';

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

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const { container } =render(
      <Provider store={store}>
        <Router history={history}>
          <NotFoundPage />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.header__logo-link')).toBeInTheDocument();
    expect(screen.getByText(/404 Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную страницу/i)).toBeInTheDocument();
  });
});
