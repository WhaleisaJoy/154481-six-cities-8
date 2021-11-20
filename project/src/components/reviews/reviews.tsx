import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AuthorizationStatus } from '../../const';
import { fetchCommentsAction } from '../../store/api-action';
import { getComments } from '../../store/data-reducer/selectors';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';
import ReviewsForm from '../reviews-form/reviews-form';
import ReviewsList from '../reviews-list/reviews-list';

type ParamType = {
  id: string;
}

function Reviews(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const comments = useSelector(getComments);

  const dispatch = useDispatch();

  const { id } = useParams<ParamType>();

  useEffect(() => {
    const onCommentsFetch = (idItem: number) => {
      dispatch(fetchCommentsAction(idItem));
    };

    onCommentsFetch(parseInt(id, 10));
  }, [dispatch, id]);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{comments.length}</span>
      </h2>

      <ReviewsList comments={comments} />

      {
        authorizationStatus === AuthorizationStatus.Auth
        &&
        <ReviewsForm />
      }

    </section>
  );
}

export default Reviews;
