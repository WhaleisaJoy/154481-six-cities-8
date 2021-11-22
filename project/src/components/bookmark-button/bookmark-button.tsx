import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus, bookmarkInfo } from '../../const';
import { redirectToRoute } from '../../store/action';
import { changeFavoriteStatusAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';

type BookmarkButtonProps = {
  id: number;
  isFavorite: boolean;
  bookmark?: string,
};

function BookmarkButton({id, isFavorite, bookmark = 'place-card'}: BookmarkButtonProps): JSX.Element {
  const authStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(changeFavoriteStatusAction(id, Number(!isFavorite)));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <button
      className={classNames(
        'button',
        `${bookmark}__bookmark-button`,
        {
          'place-card__bookmark-button--active': isFavorite && bookmark === 'place-card',
          'property__bookmark-button--active': isFavorite && bookmark === 'property',
        },
      )}
      type="button"
      onClick={handleClick}
    >

      <svg
        className={classNames(`${bookmark}__bookmark-icon`)}
        width={bookmarkInfo[bookmark].width}
        height={bookmarkInfo[bookmark].height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>

      <span className="visually-hidden">To bookmarks</span>

    </button>
  );
}

export default BookmarkButton;
