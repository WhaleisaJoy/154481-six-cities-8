import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ReviewsForm from './reviews-form';
import { RatingSettings } from '../../database';
import { SendingCommentStatus } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ReviewsForm', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: {
        isCurrentOfferLoaded: true,
        sendingCommentStatus: SendingCommentStatus.Initial,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(container.querySelectorAll('.form__rating-input').length).toEqual(RatingSettings.length);
    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('reviews__submit');
  });
});
