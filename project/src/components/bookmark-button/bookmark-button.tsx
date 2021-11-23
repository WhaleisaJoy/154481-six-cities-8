import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { bookmarkInfo } from '../../const';
import { changeFavoriteStatusAction } from '../../store/api-action';

type BookmarkButtonProps = {
  id: number;
  isFavorite: boolean;
  bookmark?: string,
};

function BookmarkButton({id, isFavorite, bookmark = 'place-card'}: BookmarkButtonProps): JSX.Element {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(changeFavoriteStatusAction(id, Number(!isFavorite)));
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
