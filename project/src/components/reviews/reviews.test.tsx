import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state';
import { Action } from 'redux';
import { AuthorizationStatus } from '../../const';
import { makeFakeComment, makeFakeUser } from '../../utils/mock';
import Reviews from './reviews';

const fakeComment = makeFakeComment();
const fakeComments = [fakeComment];
const fakeUser = makeFakeUser();

const initialStore = {
  DATA: {
    comments: fakeComments,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
};

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
const store = mockStore(initialStore);
const history = createMemoryHistory();

describe('Component: Reviews', () => {
  it('should render correctly when AuthStatus is "NO_AUTH"', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Reviews />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.reviews__amount')?.textContent).toBe(fakeComments.length.toString());
    expect(container.querySelector('.reviews__list')).toBeInTheDocument();
  });

  it('should render correctly when AuthStatus is "AUTH"', () => {
    const storeAuth = mockStore({
      ...initialStore,
      USER: {
        ...initialStore.USER,
        authorizationStatus: AuthorizationStatus.Auth,
        currentUser: fakeUser,
      },
    });

    const { container } = render(
      <Provider store={storeAuth}>
        <Router history={history}>
          <Reviews />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.reviews__amount')?.textContent).toBe(fakeComments.length.toString());
    expect(container.querySelector('.reviews__list')).toBeInTheDocument();
    expect(container.querySelector('.reviews__form')).toBeInTheDocument();
  });
});
