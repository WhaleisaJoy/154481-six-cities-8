import { CommentsType, OffersType } from '../../types/types';
import ReviewsForm from '../reviews-form/reviews-form';
import ReviewsList from '../reviews-list/reviews-list';

type ReviewsProps = {
  offer: OffersType;
  comments: CommentsType[];
};

function Reviews({offer, comments}: ReviewsProps): JSX.Element {
  const commentsById = comments.filter((comment) => comment.id === offer.id);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{commentsById.length}</span>
      </h2>

      <ReviewsList comments={commentsById} />
      <ReviewsForm />

    </section>
  );
}

export default Reviews;
