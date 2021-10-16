import { PlaceCardDataType } from '../../types/types';

type PlaceCardType = {
  item: PlaceCardDataType,
};

const MAX_RATING = 5;

function PlaceCard({item}: PlaceCardType): JSX.Element {
  const { isPremium, isFavorite, previewImage, price, rating, title, type } = item;

  const premiumElement = isPremium ? (<div className="place-card__mark"><span>Premium</span></div>) : '';
  const bookmarkButtonClass = isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button';
  const ratingPercentage = rating / MAX_RATING * 100;

  return (
    <article className="cities__place-card place-card">
      {premiumElement}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="/">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkButtonClass} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingPercentage}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;