import { OffersType } from '../../types/offer';
import FavoritesLocation from '../favorites-location/favorites-location';

type FavoritesListProps = {
  offers: OffersType[];
};

function FavoritesList({offers}: FavoritesListProps): JSX.Element {
  const cityNames = offers.map((offer) => offer.city.name);
  const cityNamesUnique = new Set(cityNames);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          Array.from(cityNamesUnique).map((city) => <FavoritesLocation city={city} offers={offers} key={city} />)
        }
      </ul>
    </section>
  );
}

export default FavoritesList;
