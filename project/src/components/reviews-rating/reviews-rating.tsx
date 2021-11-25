import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { SendingCommentStatus } from '../../const';
import { getSendingCommentStatus } from '../../store/data-reducer/selectors';
import { RatingSettingsType } from '../../types/types';

type ReviewsRatingType = {
  settings: RatingSettingsType;
  rating: number,
  onChange: ({target}: ChangeEvent<HTMLInputElement>) => void;
};

function ReviewsRating({settings, rating, onChange}: ReviewsRatingType): JSX.Element {
  const { value, title } = settings;
  const sendingCommentStatus = useSelector(getSendingCommentStatus);

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        checked={value === rating.toString()}
        onChange={onChange}
        disabled={sendingCommentStatus === SendingCommentStatus.Sending}
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
