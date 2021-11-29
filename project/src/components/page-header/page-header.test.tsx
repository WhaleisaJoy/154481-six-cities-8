import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import PageHeader from './page-header';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state';
import { Action } from 'redux';
import userEvent from '@testing-library/user-event';

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

describe('Component: PageHeader', () => {
  it('should render correctly when isNav is false', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PageHeader isNav={false} />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('header__logo-link');
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });

  it('should render correctly when isNav is true', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PageHeader isNav />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('header__logo-link');
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is Main Page</h1>
          </Route>
          <Route>
            <PageHeader isNav={false} />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
