import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import PlacesEmpty from './places-empty';

const history = createMemoryHistory();

describe('Component: PlacesEmpty', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <PlacesEmpty />
      </Router>);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Dusseldorf/i)).toBeInTheDocument();
  });
});
