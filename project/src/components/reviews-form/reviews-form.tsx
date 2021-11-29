import { useEffect } from 'react';
import ReviewsRating from '../reviews-rating/reviews-rating';
import { RatingSettings } from '../../database';
import { postCommentAction } from '../../store/api-action';
import { CommentsDataType } from '../../types/comment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { SendingCommentStatus } from '../../const';
import { changeSendingCommentStatus } from '../../store/action';
import { getSendingCommentStatus } from '../../store/data-reducer/selectors';
import { ChangeEvent, FormEvent, useState } from 'react';

type ParamType = {
  id: string;
}

function ReviewsForm(): JSX.Element {
  const sendingCommentStatus = useSelector(getSendingCommentStatus);
  const isSuccess = sendingCommentStatus === SendingCommentStatus.Success;
  const isSending = sendingCommentStatus === SendingCommentStatus.Sending;

  const dispatch = useDispatch();
  const onCommentPost = (commentData: CommentsDataType) => dispatch(postCommentAction(commentData));

  const {id} = useParams<ParamType>();

  const [form, setForm] = useState({
    rating: 0,
    review: '',
  });

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(form.rating !== 0 && form.review !== '') {
      onCommentPost({
        id: +id,
        comment: form.review,
        rating: +form.rating,
      });
    }
  };

  const handleReviewsChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      review: target.value,
    });
  };

  const handleRatingChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      rating: +target.value,
    });
  };

  useEffect(() => {
    if(isSuccess) {
      setForm({
        rating: 0,
        review: '',
      });
      dispatch(changeSendingCommentStatus(SendingCommentStatus.Initial));
    }
  }, [dispatch, isSuccess, sendingCommentStatus, setForm]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      data-testid='reviews-form'
      onSubmit={handleSubmit}
    >

      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {
          RatingSettings.map((settings) => (
            <ReviewsRating
              settings={settings}
              rating={form.rating}
              onChange={handleRatingChange}
              key={`${settings.title}`}
            />
          ))
        }
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={form.review}
        onChange={handleReviewsChange}
        disabled={isSending}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={form.review === '' || form.rating === 0 || isSending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
