import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import FavoritesListEmpty from './favorites-list-empty';

const history = createMemoryHistory();

describe('Component: FavoritesListEmpty', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <FavoritesListEmpty />
      </Router>);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
