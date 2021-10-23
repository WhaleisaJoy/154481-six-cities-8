import { useState, ChangeEvent } from 'react';
import ReviewsRating from '../reviews-rating/reviews-rating';
import { RatingSettings } from '../../database';

function ReviewsForm(): JSX.Element {
  const [form, setForm] = useState({
    rating: '0',
    review: '',
  });

  function handleReviewsChange({target}: ChangeEvent<HTMLTextAreaElement>) {
    setForm({
      ...form,
      review: target.value,
    });
  }

  function handleRatingChange({target}: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      rating: target.value,
    });
  }

  return (
    <form className="reviews__form form" action="#" method="post">

      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {
          RatingSettings.map((settings) => <ReviewsRating settings={settings} onChange={handleRatingChange} key={`${settings.title}`} />)
        }
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={form.review}
        onChange={handleReviewsChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
