import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { StateType } from '../../types/state';
import { Action } from 'redux';
import { makeFakeOffer } from '../../utils/mock';
import * as Redux from 'react-redux';
import * as ApiActions from '../../store/api-action';
import BookmarkButton from './bookmark-button';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
const store = mockStore();
const history = createMemoryHistory();

describe('Component: BookmarkButton', () => {
  it('should render correctly when isFavorite is true', () => {
    const bookmark = 'place-card';
    const fakeOffer = {
      ...makeFakeOffer(),
      isFavorite: true,
    };
    render(
      <Provider store={store}>
        <Router history={history}>
          <BookmarkButton id={fakeOffer.id} isFavorite={fakeOffer.isFavorite} bookmark={bookmark} />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');
  });

  it('should render correctly when isFavorite is false', () => {
    const bookmark = 'place-card';
    const fakeOffer = {
      ...makeFakeOffer(),
      isFavorite: false,
    };
    render(
      <Provider store={store}>
        <Router history={history}>
          <BookmarkButton id={fakeOffer.id} isFavorite={fakeOffer.isFavorite} bookmark={bookmark} />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('should dispatch changeFavoriteStatusAction when user click', () => {
    const bookmark = 'place-card';
    const fakeOffer = {
      ...makeFakeOffer(),
      isFavorite: false,
    };
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const changeFavoriteStatusAction = jest.spyOn(ApiActions, 'changeFavoriteStatusAction');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <BookmarkButton id={fakeOffer.id} isFavorite={fakeOffer.isFavorite} bookmark={bookmark} />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button'));

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(1);
    expect(changeFavoriteStatusAction).toBeCalledWith(fakeOffer.id, Number(!fakeOffer.isFavorite));
  });
});
