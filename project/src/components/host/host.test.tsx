import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mock';
import Host from './host';

const fakeOffer = makeFakeOffer();
const fakeOfferProUser = {...fakeOffer, host: {...fakeOffer.host, isPro: true}};
const fakeOfferNotProUser = {...fakeOffer, host: {...fakeOffer.host, isPro: false}};

const history = createMemoryHistory();

describe('Component: Host', () => {
  it('should render correctly when user is pro', () => {
    const { container } = render(
      <Router history={history}>
        <Host offer={fakeOfferProUser} />
      </Router>);

    expect(container.querySelector('.property__avatar-wrapper')).toHaveClass('property__avatar-wrapper--pro');
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('should render correctly when user is not pro', () => {
    const { container } = render(
      <Router history={history}>
        <Host offer={fakeOfferNotProUser} />
      </Router>);

    expect(container.querySelector('.property__avatar-wrapper')).not.toHaveClass('property__avatar-wrapper--pro');
    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });
});
