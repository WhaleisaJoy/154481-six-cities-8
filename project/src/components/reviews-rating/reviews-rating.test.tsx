import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { SendingCommentStatus } from '../../const';
import ReviewsRating from './reviews-rating';
import { RatingSettings } from '../../database';

const SETTINGS = RatingSettings[1];
const RATING = 3;

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ReviewsRating', () => {
  it('onChange should not be called when input is disabled', () => {
    const onChange = jest.fn();
    const store = mockStore({
      DATA: {
        sendingCommentStatus: SendingCommentStatus.Sending,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsRating settings={SETTINGS} rating={RATING} onChange={onChange} />
        </Router>
      </Provider>,
    );

    expect(onChange).toBeCalledTimes(0);
    userEvent.click(screen.getByRole('radio'));
    expect(onChange).toBeCalledTimes(0);
  });

  it('onChange should be called when input is not disabled', () => {
    const onChangeW = jest.fn();
    const store = mockStore({
      DATA: {
        sendingCommentStatus: SendingCommentStatus.Initial,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsRating settings={SETTINGS} rating={RATING} onChange={onChangeW} />
        </Router>
      </Provider>,
    );

    expect(onChangeW).toBeCalledTimes(0);
    userEvent.click(screen.getByRole('radio'));
    expect(onChangeW).toBeCalledTimes(1);
  });
});
