import { OffersType } from '../../types/offer';
import FavoritesCard from '../favorites-card/favorites-card';

type FavoritesLocationType = {
  city: string;
  offers: OffersType[];
}

function FavoritesLocation({city, offers}: FavoritesLocationType):JSX.Element {
  const offersByCity = offers.filter((offer) => offer.city.name === city);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>{city}</span>
          </a>
        </div>
      </div>

      <div className="favorites__places">
        {
          offersByCity.map((offer) => <FavoritesCard offer={offer} key={offer.id} />)
        }
      </div>
    </li>
  );
}

export default FavoritesLocation;
