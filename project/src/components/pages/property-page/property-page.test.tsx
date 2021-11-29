import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { createAPI } from '../../../services/api';
import { StateType } from '../../../types/state';
import { makeFakeComment, makeFakeOffer, makeFakeUser } from '../../../utils/mock';
import { AuthorizationStatus } from '../../../const';
import Property from './property-page';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();

describe('Component: Property', () => {
  it('should render correctly when offers is not empty', () => {
    const currentOffer = makeFakeOffer();
    const offersNearby = [makeFakeOffer()];
    const comments = [makeFakeComment()];

    const store = mockStore({
      DATA: {
        currentOffer,
        offersNearby,
        comments,
        isDataLoaded: true,
        isCurrentOfferLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        currentUser: makeFakeUser(),
      },
    });
    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <Property />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.header__logo-link')).toBeInTheDocument();
    expect(container.querySelector('.rating__value')?.textContent).toEqual(currentOffer.rating.toString());
    expect(container.querySelectorAll('.reviews__item').length).toEqual(comments.length);
    expect(container.querySelectorAll('.place-card').length).toEqual(offersNearby.length);
  });
});
