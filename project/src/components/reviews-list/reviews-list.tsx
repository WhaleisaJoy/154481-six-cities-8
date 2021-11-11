import dayjs from 'dayjs';
import { CommentsType } from '../../types/types';
import { toPercent } from '../../utils';

type ReviewsListProps = {
  comments: CommentsType[];
};

function ReviewsList({comments}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        comments.map(({ comment, date, id, rating, user }) => (
          <li className="reviews__item" id={id.toString()} key={id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">
                {user.name}
              </span>
            </div>

            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: `${toPercent(rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {comment}
              </p>
              <time className="reviews__time" dateTime={date.toISOString()}>
                {dayjs(date).format('MMMM YYYY')}
              </time>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default ReviewsList;
