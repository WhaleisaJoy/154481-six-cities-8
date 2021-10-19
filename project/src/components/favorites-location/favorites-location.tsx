import { FavoritesLocationOffersType } from '../../types/types';
import FavoritesCard from '../favorites-card/favorites-card';

type FavoritesLocationType = {
  offer: FavoritesLocationOffersType;
}

function FavoritesLocation({offer}: FavoritesLocationType):JSX.Element {
  const [title, offers] = offer;

  const favoritesPlacesCards = offers.map((offerItem) => <FavoritesCard offer={offerItem} key={offerItem.id} />);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>{title}</span>
          </a>
        </div>
      </div>

      <div className="favorites__places">
        {favoritesPlacesCards}
      </div>
    </li>
  );
}

export default FavoritesLocation;


// import { OffersType } from '../../types/types';
// import { MAX_RATING } from '../../const';
// import { FavoritesLocationOffersType } from '../../types/types';

// type FavoritesLocationType = {
//   // offer: {OffersType};
//   offer: FavoritesLocationOffersType;

// }

// function FavoritesLocation({offer}: FavoritesLocationType):JSX.Element {
//   // console.log(offer);
//   // const { city, isFavorite, previewImage, price, rating, title, type } = offer;
//   const [title, offers] = offer;

//   console.log(offers);

//   const bookmarkButtonClass = isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button';
//   const ratingPercentage = rating / MAX_RATING * 100;

//   return (
//     <li className="favorites__locations-items">
//       <div className="favorites__locations locations locations--current">
//         <div className="locations__item">
//           <a className="locations__item-link" href="/">
//             <span>{city.name}</span>
//           </a>
//         </div>
//       </div>
//       <div className="favorites__places">
//         <article className="favorites__card place-card">
//           <div className="favorites__image-wrapper place-card__image-wrapper">
//             <a href="/">
//               <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
//             </a>
//           </div>
//           <div className="favorites__card-info place-card__info">
//             <div className="place-card__price-wrapper">
//               <div className="place-card__price">
//                 <b className="place-card__price-value">&euro;{price}</b>
//                 <span className="place-card__price-text">&#47;&nbsp;night</span>
//               </div>
//               <button className={bookmarkButtonClass} type="button">
//                 <svg className="place-card__bookmark-icon" width="18" height="19">
//                   <use xlinkHref="#icon-bookmark"></use>
//                 </svg>
//                 <span className="visually-hidden">In bookmarks</span>
//               </button>
//             </div>
//             <div className="place-card__rating rating">
//               <div className="place-card__stars rating__stars">
//                 <span style={{width: `${ratingPercentage}%`}}></span>
//                 <span className="visually-hidden">Rating</span>
//               </div>
//             </div>
//             <h2 className="place-card__name">
//               <a href="/">{title}</a>
//             </h2>
//             <p className="place-card__type">{type}</p>
//           </div>
//         </article>

//         {/* <article className="favorites__card place-card">
//           <div className="favorites__image-wrapper place-card__image-wrapper">
//             <a href="/">
//               <img className="place-card__image" src="img/room-small.jpg" width="150" height="110" alt="Place image" />
//             </a>
//           </div>
//           <div className="favorites__card-info place-card__info">
//             <div className="place-card__price-wrapper">
//               <div className="place-card__price">
//                 <b className="place-card__price-value">&euro;80</b>
//                 <span className="place-card__price-text">&#47;&nbsp;night</span>
//               </div>
//               <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
//                 <svg className="place-card__bookmark-icon" width="18" height="19">
//                   <use xlinkHref="#icon-bookmark"></use>
//                 </svg>
//                 <span className="visually-hidden">In bookmarks</span>
//               </button>
//             </div>
//             <div className="place-card__rating rating">
//               <div className="place-card__stars rating__stars">
//                 <span style={{width: '80%'}}></span>
//                 <span className="visually-hidden">Rating</span>
//               </div>
//             </div>
//             <h2 className="place-card__name">
//               <a href="/">Wood and stone place</a>
//             </h2>
//             <p className="place-card__type">Private room</p>
//           </div>
//         </article> */}
//       </div>
//     </li>
//   );
// }

// export default FavoritesLocation;
