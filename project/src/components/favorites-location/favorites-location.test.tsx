import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Cities } from '../../database';
import { makeFakeOffer } from '../../utils/mock';
import FavoritesLocation from './favorites-location';

const DEFAULT_CITY = Cities.PARIS;
const fakeOffers = [makeFakeOffer()];

const history = createMemoryHistory();

describe('Component: FavoritesLocation', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <FavoritesLocation city={DEFAULT_CITY} offers={fakeOffers} />
      </Router>);

    expect(screen.getByText(DEFAULT_CITY)).toBeInTheDocument();
  });
});
