import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LoadingPage from './loading-page';

const history = createMemoryHistory();

describe('Component: LoadingPage', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <LoadingPage />
      </Router>);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
