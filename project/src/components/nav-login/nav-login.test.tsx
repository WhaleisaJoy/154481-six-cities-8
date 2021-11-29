import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NavLogin from './nav-login';

const history = createMemoryHistory();

describe('Component: NavLogin', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <NavLogin />
      </Router>);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
