import {Link} from 'react-router-dom';
import { cardType, MAX_RATING } from '../../const';
import { OffersType } from '../../types/types';
import classNames from 'classnames';

type PlaceCardType = {
  offer: OffersType;
  currentCardType: string;
  onActivePlaceCardMouseEnter?: (card: number) => void;
};

function PlaceCard({offer, currentCardType, onActivePlaceCardMouseEnter}: PlaceCardType): JSX.Element {
  const { isPremium, isFavorite, previewImage, price, rating, title, type, id } = offer;

  const premiumElement = isPremium && (<div className="place-card__mark"><span>Premium</span></div>);
  const bookmarkButtonClass = isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button';
  const ratingPercentage = rating / MAX_RATING * 100;

  const articleClassName = classNames({
    'place-card': true,
    'cities__place-card': currentCardType === cardType.CITIES,
    'near-places__card': currentCardType === cardType.NEAR_PLACES,
  });

  const imageWrapperClassName = classNames({
    'place-card__image-wrapper': true,
    'cities__image-wrapper': currentCardType === cardType.CITIES,
    'near-places__image-wrapper': currentCardType === cardType.NEAR_PLACES,
  });

  const mouseEnterHandler = () => {
    onActivePlaceCardMouseEnter && onActivePlaceCardMouseEnter(id);
  };

  return (
    <article
      className={articleClassName}
      onMouseEnter={mouseEnterHandler}
    >
      {premiumElement}

      <div className={imageWrapperClassName}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" id={id.toString()} />
        </Link>
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
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
