import {Link} from 'react-router-dom';
import { cardType } from '../../const';
import classNames from 'classnames';
import { OffersType } from '../../types/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';
import { toPercent } from '../../utils';

type PlaceCardType = {
  offer: OffersType;
  currentCardType: string;
  onActivePlaceCardMouseEnter?: (card: number) => void;
  onActivePlaceCardMouseLeave?: () => void;
};

const previewSize = {
  [cardType.CITIES]: {
    width: '260',
    height: '200',
  },
  [cardType.NEAR_PLACES]: {
    width: '260',
    height: '200',
  },
  [cardType.FAVORITES]: {
    width: '150',
    height: '110',
  },
};

function PlaceCard({offer, currentCardType, onActivePlaceCardMouseEnter = () => '', onActivePlaceCardMouseLeave = () => ''}: PlaceCardType): JSX.Element {
  const { isPremium, isFavorite, previewImage, price, rating, title, type, id } = offer;

  const handleMouseEnter = () => {
    onActivePlaceCardMouseEnter(id);
  };

  const handleMouseLeave = () => {
    onActivePlaceCardMouseLeave();
  };

  return (
    <article
      className={classNames(
        'place-card',
        {
          'cities__place-card': currentCardType === cardType.CITIES,
          'near-places__card': currentCardType === cardType.NEAR_PLACES,
          'favorites__card': currentCardType === cardType.FAVORITES,
        },
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {
        isPremium
        &&
        <div className="place-card__mark">
          <span>
          Premium
          </span>
        </div>
      }

      <div className={classNames(
        'place-card__image-wrapper',
        {
          'cities__image-wrapper': currentCardType === cardType.CITIES,
          'near-places__image-wrapper': currentCardType === cardType.NEAR_PLACES,
          'favorites__image-wrapper': currentCardType === cardType.FAVORITES,
        },
      )}
      >
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={previewSize[currentCardType].width}
            height={previewSize[currentCardType].height}
            alt="Place image"
            id={id.toString()}
            data-testid='place-card-image'
          />
        </Link>
      </div>

      <div className={classNames(
        'place-card__info',
        {
          'favorites__card-info': currentCardType === cardType.FAVORITES,
        },
      )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton id={id} isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{width: `${toPercent(rating)}%`}}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link data-testid='place-card-link' to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
