import { OffersType } from '../../types/offer';
import { toPercent } from '../../utils';

type PropertyInfoType = {
  offer: OffersType;
};

function PropertyInfo({offer}: PropertyInfoType): JSX.Element {
  const { isPremium, title, rating, price, goods, bedrooms, maxAdults, type, isFavorite } = offer;

  const bookmarkButtonClass = isFavorite
    ? 'property__bookmark-button property__bookmark-button--active button'
    : 'property__bookmark-button button';

  return (
    <>
      {
        isPremium
        &&
        <div className="property__mark">
          <span>Premium</span>
        </div>
      }
      <div className="property__name-wrapper">
        <h1 className="property__name">
          {title}
        </h1>
        <button className={bookmarkButtonClass} type="button">
          <svg className="property__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>

      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{width: `${toPercent(rating)}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{rating}</span>
      </div>

      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {type}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {bedrooms} Bedrooms
        </li>
        <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
        </li>
      </ul>

      <div className="property__price">
        <b className="property__price-value">&euro;{price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>

      <div className="property__inside">
        <h2 className="property__inside-title">What&apos;s inside</h2>
        <ul className="property__inside-list">
          {
            goods.map((good) => (
              <li className="property__inside-item" key={good}>
                {good}
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default PropertyInfo;
