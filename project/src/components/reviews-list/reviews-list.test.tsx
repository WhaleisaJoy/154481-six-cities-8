import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createAPI } from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state';
import { Action } from 'redux';
import { makeFakeComment } from '../../utils/mock';
import ReviewsList from './reviews-list';
import dayjs from 'dayjs';

const fakeComment = makeFakeComment();
const fakeComments = [fakeComment];

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
const store = mockStore({
  DATA: {
    comments: fakeComments,
  },
});
const history = createMemoryHistory();

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsList comments={fakeComments} />
        </Router>
      </Provider>,
    );

    expect(container.querySelectorAll('.reviews__item').length).toEqual(fakeComments.length);
    expect(screen.getByText(fakeComment.user.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeComment.comment}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(dayjs(fakeComment.date).format('MMMM YYYY'))).toBeInTheDocument();
  });
});
