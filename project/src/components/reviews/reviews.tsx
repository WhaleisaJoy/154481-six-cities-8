import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router';
import { AuthorizationStatus } from '../../const';
import { fetchCommentsAction } from '../../store/api-action';
import { getComments } from '../../store/data-reducer/selectors';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';
import { ThunkAppDispatch } from '../../types/action';
import { StateType } from '../../types/state';
import ReviewsForm from '../reviews-form/reviews-form';
import ReviewsList from '../reviews-list/reviews-list';

type ParamType = {
  id: string;
}

const mapStateToProps = (state: StateType) => ({
  authorizationStatus: getAuthorizationStatus(state),
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onCommentsFetch(id: number) {
    dispatch(fetchCommentsAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Reviews({authorizationStatus, comments, onCommentsFetch}: PropsFromRedux): JSX.Element {
  const { id } = useParams<ParamType>();

  useEffect(() => {
    onCommentsFetch(parseInt(id, 10));
  }, [id, onCommentsFetch]);

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

export {Reviews};
export default connector(Reviews);
