import { OffersType } from '../../../types/types';
import FavoritesLocation from '../../favorites-location/favorites-location';
import PageHeader from '../../page-header/page-header';

type FavoritesType = {
  offers: OffersType[];
}

function Favorites({offers}: FavoritesType): JSX.Element {
  const favoritesOffers = offers.filter((offer) => offer.isFavorite);

  const favoritesOffersMap = new Map();
  favoritesOffers.forEach((offer) => {
    if (favoritesOffersMap.has(offer.city.name)) {
      favoritesOffersMap.get(offer.city.name).push(offer);
    } else {
      favoritesOffersMap.set(offer.city.name, [offer]);
    }
  });

  const favoritesLocations = [...favoritesOffersMap.entries()].map((offer) => <FavoritesLocation offer={offer} key={0} />);

  return (
    <div className="page">
      <PageHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoritesLocations}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
