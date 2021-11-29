import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SendingCommentStatus } from '../../const';
import Map from './map';
import { makeFakeOffer } from '../../utils/mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Map', () => {
  it('should render correctly', () => {
    const offer = makeFakeOffer();
    const offers = [offer];
    const store = mockStore({
      DATA: {
        offers,
        currentOffer: offer,
        isCurrentOfferLoaded: true,
        sendingCommentStatus: SendingCommentStatus.Initial,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Map activePlaceCard={offer.id} offers={offers} />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
