import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LoadWrapper from './load-wrapper';

const history = createMemoryHistory();

describe('Component: LoadWrapper', () => {
  it('should render correctly when isLoad and children', () => {
    render(
      <Router history={history}>
        <LoadWrapper isLoad>
          <div>Child</div>
        </LoadWrapper>
      </Router>);

    expect(screen.getByText(/Child/i)).toBeInTheDocument();
  });

  it('should render correctly when is not Load and children', () => {
    render(
      <Router history={history}>
        <LoadWrapper isLoad={false}>
          <div>Child</div>
        </LoadWrapper>
      </Router>);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
