import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import PageFooter from './page-footer';

const history = createMemoryHistory();

describe('Component: PageFooter', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <PageFooter />
      </Router>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('footer__logo-link');
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
            <PageFooter />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
