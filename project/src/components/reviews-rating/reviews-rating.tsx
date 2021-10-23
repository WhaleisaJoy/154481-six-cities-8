import { ChangeEvent } from 'react';
import { RatingSettingsType } from '../../types/types';

type ReviewsRatingType = {
  settings: RatingSettingsType;
  onChange: ({target}: ChangeEvent<HTMLInputElement>) => void;
};

function ReviewsRating({settings, onChange}: ReviewsRatingType): JSX.Element {
  const { value, title } = settings;

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        onChange={onChange}
      />

      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default ReviewsRating;
