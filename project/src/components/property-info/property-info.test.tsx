import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state';
import { Action } from 'redux';
import { makeFakeOffer } from '../../utils/mock';
import PropertyInfo from './property-info';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();

describe('Component: PropertyInfo', () => {
  it('should render correctly when offer isPremium and isFavorite', () => {
    const fakeOffer = {
      ...makeFakeOffer(),
      isPremium: true,
      isFavorite: true,
    };
    const store = mockStore({
      DATA: {
        currentOffer: fakeOffer,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <PropertyInfo offer={fakeOffer} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/premium/i)).toBeInTheDocument();
    expect(container.querySelector('.property__bookmark-button--active')).toBeInTheDocument();
    expect(container.querySelector('.rating__value')?.textContent).toEqual(fakeOffer.rating.toString());
    expect(container.querySelectorAll('.property__inside-item').length).toEqual(fakeOffer.goods.length);
  });

  it('should render correctly when offer is not Premium and is not Favorite', () => {
    const fakeOffer = {
      ...makeFakeOffer(),
      isPremium: false,
      isFavorite: false,
    };
    const store = mockStore({
      DATA: {
        currentOffer: fakeOffer,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <PropertyInfo offer={fakeOffer} />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/premium/i)).not.toBeInTheDocument();
    expect(container.querySelector('.property__bookmark-button--active')).not.toBeInTheDocument();
    expect(container.querySelector('.rating__value')?.textContent).toEqual(fakeOffer.rating.toString());
    expect(container.querySelectorAll('.property__inside-item').length).toEqual(fakeOffer.goods.length);
  });
});
