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
